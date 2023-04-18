import Cookies from 'js-cookie';
import jwtDecode from "jwt-decode";

export const setTokenCookie = (token: string): void => {
  const expireTime = new Date(new Date().getTime() + 3 * 60 * 60 * 1000); // 3시간 후의 시간 설정
  Cookies.set('token', token, {
    expires: expireTime,
    sameSite: 'none',
    secure: true
  });
};

export const returnTokenValue = async () => {
  try {
    const token = await Cookies.get('token');
    if (token) {
      const decodeToken = await jwtDecode(token);
      return decodeToken;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Failed to return token value:', error);
    return null;
  }
};


export const deleteCookie = () => {
  Cookies.remove('token')
  window.location.replace('/')
}