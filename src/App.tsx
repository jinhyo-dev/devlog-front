import { Route, Routes } from 'react-router-dom'
import Main from "./pages/Main";
import React from "react";
import Providers from "./Providers";

const App = () => {
  return (
    <Providers>
      <Routes>
        <Route path={'/'} element={<Main/>}/>
        <Route path={'/tag/:tag'} element={<Main/>}/>
      </Routes>
    </Providers>
  )
}

export default App
