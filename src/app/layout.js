import "./globals.css";

export const metadata = {
  title: "FreePlay — Juegos Gratis del Momento",
  description:
    "Consigue juegos gratis en tus plataformas favoritas. Actualizado en tiempo real.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
