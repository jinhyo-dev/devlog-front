import { Route, Routes } from 'react-router-dom'
import Main from "./pages/Main";
import React from "react";
import Providers from "./Providers";
import AdminLogin from "./pages/AdminLogin";
import ControlPosts from "./pages/admin/ControlPosts";
import Post from "./pages/Post";

const App = () => {
  return (
    <Providers>
      <Routes>
        <Route path={'/'} element={<Main/>}/>
        <Route path={'/tag/:tag'} element={<Main/>}/>
        <Route path={'/search/:search'} element={<Main/>}/>
        <Route path={'/post/:postId'} element={<Post/>}/>
        <Route path={'/login'} element={<AdminLogin/>}/>
        <Route path={'/admin/posts'} element={<ControlPosts/>}/>
      </Routes>
    </Providers>
  )
}

export default App
