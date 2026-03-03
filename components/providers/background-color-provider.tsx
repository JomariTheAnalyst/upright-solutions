"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { motion } from "framer-motion";

interface BackgroundColorContextType {
  setYellowBackground: (active: boolean) => void;
  isYellowActive: boolean;
}

const BackgroundColorContext = createContext<BackgroundColorContextType>({
  setYellowBackground: () => {},
  isYellowActive: false,
});

export const useBackgroundColor = () => useContext(BackgroundColorContext);

interface BackgroundColorProviderProps {
  children: ReactNode;
}

export function BackgroundColorProvider({
  children,
}: BackgroundColorProviderProps) {
  const [isYellowActive, setIsYellowActive] = useState(false);

  const setYellowBackground = useCallback((active: boolean) => {
    setIsYellowActive(active);
  }, []);

  return (
    <BackgroundColorContext.Provider
      value={{ setYellowBackground, isYellowActive }}
    >
      <motion.div
        className="min-h-screen"
        animate={{
          backgroundColor: isYellowActive ? "#f2d04e" : "#ffffff",
        }}
        transition={{
          duration: 0.6,
          ease: [0.4, 0, 0.2, 1],
        }}
      >
        {children}
      </motion.div>
    </BackgroundColorContext.Provider>
  );
}
