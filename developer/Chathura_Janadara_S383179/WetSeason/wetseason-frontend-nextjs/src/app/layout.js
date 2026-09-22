import "@progress/kendo-theme-meridian/dist/all.css";
import "./globals.css";

export const metadata = {
  title: "WetSeason",
  description: "NT wet-season incident coordination dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
