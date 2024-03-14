"use client"

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const HomePage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const goToHotelPg = (e:any) => {
    setLoading(true);
    e.preventDefault();
      router.replace('/hotelPg');
      setLoading(false);
    };

  return (
    <div
      className="relative flex flex-col items-center justify-center h-screen"
      style={{
        backgroundImage: 'url("/images/hotel2.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div
        className="absolute inset-0 bg-black opacity-50"
        style={{ backdropFilter: 'blur(5px)' }}
      />
      <div className="relative z-10 flex flex-col items-center justify-center">
        <h1 className="text-2xl md:text-4xl font-bold text-slate-300 mb-6 ">Welcome to Comfort Home</h1>
        <p className="text-lg text-white mb-8">Your desired rest space</p>
        <Button
          onClick={goToHotelPg}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Explore Hotels
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
