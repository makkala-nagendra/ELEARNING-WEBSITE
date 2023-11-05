// ThemeChangeButton.js
import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';
import Image from 'next/image';

function ThemeChangeButton() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button onClick={toggleTheme}>
      {/* {theme === 'dark' ? 'Light Mode' : 'Dark Mode'} */}
      <Image
      src={"/icons/brightness.png"}
      width={35}
      height={35}
      alt='brightness'></Image>
    </button>
  );
}



export default ThemeChangeButton;
