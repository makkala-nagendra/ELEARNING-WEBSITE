// ThemeContext.js
import { ThemeProviderProps } from '@nextui-org/react/types/theme/theme-provider';
import { createContext, useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';


export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [cookies, setCookie] = useCookies(['theme']);
  const [theme, setTheme] = useState(cookies.theme || 'light');

  useEffect(() => {
    const darkThemeMq = window.matchMedia('(prefers-color-scheme: '+theme);
    setTheme(darkThemeMq.matches ? 'dark' : 'light');
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    setCookie('theme', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}



export const ThemeContext = createContext<{ theme: string; toggleTheme: () => void }>({
  theme: 'light',
  toggleTheme: () => { 
  },
});