export interface colorProps {
  primary: string;
  secondary: string;
  warning: string;
  success: string;
  info: string;
  danger: string;
  transPrimary: string;
  transBlack: string;
  transWhite: string;
  primaryBackground: string;
  secondaryBackground: string;
  primaryButton: string;
  secondaryButton: string;
  primaryText: string;
  secondaryText: string;
  white: string;
  black: string;
  gray: string;
  lightGray: string;
  lightGray2: string;
  transparent: string;
  gradient: string[];
  statusbar1: string;
  statusbar2: string;
}

export interface fontProps {}

export interface themeProps {
  colors: colorProps;
  fonts: fontProps;
}
