// UniqueIdContext.js
import React, { createContext, useContext, useState } from 'react';

const UniqueIdContext = createContext();

export function UniqueIdProvider({ children }) {
  const [uniqueId, setUniqueId] = useState('');

  return (
    <UniqueIdContext.Provider value={{ uniqueId, setUniqueId }}>
      {children}
    </UniqueIdContext.Provider>
  );
}

export function useUniqueId() {
  return useContext(UniqueIdContext);
}