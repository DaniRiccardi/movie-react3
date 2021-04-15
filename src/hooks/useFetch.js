import { useState, useEffect } from "react";

// recibe la url donde hacer el fetch y las opciones
export default function useFetch(url, options) {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // hacemos petición
  useEffect(() => {
    // creamos funcion anonima pero asincrona
    (async () => {
      try {
        const res = await fetch(url, options);
        const json = await res.json();
        setResult(json);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    })();
  }, [options, url]);

  return { loading, result, error };
}
