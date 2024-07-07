import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);
  const handleLogout = () => {
    Cookies.remove('token');
    setIsLoggedIn(false);
    router.push('/login');
  };
  return (
    <div>
      <h1>NusaGo</h1>
      {isLoggedIn && (
        <button
          onClick={handleLogout}
          className="mr-5 w-full bg-gradient-to-r from-primary to-secondary text-white font-bold py-2 px-4 rounded-md transition-all duration-500 ease-in-out transform hover:scale-105 max-md:hidden"
        >
          Logout
        </button>
      )}
    </div>
  );
}