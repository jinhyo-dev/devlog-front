import Cookies from 'js-cookie';
import jwtDecode from "jwt-decode";
import { useCookies } from "react-cookie";

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
  const [cookies, setCookies, deleteCookies] = useCookies()
  deleteCookies('token')
  window.location.replace('/')
}