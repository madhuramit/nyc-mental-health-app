
import 'leaflet/dist/leaflet.css';
import './globals.css';

export const metadata = {
  title: 'NYC Mental Health Services',
  description: 'Find mental health facilities in NYC',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

