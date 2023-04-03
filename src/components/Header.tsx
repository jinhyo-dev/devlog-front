import React from "react";
import { BsTerminalFill } from 'react-icons/bs'

const Header = () => {
  return (
    <>
      <header className={'header'}>
        <div className={'logo-container'}>
          <div>
            <BsTerminalFill className={'terminal-icon'}/>
          </div>
          <div className={'font-container'}>
            Jinhyo's Devlog
          </div>
        </div>
      </header>
    </>
  )
}

export default Header