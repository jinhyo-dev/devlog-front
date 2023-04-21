import { Route, Routes } from 'react-router-dom'
import Main from "./pages/Main";
import React from "react";
import Providers from "./Providers";
import AdminLogin from "./pages/AdminLogin";
import UploadPost from "./pages/admin/UploadPost";
import Post from "./pages/Post";
import EditPost from "./pages/admin/EditPost";
import NotFound from "./components/NotFound";

const App = () => {
  return (
    <Providers>
      <Routes>
        <Route path={'/'} element={<Main/>}/>
        <Route path={'/tag/:tag'} element={<Main/>}/>
        <Route path={'/search/:search'} element={<Main/>}/>
        <Route path={'/post/:postId'} element={<Post/>}/>
        <Route path={'/login'} element={<AdminLogin/>}/>
        <Route path={'/admin/upload'} element={<UploadPost/>}/>
        <Route path={'/admin/edit/post/:postId'} element={<EditPost/>}/>
        <Route path={'*'} element={<NotFound/>}/>
      </Routes>
    </Providers>
  )
}

export default App
