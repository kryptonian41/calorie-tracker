import { useCallback, useEffect, useState } from "react";

export const timePromise = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const useSessionStorage = (key, initialValue) => {
  const [state, setstate] = useState(() => {
    try {
      const value = sessionStorage.getItem(key);
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


export const sortByDate = (a: any, b: any) => {
  return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
}

export const filterByDataRange = (data: any, startDate: Date, endDate: Date) => {
  return data.filter((item: any) => {
    const date = new Date(item.timestamp)
    return date >= startDate && date <= endDate
  })
}

export const sumOfArrayItems = (array: any, key) => {
  return array.reduce((acc: any, item: any) => {
    return acc + item[key]
  }, 0)
}