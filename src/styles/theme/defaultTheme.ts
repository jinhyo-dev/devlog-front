import { DefaultTheme } from 'styled-components';

export interface CustomTheme extends DefaultTheme {
  backgroundColor: string;
  boxColor: string;
  fontColor: string;
  boxShadow: string;
  boxShadowHover: string;
  boxHoverBackground: string;
  bottomBoxBorderColor: string;
}

export const lightTheme: CustomTheme = {
  backgroundColor: "#f9f9f9",
  boxColor: '#fff',
  fontColor: "#212529",
  boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px',
  boxShadowHover: 'rgba(0, 0, 0, 0.25) 0px 25px 50px -12px',
  boxHoverBackground: '#fff',
  bottomBoxBorderColor: '1px solid #f1f4f5',
};

export const darkTheme: CustomTheme = {
  backgroundColor: "#1c1c27",
  boxColor: "hsla(0, 100%, 100%, 0.08)",
  fontColor: "#ececec",
  boxShadow: '0px 12px 17px 2px hsla(0, 0%, 0%, 0.14), 0px 5px 22px 4px hsla(0, 0%, 0%, 0.12), 0px 7px 8px -4px hsla(0, 0%, 0%, 0.2)',
  boxShadowHover: '0px 12px 17px 2px hsla(0, 0%, 0%, 0.14), 0px 5px 22px 4px hsla(0, 0%, 0%, 0.12), 0px 7px 8px -4px hsla(0, 0%, 0%, 0.2)',
  boxHoverBackground: 'hsla(0, 100%, 100%, 0.12)',
  bottomBoxBorderColor: '1px solid #4d4e4f',
};
