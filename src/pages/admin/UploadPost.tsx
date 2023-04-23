import React, { useState, useEffect, FormEvent } from 'react';
import Header from '../../components/Header';
import axios from 'axios';
import { useCookies } from "react-cookie";
import MDEditor from '@uiw/react-md-editor'
import { RiImageAddFill } from 'react-icons/ri'
import styled from "styled-components";
import { returnTokenValue } from "../../utils/cookie";
import { toast, Toaster } from "react-hot-toast";
import Unauthorized from "../../components/Unauthorized";

const UploadPost = () => {
  const [cookies] = useCookies()
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState<number>(NaN)
  const [title, setTitle] = useState<string>('')
  const [info, setInfo] = useState<string>('')
  const [role, setRole] = useState<string>('')
  const [tags, setTags] = useState<string[]>([])
  const [tagValue, setTagValue] = useState<string>('')
  const [isFormSaved, setIsFormSaved] = useState<boolean>(false)

  useEffect(() => {
    returnTokenValue()
      .then((res: any) => {
        if (res?.roles === "ROLE_ADMIN") {
          setUserId(res.id)
          setRole(res.roles)
        }
      })
      .catch((err) => console.log(err));

  }, [])

  const ErrorToast = (text: string) => toast(text, {
    position: 'top-center',
    duration: 1000,
    style: {
      backgroundColor: '#e03535',
      fontFamily: 'Pretendard-Regular',
      color: '#fff',
    }
  });

  const extractImage = (): string | null => {
    const regex = /!\[Image\]\((.*?)\)/;
    const match = content.match(regex);
    if (match && match.length >= 2) {
      return extractFileNameFromUrl(match[1].trim());
    } else {
      return null;
    }
  }

  const extractFileNameFromUrl = (url: string): string | null => {
    const match = url.match(/\/([^/]+)$/);
    if (match && match.length === 2) {
      return match[1];
    } else {
      return null;
    }
  };


  const addPost = () => {
    let postContent = {
      "memberId": userId,
      "title": title,
      'info': info,
      "content": content,
      "hashTag": tags,
      'image': extractImage()
    }

    if (postContent.image === null) {
      ErrorToast('한개 이상의 이미지를 첨부해 주세요')
    } else if (!isFormSaved) {
      ErrorToast('제목과 소개글을 먼저 입력해 주세요')
    } else {
      toast.promise(
        axios.post(`${import.meta.env.VITE_API_URL}/api/admin/post`, JSON.stringify(postContent), {
          headers: {
            'Authorization': `Bearer ${cookies.token}`,
            'Content-Type': 'application/json'
          },
        }).then(() => setContent('')),
        {
          loading: '업로드중..',
          success: <div style={{fontSize: '1rem'}}>업로드가 완료되었습니다!</div>,
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
      onSuccess(import.meta.env.VITE_API_URL + '/image/' + response.data.result.image.fileSaveName);
    } catch (error) {
      // 이미지 업로드 실패 시, 에러 정보를 onError 콜백에 전달
      onError(error);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isFormSaved) ErrorToast('제목과 소개글을 먼저 입력해 주세요')
    else {
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
    }
  };

  const changeTitleAndInfo = (e: FormEvent) => {
    e.preventDefault()
    const extractArr = tagValue
      .split(',')
      .map((str: string) => str.trim())
      .filter((str: string, index: number, arr: string[]) =>
        str.length > 0 && arr.indexOf(str) === index
      );

    setTagValue(extractArr.map((v: string, index: number) => index === extractArr.length - 1 ? `${v}` : `${v}, `).join(''))
    !isFormSaved && setContent(`# ${title}\n${extractArr.map(v => `\`${v}\``).join('&nbsp;&nbsp;&nbsp;')}\n> ${info}\n\n`)
    setTags(extractArr)
    setIsFormSaved(true)
  }

  const handleContentValue = (value: string) => {
    if (!isFormSaved) {
      ErrorToast('제목과 소개글을 먼저 입력해 주세요')
    } else {
      setContent(value)
    }
  }

  if (role !== 'ROLE_ADMIN') return (
    <>
      <Header/>
      <Unauthorized/>
    </>
  )
  else {
    return (
      <Container>
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

            <InputForm onSubmit={changeTitleAndInfo}>
              <Input placeholder={'제목 입력'} value={title} onChange={(e) => setTitle(e.target.value)}
                     readOnly={isFormSaved} required={true}/>
              <Input placeholder={'소개글 입력'} value={info} style={{width: '15rem'}}
                     onChange={(e) => setInfo(e.target.value)} readOnly={isFormSaved} required={true}/>
              <Input placeholder={"태그 입력(쉼표 ','로 구분)"} style={{width: '15rem'}} required={true}
                     readOnly={isFormSaved} value={tagValue} onChange={(e) => setTagValue(e.target.value)}/>
              {!isFormSaved && <SubmitButton type={'submit'}>확인</SubmitButton>}
            </InputForm>

            <AddPost onClick={addPost}>
              업로드
            </AddPost>
          </TopContainer>

          <div data-color-mode={cookies.theme === 'dark' ? 'dark' : 'light'}>
            <div className={'wmde-markdown-var'}></div>
            <MDEditor
              value={content}
              onChange={(value: any) => handleContentValue(value)}
              height={680}
            />
          </div>
        </div>
        <Toaster/>
      </Container>
    )
  }
}

const Container = styled.div`
  min-width: 1150px;
`

const TopContainer = styled.div`
  width: 100%;
  font-family: 'Pretendard-Regular';
  height: 2rem;
  color: ${({theme}) => theme.fontColor};
`

const InputImage = styled.div`
  margin-top: 0.3rem;
  width: 6.5rem;
  float: left;
  text-align: center;
  transition: all 0.2s;
  cursor: pointer;
`

const AddPost = styled.button`
  float: right;
  width: 6rem;
  height: 2rem;
  font-family: 'Pretendard-Regular';
  background-color: #20c997;
  border: none;
  border-radius: 6px;
  transition: 0.2s all;
  color: ${({theme}) => theme.fontColor};
  cursor: pointer;

  &:hover {
    background-color: #1aa179;
  }
`

const InputForm = styled.form`
  width: 50rem;
  float: left;
  height: auto;
`

const Input = styled.input`
  width: 10rem;
  float: left;
  height: 1.8rem;
  margin-left: 1rem;
  background: none;
  border: none;
  color: ${({theme}) => theme.fontColor};
  border-radius: 9px;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
`

const SubmitButton = styled.button`
  width: 3rem;
  height: 2rem;
  background: ${({theme}) => theme.fontColor};
  color: ${({theme}) => theme.backgroundColor};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-left: 1rem;
`

export default UploadPost;