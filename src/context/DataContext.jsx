import { createContext, useState, useEffect } from "react";

export const DataContext = createContext();

export function DataProvider({ children }) {
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem("licenses");
    return savedData ? JSON.parse(savedData) : [];
  });

  useEffect(() => {
    localStorage.setItem("licenses", JSON.stringify(data));
  }, [data]);

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
}
