import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import LinesEllipsis from 'react-lines-ellipsis'
import Hashtags from "../components/Hashtags";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import axios, { AxiosResponse } from "axios";
import Loaders from "../components/Loaders";
import NoneValue from "../components/NoneValue";

const Main = () => {
  const [posts, setPosts] = useState<any>([])
  const {tag} = useParams()
  const {search} = useParams()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isError, setIsError] = useState<boolean>(false)
  const navigate = useNavigate()

  useEffect(() => {
    document.documentElement.setAttribute('data-color-mode', 'dark')
  }, [])

  useEffect(() => {
    getPosts('tag')
  }, [tag])

  useEffect(() => {
    getPosts('search')
  }, [search])


  const getPosts = (division: string) => {
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
            info: v.info !== null ? v.info : '소개글 없음',
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

  if (isLoading) return (
    <>
      <Header/>
      <Hashtags/>
      <Loaders/>
    </>
  )
  else if (isError) return <h1>err</h1>
  else if (posts.length > 0 && !isLoading) {
    return (
      <>
        <Header/>
        <Hashtags/>

        <div className="box-container">
          {Object.values(posts).map((value: any, index: number) => (
            <div className="box" key={index} onClick={() => navigate(`/post/${value.id}`)}>
              <div className={'image-container'}>
                <img src={value.imgSrc}
                     alt={'image'}/>
              </div>

              <div className={'text-container'}>

                <div className={'title'}>
                  <LinesEllipsis
                    text={value.title}
                    maxLine='1'
                    ellipsis='...'
                    trimRight
                    basedOn='letters'
                  />
                </div>

                <div className={'info'}>
                  <LinesEllipsis
                    text={value.info}
                    maxLine='3'
                    ellipsis='...'
                    trimRight
                    basedOn='letters'
                  />
                </div>

                <HashtagContainer>
                  {value.hashtags.map((tag: string, i: number) => (
                    <>
                      <button style={{marginLeft: i === 0 ? '0' : ''}}>{tag}</button>
                    </>
                  ))}
                </HashtagContainer>

                <div className={'bottom-text'}>
                  <div>
                    <span>{value.date}</span>
                    <span style={{float: "right"}}>조회수 {value.views}회</span>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
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
    background-color: ${({theme}) => theme.backgroundColor};
    color: ${({theme}) => theme.hashtagColor};
    border: none;
    border-radius: 1rem;
  }
`

export default Main