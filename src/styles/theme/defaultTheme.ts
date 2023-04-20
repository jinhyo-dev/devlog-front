import { DefaultTheme } from 'styled-components';

export interface CustomTheme extends DefaultTheme {
  backgroundColor: string;
  boxColor: string;
  fontColor: string;
  boxShadow: string;
  boxShadowHover: string;
  boxHoverBackground: string;
  bottomBoxBorderColor: string;
  hashtagColor: string;
  hashtagBorder: string;
  hashtagBackgroundColor: string;
  secondColor: string;
  headerBackground: string;
}

export const lightTheme: CustomTheme = {
  backgroundColor: "#fff",
  boxColor: '#fefefe',
  fontColor: "#212529",
  boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px',
  boxShadowHover: 'rgba(0, 0, 0, 0.25) 0px 25px 50px -12px',
  boxHoverBackground: '#fff',
  bottomBoxBorderColor: '1px solid #f1f4f5',
  hashtagColor: '#72bad2',
  hashtagBorder: '1px solid #ADD8E6',
  hashtagBackgroundColor: '#f1f1f1',
  secondColor: '#8ba6b2',
  headerBackground: 'rgba(255,255,255,0.86)'
};

export const darkTheme: CustomTheme = {
  backgroundColor: "#0d1117",
  boxColor: "hsla(0, 100%, 100%, 0.03)",
  fontColor: "#ececec",
  boxShadow: '0px 12px 17px 2px hsla(0, 0%, 0%, 0.14), 0px 5px 22px 4px hsla(0, 0%, 0%, 0.12), 0px 7px 8px -4px hsla(0, 0%, 0%, 0.2)',
  boxShadowHover: '0px 12px 17px 2px hsla(0, 0%, 0%, 0.14), 0px 5px 22px 4px hsla(0, 0%, 0%, 0.12), 0px 7px 8px -4px hsla(0, 0%, 0%, 0.2)',
  boxHoverBackground: 'hsla(0, 100%, 100%, 0.12)',
  bottomBoxBorderColor: '1px solid #4d4e4f',
  hashtagColor: '#aaa9bc',
  hashtagBorder: '1px solid #434463',
  hashtagBackgroundColor: '#0d1117',
  secondColor: '#aaa9bc',
  headerBackground: 'rgba(13,17,23,0.86)'
};
