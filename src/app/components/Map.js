'use client';
import '@/utils/fixLeafletIcons';  
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

export default function Map({ services }) {
  return (
    <MapContainer center={[40.7128, -74.0060]} zoom={11} style={{ height: '500px', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {services.map((s, i) => {
  const lat = parseFloat(s.latitude);
  const lon = parseFloat(s.longitude);
  if (!lat || !lon) return null;

  return (
    <Marker key={i} position={[lat, lon]}>
    <Popup>
  <strong>{s.name_1} {s.name_2}</strong><br />
  {s.street_1}, {s.city}<br />
  {s.phone && <span>{s.phone}<br /></span>}
  {s.website && <a href={s.website} target="_blank">{s.website}</a>}
</Popup>
    </Marker>
  );
})}
    </MapContainer>
  );
}
