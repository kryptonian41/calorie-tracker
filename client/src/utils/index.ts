import { useCallback, useEffect, useState } from "react";

// resolve promise after a timeout
export const timePromise = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const useSessionStorage = (key, initialValue) => {
  const [state, setstate] = useState(() => {
    try {
      const value = sessionStorage.getItem(key);
      console.log("🚀 ~ file: index.ts ~ line 10 ~ const[state,setstate]=useState ~ value", value)
      return value ? JSON.parse(value) : initialValue;
    } catch (e) {
      return null;
    }
  });

  const deleteKey = useCallback(() => {
    try {
      sessionStorage.removeItem(key);
    } catch (e) {
      // do nothing
    }
  }, [key])

  useEffect(() => {
    const sessionStorageValue = sessionStorage.getItem(key)
    if (sessionStorageValue) {
      setstate(JSON.parse(sessionStorageValue))
    }
  }, [key])

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(state))
  }, [key, state])

  return [state, setstate, deleteKey]
}