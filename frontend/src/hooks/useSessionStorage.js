import { useState } from "react";

function getSessionStorageOrDefault(key) {
  const stored = sessionStorage.getItem(key);
  if (!stored) {
    return "";
  }
  return JSON.parse(stored);
}

export function useSessionStorage(key) {
  const [value, setValue] = useState(getSessionStorageOrDefault(key));

  const setSessionValue = (newValue) => {
    setValue((prevValue) => newValue);
    sessionStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, setSessionValue];
}
