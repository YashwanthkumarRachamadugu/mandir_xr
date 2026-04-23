import { useEffect, useState } from "react";

export interface Temple {
  id: string;
  name: string;
  model: string;
  description: string;
}

export const useTempleData = () => {
  const [temples, setTemples] = useState<Temple[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTemples = async () => {
      const res = await fetch("/data/temples.json");
      const data = await res.json();
      setTemples(data);
      setLoading(false);
    };

    fetchTemples();
  }, []);

  return { temples, loading };
};