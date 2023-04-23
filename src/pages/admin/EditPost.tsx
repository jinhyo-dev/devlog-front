import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import Header from "../../components/Header";
import Loaders from "../../components/Loaders";
import MDEditor from "@uiw/react-md-editor";
import { useCookies } from "react-cookie";
import styled from "styled-components";
import { toast, Toaster } from "react-hot-toast";
import { returnTokenValue } from "../../utils/cookie";
import Unauthorized from "../../components/Unauthorized";

const EditPost = () => {
  const [cookies] = useCookies()
  const {postId} = useParams()
  const [content, setContent] = useState<any>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [userId, setUserId] = useState<number>(NaN)
  const [role, setRole] = useState<string>('')

  useEffect(() => {
    returnTokenValue()
      .then((res: any) => {
        if (res?.roles === "ROLE_ADMIN") {
          setUserId(res.id)
          setRole(res.roles)
          getPost()
        } else {
          setIsLoading(false)
        }
      })
      .catch((err) => console.log(err));
  }, [])

  const getPost = () => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/post?id=${postId}`)
      .then((res: AxiosResponse) => {
        setContent(res.data.result.content)
      })
      .then(() => setIsLoading(false))
  }

  const extractInfo = () => {
    const startIdx = content.indexOf('>') + 1; // '>' 다음 인덱스부터 시작
    const endIdx = content.indexOf('\n', startIdx); // '\n' 이후의 인덱스 전까지 end
    const text = content.slice(startIdx, endIdx).trim(); // '>' 다음부터 '\n' 전까지 문자열 추출 후 양쪽 공백 제거
    return text;
  }

  const extractTitle = () => {
    const startIndex = content.indexOf("#");
    const endIndex = content.indexOf("\n");
    if (startIndex !== -1 && endIndex !== -1) {
      return content.slice(startIndex + 1, endIndex).trim();
    }
    return "";

  }

  const extractTag = () => {
    const regex = /`([^`]+)`/g;
    const matches = content.match(regex);
    if (!matches) return [];
    const uniqueTags = Array.from(new Set(matches));
    const tags = uniqueTags.map((tag: any) => tag.replace(/`/g, "").trim());
    return tags;
  }

  const extractFileNameFromUrl = (url: string): string | null => {
    const match = url.match(/\/([^/]+)$/);
    if (match && match.length === 2) {
      return match[1];
    } else {
      return null;
    }
  };

  const extractImage = () => {
    const regex = /!\[Image\]\((.*?)\)/;
    const match = content.match(regex);
    if (match && match.length >= 2) {
      return extractFileNameFromUrl(match[1].trim());
    } else {
      return null;
    }
  }


  const editPost = () => {
    let postContent = {
      'postId': postId,
      "memberId": userId,
      "title": extractTitle(),
      'info': extractInfo(),
      "content": content,
      "hashTag": extractTag(),
      'image': extractImage()
    }

    console.log(postContent)

    toast.promise(
      axios.post(`${import.meta.env.VITE_API_URL}/api/admin/edit`, JSON.stringify(postContent), {
        headers: {
          'Authorization': `Bearer ${cookies.token}`,
          'Content-Type': 'application/json'
        },
      }).then(() => setContent('')),
      {
        loading: '업로드중..',
        success: <div style={{fontSize: '1rem'}}>수정이 완료되었습니다!</div>,
        error: <div>에러가 발생하였습니다. 새로고침 후 다시 시도해 주세요.</div>
      }, {
        duration: 2000,
        position: 'top-center',
        style: {
          backgroundColor: '#61d345',
          width: '16rem',
          color: '#fff',
          fontFamily: 'Noto Sans KR, sans-serif'
        }
      }
    )
  }

  if (isLoading) {
    return (
      <>
        <Header/>
        <Loaders/>
      </>
    )
  } else if (role !== 'ROLE_ADMIN') {
    return (
      <>
        <Header/>
        <Unauthorized/>
      </>
    )
  } else {
    return (
      <>
        <Header/>
        <EditButton onClick={editPost}>
          수정
        </EditButton>
        <EditorContainer data-color-mode={cookies.theme === 'dark' ? 'dark' : 'light'}>
          <MDEditor
            value={content}
            onChange={(value: any) => setContent(value)}
            height={680}
          />
        </EditorContainer>
        <Toaster/>
      </>
    )
  }
}

const EditorContainer = styled.div`
  margin: 6vh auto 2vh;
  width: 90%;
`

const EditButton = styled.button`
  cursor: pointer;
  float: right;
  width: 5.5rem;
  margin-right: 5%;
  height: 2.2rem;
  border-radius: 8px;
  border: none;
  font-size: 0.9rem;
  background-color: #20c997;
  color: ${({theme}) => theme.fontColor};

  &:hover {
    background-color: #1db487;
  }
`

export default EditPost