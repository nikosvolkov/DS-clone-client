import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { useEffect, useState } from 'react';

export const useFingerprint = () => {
  const [fingerprint, setFingerprint] = useState();

  useEffect(()=>{
    const getFingerprint = async () => {
      try {
        const fpLoad = FingerprintJS.load();
        const fp = await fpLoad;
        const result = await fp.get();
        setFingerprint(result.visitorId);
      } catch (error) {
        console.error('Error during fingerprint fetching: ', error);
      }
    };
    getFingerprint();
  },[])

  return fingerprint;
};
