import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../fixLeafletIcons';
import jobData from '../data.json';

export default function VacancyMap() {
  const defaultPosition = [55.751244, 37.618423];

  const markers = jobData
    .filter(job => job.address_lat && job.address_lng)
    .map(job => (
      <Marker key={job.id} position={[job.address_lat, job.address_lng]}>
        <Popup>
          <a href={job.listing_url} target="_blank" rel="noreferrer">{job.name}</a>
          <br />
          <strong>Experience:</strong> {job.experience || 'Not specified'}
        </Popup>
      </Marker>
    ));

  return (
    <MapContainer center={defaultPosition} zoom={15} style={{ height: '400px', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {markers}
    </MapContainer>
  );
}
