import './App.css';
import ProfileCard from './components/ProfileCard';
import Logo from './components/Logo';
import Medias from './components/Medias';
import { useEffect, useState } from 'react';

function App() {
  const [isMobile, setIsMobile] = useState(false);

  const handleResize = () => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize(); // Sayfa yüklendiğinde kontrol et

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className="h-screen">
        <div className='flex items-center justify-center h-[95vh]'>
          {!isMobile && <Medias className="flex flex-col gap-[10px] ml-[10px]" />}
          <div className="flex flex-col lg:flex-row gap-[10vh] lg:gap-0 h-full items-center justify-between w-[80%] mx-auto my-10 md:my-0">
            <ProfileCard />
            <Logo />
            {isMobile && <Medias className="flex flex-row gap-[10px]" />}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
