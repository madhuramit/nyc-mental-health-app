'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import dynamic from 'next/dynamic';


const Map = dynamic(() => import('./components/Map'), { ssr: false });

export default function Home() {
  const [services, setServices] = useState([]);
  const [borough, setBorough] = useState('');

  useEffect(() => {
    axios.get('https://data.cityofnewyork.us/resource/8nqg-ia7v.json') 
      .then(res => setServices(res.data))
      .catch(err => console.error('Data fetch error:', err));
  }, []);

  const filtered = borough
    ? services.filter(s => s.city?.toLowerCase() === borough.toLowerCase())
    : services;

  return (
    <div style={{ padding: '20px' }}>
      <h1>NYC Mental Health Services</h1>
      <label>Borough: </label>
      <select onChange={(e) => setBorough(e.target.value)} value={borough}>
        <option value=''>All Boroughs</option>
        <option value='Bronx'>Bronx</option>
        <option value='Brooklyn'>Brooklyn</option>
        <option value='Manhattan'>Manhattan</option>
        <option value='Queens'>Queens</option>
        <option value='Staten Island'>Staten Island</option>
      </select>

      <div style={{ display: 'flex', marginTop: '20px' }}>
        <div style={{ flex: 1, marginRight: '10px' }}>
          <h2>List of Services</h2>
          <ul>
  {filtered.map((s, i) => {
   	const name = `${s.name_1 || ''} ${s.name_2 || ''}`.trim();
	const address = `${s.street_1 || ''}, ${s.city || ''}`.trim();

    return (
      <li key={i} style={{ marginBottom: '15px' }}>
        <strong>{name}</strong><br />
        {address}<br />
        {s.phone && <span>{s.phone} | </span>}
        {s.website && <a href={s.website} target="_blank">{s.website}</a>}
      </li>
    );
  })}
</ul>
        </div>
        <div style={{ flex: 1 }}>
          <Map services={filtered} />
        </div>
      </div>
    </div>
  );
}