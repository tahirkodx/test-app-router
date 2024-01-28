// ThemeContext.tsx
"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface ThemeContextProps {
  children: ReactNode;
}

interface ThemeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<ThemeContextProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    // Check if localStorage is available
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme");
      return storedTheme ? JSON.parse(storedTheme) : false;
    }
    return false;
  });

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev;

      // Check if localStorage is available
      if (typeof window !== "undefined") {
        localStorage.setItem("theme", JSON.stringify(newMode));
      }

      return newMode;
    });
  };

  useEffect(() => {
    // Add event listener to handle changes in localStorage
    const handleStorageChange = () => {
      // Check if localStorage is available
      if (typeof window !== "undefined") {
        const storedTheme = localStorage.getItem("theme");
        if (storedTheme !== null) {
          setIsDarkMode(JSON.parse(storedTheme));
        }
      }
    };

    // Check if localStorage is available
    if (typeof window !== "undefined") {
      window.addEventListener("storage", handleStorageChange);
    }

    return () => {
      // Check if localStorage is available
      if (typeof window !== "undefined") {
        window.removeEventListener("storage", handleStorageChange);
      }
    };
  }, []);

  const contextValue: ThemeContextType = {
    isDarkMode,
    toggleDarkMode,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
