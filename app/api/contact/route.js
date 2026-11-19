import { createSupabaseServerClient } from "../../../lib/supabase/server";

const MAX_BODY_BYTES = 16 * 1024;
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 5000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function jsonError(message, status) {
  return Response.json({ error: message }, { status });
}

export async function POST(request) {
  const origin = request.headers.get("origin");

  if (origin) {
    try {
      if (new URL(origin).origin !== new URL(request.url).origin) {
        return jsonError("This request is not allowed.", 403);
      }
    } catch {
      return jsonError("This request is not allowed.", 403);
    }
  }

  if (!request.headers.get("content-type")?.toLowerCase().includes("application/json")) {
    return jsonError("The request must use JSON.", 415);
  }

  const contentLength = Number(request.headers.get("content-length"));
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
    return jsonError("The submitted message is too large.", 413);
  }

  let rawBody;
  try {
    rawBody = await request.text();
  } catch {
    return jsonError("The request body could not be read.", 400);
  }

  if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_BYTES) {
    return jsonError("The submitted message is too large.", 413);
  }

  let payload;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return jsonError("The request body must contain valid JSON.", 400);
  }

  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return jsonError("Please provide your name, email address, and message.", 400);
  }

  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  const message = typeof payload.message === "string" ? payload.message.trim() : "";
  const hasNullCharacter = [name, email, message].some((value) => value.includes("\u0000"));

  if (
    !name ||
    name.length > MAX_NAME_LENGTH ||
    !email ||
    email.length > MAX_EMAIL_LENGTH ||
    !EMAIL_PATTERN.test(email) ||
    !message ||
    message.length > MAX_MESSAGE_LENGTH ||
    hasNullCharacter
  ) {
    return jsonError(
      "Please provide a name (up to 100 characters), a valid email address, and a message (up to 5000 characters).",
      400
    );
  }

  let supabase;
  try {
    supabase = createSupabaseServerClient();
  } catch {
    console.error("Contact form Supabase configuration is invalid.");
    return jsonError("The contact form is temporarily unavailable. Please try again later.", 503);
  }

  if (!supabase) {
    return jsonError("The contact form is temporarily unavailable. Please try again later.", 503);
  }

  try {
    const { error } = await supabase.from("contact_messages").insert({ name, email, message });

    if (error) {
      console.error("Contact form insert failed:", error.code || "unknown error");
      return jsonError("We couldn’t send your message right now. Please try again later.", 500);
    }
  } catch {
    console.error("Contact form insert failed.");
    return jsonError("We couldn’t send your message right now. Please try again later.", 500);
  }

  return Response.json({ ok: true }, { status: 201 });
}
