import Head from 'next/head';
import ParcelList from '../components/ParcelList';
import RegisterParcelModal from '../components/RegisterParcelModal';
import RandomDataButton from '../components/RandomDataButton';
import { useState } from 'react';

export default function Home() {
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  return (
    <>
      <Head>
        <title>Hotel Parcel Tracking</title>
        <meta name="description" content="Track parcels for hotel guests" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Hotel Parcel Tracking</h1>
        <RandomDataButton />
        <button onClick={() => setShowRegisterModal(true)}>Register Parcel</button>
        {showRegisterModal && (
          <RegisterParcelModal onClose={() => setShowRegisterModal(false)} />
        )}
        <ParcelList />
      </main>
    </>
  );
}
