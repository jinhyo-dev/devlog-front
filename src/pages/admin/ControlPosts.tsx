import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import axios, { AxiosResponse } from 'axios';
import { useCookies } from "react-cookie";
import MDEditor from '@uiw/react-md-editor'
import { RiImageAddFill } from 'react-icons/ri'
import { HiHashtag } from 'react-icons/hi'
import styled from "styled-components";

const ControlPosts = () => {
  const [cookies] = useCookies()
  const [content, setContent] = useState("# Hello world");
  const [hashtags, setHashtags] = useState<string[]>([])

  const addPost = () => {
    let tmp = {
      "memberId": 1,
      "title": "제목",
      "content": "eoguddl",
      "hashTag": [
        "hashtag1",
        "hashtag2",
        "hashtag3"
      ]
    }

    axios.post(`${import.meta.env.VITE_API_URL}/api/admin/post`, JSON.stringify(tmp), {
      headers: {
        'Authorization': `Bearer ${cookies.token}`,
        'Content-Type': 'application/json'
      },
    })
      .then((res: AxiosResponse) => console.log(res))
      .catch((err) => console.log(err))
  }

  const handleImageUpload = async (file: File, onSuccess: (url: string) => void, onError: (error: any) => void) => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/image`, formData, {
        headers: {
          'Authorization': `Bearer ${cookies.token}`,
          'Content-Type': 'multipart/form-data'
        },
      })
      console.log(response.data.result.image.fileSaveName)
      onSuccess(import.meta.env.VITE_API_URL + '/image/' + response.data.result.image.fileSaveName);
    } catch (error) {
      // 이미지 업로드 실패 시, 에러 정보를 onError 콜백에 전달
      onError(error);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleImageUpload(file,
        (url: string) => {
          // 이미지 업로드 성공 시, 이미지 URL을 setContent 함수를 호출하여 에디터에 추가
          setContent(content + `![Image](${url})\n`);
        },
        (error) => {
          // 이미지 업로드 실패 시, 에러 정보를 처리
          console.log('Image upload failed:', error);
        }
      );
    }
  };

  return (
    <>
      <Header/>
      <div className={'editor-container'}>

        <TopContainer>
          <InputImage>
            <label htmlFor="fileInput">
              <RiImageAddFill style={{fontSize: '1rem', marginBottom: '-0.15rem'}}/>
              <span style={{fontSize: '0.9rem', marginLeft: '0.3rem'}}>Add Image</span>
            </label>
            <input type="file" id="fileInput" style={{display: 'none'}} onChange={handleFileSelect}/>
          </InputImage>

          <AddHashTag>
            <HiHashtag style={{fontSize: '1rem', marginBottom: '-0.15rem'}}/>
            <span style={{fontSize: '0.9rem', marginLeft: '0.3rem'}}>Add Hashtag</span>
          </AddHashTag>
        </TopContainer>

        <div data-color-mode={cookies.theme === 'dark' ? 'dark' : 'light'}>
          <div className={'wmde-markdown-var'}></div>
          <MDEditor
            value={content}
            onChange={(value: any) => setContent(value)}
            height={650}
          />
        </div>

      </div>

    </>
  )
}

const TopContainer = styled.div`
  width: 100%;
  font-family: 'Pretendard-Regular';
  height: 1.3rem;
  color: ${({theme}) => theme.fontColor};
`

const InputImage = styled.div`
  width: 6.5rem;
  float: left;
  text-align: center;
  transition: all 0.2s;
  cursor: pointer;
  
  &:hover {
    background-color: ${({theme}) => theme.fontColor};
    color: ${({theme}) => theme.backgroundColor};
  }
`

const AddHashTag = styled.div`
  text-align: center;
  width: 7rem;
  float: left;
  margin-left: 1rem;
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    background-color: ${({theme}) => theme.fontColor};
    color: ${({theme}) => theme.backgroundColor};
  }
`

export default ControlPosts;