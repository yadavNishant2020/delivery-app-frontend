import React, {createContext, useContext} from 'react';
import {Appearance} from 'react-native';
import {colors} from './colors';
import {fonts} from './fonts';
import { themeProps } from './theme.interface';
export * from './theme.interface';

const mode = Appearance.getColorScheme() || 'light';
const ThemeContext = createContext<any>({});

const theme = {
  colors: colors[mode],
  fonts: fonts,
};

export const ThemeProvider = ({children}: any) => {
  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};
export const useTheme = () => useContext(ThemeContext) as themeProps;
