import {useState} from 'react';
import {Appearance} from 'react-native';

export const lightMode = {
  primary: '#339',
  backgroundColor: '#fff',
  text: '#333',
  activeColor: '#fff',
  completed: '#191',
  incomplete: 'orange',
  delete: '#922',
};
export const darkMode = {
  primary: '#229',
  backgroundColor: '#444',
  text: '#fff',
  activeColor: '#fff',
  completed: '#090',
  incomplete: 'orange',
  delete: '#900',
};
export const useTheme = () => {
  const [theme, setTheme] = useState(Appearance.getColorScheme());
  Appearance.addChangeListener(scheme => {
    setTheme(scheme.colorScheme);
  });
  return theme === 'dark' ? darkMode : lightMode;
};
