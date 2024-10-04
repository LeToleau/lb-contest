import React, { createContext, useContext, useState } from 'react';

const GameStatusContext = createContext();

export function GameStatusProvider({ children }) {
  const [gameStatus, setGameStatus] = useState(false); // or null, depending on your initial state logic

  return (
    <GameStatusContext.Provider value={{ gameStatus, setGameStatus }}>
      {children}
    </GameStatusContext.Provider>
  );
}

export function useGameStatus() {
  return useContext(GameStatusContext);
}