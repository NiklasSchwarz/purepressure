import { useEffect, useState } from 'react';

const useResolution = () : number => {
  const [isMobile, setIsMobile] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if(window.innerWidth < 1270) {
        setIsMobile(1);
        if(window.innerWidth < 600) {
          setIsMobile(2);
        }
      }
    };

    if (typeof window !== 'undefined') {
      handleResize(); // Call initially
      window.addEventListener('resize', handleResize);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  return isMobile;
};

export default useResolution;