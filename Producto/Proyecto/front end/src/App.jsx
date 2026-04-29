import React, { useState } from 'react';
// IMPORTANTE: Revisa que estas rutas coincidan con tus archivos
import LandingPage from './components/LandingPage';
import BookingForm from './components/BookingForm';

function App() {
  const [view, setView] = useState('landing'); 

  return (
    <div className="font-sans">
      {view === 'landing' ? (
        <LandingPage onStartBooking={() => setView('booking')} />
      ) : (
        <div className="min-h-screen bg-pink-50 py-10 flex flex-col items-center">
          <button 
            onClick={() => setView('landing')}
            className="mb-5 text-pripelu-gold font-bold hover:underline transition-all"
          >
            ← Volver al inicio
          </button>
          <BookingForm />
        </div>
      )}
    </div>
  );
}

export default App;
