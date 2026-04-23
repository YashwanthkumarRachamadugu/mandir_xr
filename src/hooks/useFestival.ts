import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../integrations/firebase/client';
import { Festival } from '../data/festivalsData';

export const useFestival = (festivalName: string | undefined) => {
  const [festival, setFestival] = useState<Festival | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFestival = async () => {
      if (!festivalName) return;
      try {
        // This looks for a document in your "festivals" collection 
        // with the ID matching the URL (e.g., "Lohri")
        const docRef = doc(db, "festivals", festivalName);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setFestival(docSnap.data() as Festival);
        } else {
          console.log("No such festival in Firestore!");
        }
      } catch (error) {
        console.error("Error fetching festival:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFestival();
  }, [festivalName]);

  return { festival, loading };
};