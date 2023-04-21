import React, { useEffect, useState } from "react";
import { BsTerminalFill } from 'react-icons/bs'
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { useCookies } from 'react-cookie'
import styled from "styled-components";
import { FaUserCog } from 'react-icons/fa'
import { useNavigate } from "react-router-dom";
import { MdLogout } from 'react-icons/md'
import { returnTokenValue } from "../utils/cookie";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Tooltip from '@mui/material/Tooltip';

const Header = () => {
  const navigate = useNavigate()
  const [cookies, setCookie, deleteCookie] = useCookies()
  const [isAdmin, setIsAdmin] = useState<boolean>(false)

  useEffect(() => {
    returnTokenValue()
      .then((res: any) => {
        if (res?.roles === "ROLE_ADMIN") {
          setIsAdmin(true)
        }
      })
      .catch((err) => console.log(err));
  }, [])

  const toggleDarkMode = () => {
    let checked: string = cookies.theme
    setCookie('theme', checked === 'dark' ? 'light' : 'dark', {
      sameSite: 'none',
      secure: true
    })
  };

  const logoutHandler = () => {
    return (
      confirmAlert({
        customUI: ({onClose}) => {
          return (
            <div className='custom-alert-ui'>
              <div className={'logo-container'}>
                <div>
                  <BsTerminalFill className={'terminal-icon'}/>
                </div>
                <div className={'font'}>
                  Jinhyo's Devlog
                </div>
              </div>

              <p>Do you want to logout?</p>
              <div className={'button-container'}>
                <button onClick={onClose} className={'close-btn'}>No</button>
                <button
                  onClick={() => {
                    deleteCookie('token')
                    onClose();
                    window.location.replace('/')
                  }}
                  className={'logout-btn'}
                >
                  Yes
                </button>
              </div>
            </div>
          )
        }
      })
    )
  }

  return (
    <>
      <HeaderTag>
        <Logo onClick={() => navigate('/')}>

          <div>
            <BsTerminalFill className={'terminal-icon'}/>
          </div>
          <div className={'font-container'}>
            Jinhyo's Devlog
          </div>

        </Logo>

        <div className={'toggle-container'}>
          <DarkModeSwitch
            checked={cookies.theme === 'dark'}
            onChange={toggleDarkMode}
            size={30}
            className={'toggle-dark-theme'}
          />
        </div>


        <Tooltip title={'Admin'}>
          <AdminLink onClick={() => navigate(isAdmin ? '/admin/upload' : '/login')}>
            <FaUserCog/>
          </AdminLink>
        </Tooltip>

        {
          isAdmin && (
            <Tooltip title={'Logout'}>
              <AdminLink onClick={logoutHandler}>
                <MdLogout/>
              </AdminLink>
            </Tooltip>
          )
        }

      </HeaderTag>
    </>
  )
}

const HeaderTag = styled.header`
  position: sticky;
  top: 0;
  width: 100%;
  height: 5rem;
  font-family: 'D2Coding';
  font-size: 1.7rem;
  background: ${({theme}) => theme.headerBackground};
  z-index: 1000;
`

const Logo = styled.div`
  height: 5rem;
  float: left;
  width: 10rem;
  text-align: center;
  margin-left: 5%;
  cursor: pointer;

  & div {
    font-size: 1rem;
    color: ${({theme}) => theme.fontColor};
  }

  & div svg {
    font-size: 1.5rem;
    margin-top: 1.1rem;
  }
  
  @media (max-width: 549px) {
    width: 7rem;
    
    & div {
      font-size: 0.8rem;
    }

    & div svg {
      font-size: 1.2rem;
      margin-top: 1.5rem;
    }
  }
`

const AdminLink = styled.div`
  font-size: 1.7rem;
  margin-top: 1.75rem;
  float: right;
  height: auto;
  width: 2rem;
  color: ${({theme}) => theme.fontColor};
  text-align: center;
  margin-right: 0.5rem;
  cursor: pointer;
`

export default Header