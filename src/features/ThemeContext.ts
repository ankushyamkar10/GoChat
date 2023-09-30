import { createContext, useState } from "react";
import { theme } from "../Types/types";

export const ThemeContext = createContext<theme>({} as theme);

const ThemeProvider = () => {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  const handleTheme = () => {
    theme === "dark" ? setTheme("light") : setTheme("dark");
  };

  return { theme, handleTheme };
};
export default ThemeProvider;
