import React from "react";
import { BsTerminalFill } from 'react-icons/bs'
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import {useCookies} from 'react-cookie'
import styled from "styled-components";

const Header = () => {
  const [cookies, setCookie] = useCookies()

  const toggleDarkMode = () => {
    let checked: string = cookies.theme
    setCookie('theme',checked === 'dark' ? 'light' : 'dark')
  };

  return (
    <>
      <header className={'header'}>
        <Logo>

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
      </header>
    </>
  )
}

const Logo = styled.div`
  height: 5rem;
  float: left;
  width: 10rem;
  text-align: center;
  margin-left: 5%;
  
  & div {
    font-size: 1rem;
    color: ${({ theme }) => theme.fontColor}
  }

  & div svg {
    font-size: 1.5rem;
    margin-top: 1.1rem;
  }
`

export default Header