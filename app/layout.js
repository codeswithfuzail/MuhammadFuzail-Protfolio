import "./globals.css";

export const metadata = {
  title: "Muhammad Fuzail — Developer Portfolio",
  description:
    "The portfolio of Muhammad Fuzail, a developer building thoughtful digital experiences for the web.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
