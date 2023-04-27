import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import MDEditor from "@uiw/react-md-editor";
import styled from "styled-components";
import Header from "../components/Header";
import { useCookies } from "react-cookie";
import Loaders from "../components/Loaders";

const Post = () => {
  const [cookies] = useCookies()
  const [content, setContent] = useState<any>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const {postId} = useParams()

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/post?id=${postId}`)
      .then((res: AxiosResponse) => {
        setContent(res.data.result.content)
      })
      .then(() => setTimeout(() => setIsLoading(false), 300))
  }, [postId])

  if (isLoading) {
    return (
      <>
        <Header/>
        <Loaders/>
      </>
    )
  } else {
    return (
      <>
        <Header/>
        <EditorContainer data-color-mode={cookies.theme === 'dark' ? 'dark' : 'light'}>
          <MDEditor.Markdown source={content}/>
        </EditorContainer>
      </>
    )
  }
}

const EditorContainer = styled.div`
  background-color: #0d1117;
  margin: 5vh auto;
  width: 65%;

  @media (max-width: 549px) {
    width: 90%;
  }
`

export default Post