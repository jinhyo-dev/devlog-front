import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import MDEditor from "@uiw/react-md-editor";
import styled from "styled-components";
import Header from "../components/Header";
import { useCookies } from "react-cookie";

const Post = () => {
  const [cookies] = useCookies()
  const [content, setContent] = useState<any>([])
  const {postId} = useParams()

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/post?id=${postId}`)
      .then((res: AxiosResponse) => {
        console.log(res.data.result.content)
        setContent(res.data.result.content)
      })
  }, [postId])

  return (
    <>
      <Header/>
      <EditorContainer data-color-mode={cookies.theme === 'dark' ? 'dark' : 'light'}>
        <MDEditor.Markdown source={content}/>
      </EditorContainer>
    </>
  )
}

const EditorContainer = styled.div`
  background-color: #0d1117;
  margin: 5vh auto;
  width: 65%;
`

export default Post