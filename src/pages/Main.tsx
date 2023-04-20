import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import LinesEllipsis from 'react-lines-ellipsis'
import Hashtags from "../components/Hashtags";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import axios, { AxiosResponse } from "axios";
import Loaders from "../components/Loaders";
import NoneValue from "../components/NoneValue";
import TextTruncate from 'react-text-truncate';
import { MdEdit } from 'react-icons/md'
import { RiDeleteBin6Fill } from 'react-icons/ri'
import { returnTokenValue } from "../utils/cookie";
import { confirmAlert } from "react-confirm-alert";
import { BsTerminalFill } from "react-icons/bs";
import { useCookies } from "react-cookie";
import { toast, Toaster } from "react-hot-toast";
import Tooltip from "@mui/material/Tooltip";

const Main = () => {
  const [posts, setPosts] = useState<any>([])
  const {tag} = useParams()
  const {search} = useParams()
  const [cookies] = useCookies()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isError, setIsError] = useState<boolean>(false)
  const [role, setRole] = useState<string>('')
  const [hashtag, setHashtag] = useState<any>([])
  const [postCount, setPostCount] = useState<number>(NaN)
  const navigate = useNavigate()

  useEffect(() => {
    document.documentElement.setAttribute('data-color-mode', 'dark')
    returnTokenValue()
      .then((res: any) => {
        if (res?.roles === "ROLE_ADMIN") setRole(res.roles)
      })
      .catch((err) => console.log(err));

  }, [])

  useEffect(() => {
    getPosts()
    getHashtags()
  }, [tag, search])

  const getPosts = () => {
    setPosts([])
    setIsLoading(true)
    let data: any = []

    axios.get(`${import.meta.env.VITE_API_URL}/api/post`)
      .then((res: AxiosResponse) => {
        for (let v of res.data.result) {
          let tags = []
          for (let tag of v.hashTags) tags.push(tag.name)

          data.push({
            id: v.id,
            imgSrc: v.image ? `${import.meta.env.VITE_API_URL}/${v.image.filePath}` : '',
            title: v.title,
            info: v.info || '소개글 없음',
            date: v.createdAt,
            hashtags: tags,
            views: v.view,
          })
        }

        if (tag === undefined && search === undefined) {
          setPosts(data)
        } else if (tag !== undefined) {
          for (let i = 0; i < data.length; i++) {
            if (data[i].hashtags.includes(tag)) {
              setPosts((oldValue: any) => ([...oldValue, data[i]]))
            }
          }
        } else if (search !== undefined) {
          setPosts(Object.values(data).filter((value: any) => (
            value.title.includes(search)
          )))
        }
      })
      .then(() => {
        setTimeout(() => {
          setIsLoading(false)
        }, 50);
      })
      .catch((err) => {
        console.error(err)
        setIsError(true)
        setIsLoading(false)
      })
  }

  const getHashtags = () => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/hashtag`)
      .then((res: AxiosResponse) => {
        setHashtag(res.data.result.hashTags)
        setPostCount(res.data.result.postCount)
      })
      .catch((err) => console.error(err))
  }

  const deleteHandler = (id: number) => {
    return (
      confirmAlert({
        customUI: ({onClose}) => {
          return (
            <div className='custom-alert-ui'>
              <div className={'logo-container'}>
                <div>
                  <BsTerminalFill className={'terminal-icon'}/>
                </div>
                <div className={'font'}>
                  Jinhyo's Devlog
                </div>
              </div>

              <p>해당 게시글을 삭제하시겠습니까?</p>
              <div className={'button-container'}>
                <button onClick={onClose} className={'close-btn'}>No</button>
                <button
                  onClick={() => {
                    deletePost(id)
                    onClose();
                  }}
                  className={'logout-btn'}
                >
                  Yes
                </button>
              </div>
            </div>
          )
        }
      })
    )
  }

  const deletePost = (id: number) => {
    toast.promise(
      axios.delete(`${import.meta.env.VITE_API_URL}/api/admin/delete?id=${id}`, {
        headers: {
          'Authorization': `Bearer ${cookies.token}`,
          'Content-Type': 'application/json'
        },
      })
        .then(() => {
          getPosts()
          getHashtags()
        })
        .catch((err) => console.error(err)),
      {
        loading: '삭제중..',
        success: <div style={{fontSize: '1rem'}}>삭제가 완료되었습니다!</div>,
        error: <div>에러가 발생하였습니다. 새로고침 후 다시 시도해 주세요.</div>
      }, {
        duration: 2000,
        position: 'top-center',
        success: {
          iconTheme: {
            primary: '#fff',
            secondary: '#e03535',
          },
        },
        style: {
          backgroundColor: '#e03535',
          width: '16rem',
          color: '#fff',
          fontFamily: 'Noto Sans KR, sans-serif'
        }
      }
    )
  }

  if (isLoading) return (
    <>
      <Header/>
      <Hashtags postCount={postCount} hashtag={hashtag}/>
      <Loaders/>
    </>
  )
  else if (isError) return <h1>err</h1>
  else if (posts.length > 0 && !isLoading) {
    return (
      <>
        <Header/>
        <Hashtags postCount={postCount} hashtag={hashtag}/>

        <div className="box-container">
          {Object.values(posts).map((value: any, index: number) => (
            <div className="box" key={index}>
              <div className={'image-container'} onClick={() => navigate(`/post/${value.id}`)}>
                <img src={value.imgSrc}
                     alt={'image'}/>
              </div>

              <div className={'text-container'}>

                <div className={'title'} onClick={() => navigate(`/post/${value.id}`)}>
                  <LinesEllipsis
                    text={value.title}
                    maxLine='1'
                    ellipsis='...'
                    trimRight
                    basedOn='letters'
                  />
                </div>

                <div className={'info'} onClick={() => navigate(`/post/${value.id}`)}>
                  <TextTruncate
                    line={3}
                    element="span"
                    truncateText=" …"
                    text={value.info}
                  />
                </div>

                <HashtagContainer onClick={() => navigate(`/post/${value.id}`)}>
                  {value.hashtags.map((tag: string, i: number) => (
                    <>
                      <button style={{marginLeft: i === 0 ? '0' : ''}}>{tag}</button>
                    </>
                  ))}
                </HashtagContainer>


                <div className={'bottom-text'}>
                  <div>
                    <span>{value.date}</span>
                    {
                      role === 'ROLE_ADMIN' &&
											<ControlIcon>

												<Tooltip title={'수정'}>
													<ControlButton>
														<MdEdit className={'edit-icon'}/>
													</ControlButton>
												</Tooltip>

												<Tooltip title={'삭제'}>
													<ControlButton>
														<RiDeleteBin6Fill className={'delete-icon'} onClick={() => deleteHandler(value.id)}/>
													</ControlButton>
												</Tooltip>
											</ControlIcon>
                    }
                    <span style={{float: "right"}}>조회수 {value.views}회</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Toaster/>
      </>
    )
  } else {
    return (
      <>
        <Header/>
        <Hashtags/>
        <NoneValue/>
      </>
    )
  }
}

const HashtagContainer = styled.div`
  width: 90%;
  margin: 1vh auto 0;
  height: 1.6rem;

  & button {
    margin-left: 0.5rem;
    font-size: 0.6rem;
    height: 100%;
    padding-left: 0.6rem;
    padding-right: 0.6rem;
    width: auto;
    background-color: ${({theme}) => theme.hashtagBackgroundColor};
    color: ${({theme}) => theme.hashtagColor};
    border: none;
    border-radius: 1rem;
  }
`

const ControlIcon = styled.span`
  float: right;
  margin-left: 0.5rem;
`

const ControlButton = styled.button`
  background: none;
  border: none;
  color: #777;
`

export default Main