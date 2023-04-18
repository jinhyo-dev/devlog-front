import React, { useEffect, useState } from "react";
import { BsTerminalFill } from 'react-icons/bs'
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { useCookies } from 'react-cookie'
import styled from "styled-components";
import { FaUserCog } from 'react-icons/fa'
import { useNavigate } from "react-router-dom";
import { MdLogout } from 'react-icons/md'
import { deleteCookie, returnTokenValue } from "../utils/cookie";

const Header = () => {
  const navigate = useNavigate()
  const [cookies, setCookie] = useCookies()
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
    setCookie('theme', checked === 'dark' ? 'light' : 'dark')
  };

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


        <AdminLink onClick={() => navigate(isAdmin ? '/admin/posts': '/login')}>
          <FaUserCog/>
        </AdminLink>

        {
          isAdmin && (
            <AdminLink onClick={deleteCookie}>
              <MdLogout/>
            </AdminLink>
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
  // background: ${({theme}) => theme.backgroundColor};
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