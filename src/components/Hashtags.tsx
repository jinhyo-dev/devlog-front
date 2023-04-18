import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md'
import { useNavigate } from "react-router-dom";
import axios, { AxiosResponse } from "axios";

const Hashtags = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate()
  const [hashtagValue, setHashtagValue] = useState<any>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isError, setIsError] = useState<boolean>(false)
  const [postCount, setPostCount] = useState<number>(NaN)

  useEffect(() => {
    getHashtagValues()
  }, [])

  const getHashtagValues = () => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/hashtag`)
      .then((res: AxiosResponse) => {
        setHashtagValue(res.data.result.hashTags)
        setPostCount(res.data.result.postCount)
      })
      .catch((err) => {
        console.error(err)
        setIsError(true)
      })
      .then(() => setIsLoading(false))
  }

  const handleScroll = (scrollOffset: number) => {
    if (scrollRef.current)
      scrollRef.current.scrollLeft += scrollOffset;
  }

  if (isLoading) return <></>
  else if (isError) return <div>error</div>
  else if (!hashtagValue) return <></>
  else {
    return (
      <HashtagContainer>
        <ArrowButton style={{float: 'left', marginRight: '0.5rem'}} onClick={() => handleScroll(-200)}>
          <MdOutlineKeyboardArrowLeft/>
        </ArrowButton>
        <Hashtag ref={scrollRef}>
          <>
            <Button style={{marginLeft: '0'}} onClick={() => navigate('/')}>All ({postCount})</Button>
            {Object.values(hashtagValue).map((value: any, index: number) => (
              <Button onClick={() => navigate(`/tag/${value.hashtag}`)} key={index}>
                {value.hashtag} ({value.count})
              </Button>
            ))}
          </>
        </Hashtag>
        <ArrowButton style={{float: 'right'}} onClick={() => handleScroll(200)}>
          <MdOutlineKeyboardArrowRight/>
        </ArrowButton>
      </HashtagContainer>
    )
  }
}

const HashtagContainer = styled.div`
  width: 90%;
  height: 2rem;
  margin: auto;
`

const Hashtag = styled.div`
  float: left;
  width: calc(100% - 5rem);
  height: 2rem;
  overflow: hidden;
  scroll-behavior: smooth;
  white-space: nowrap;
`

const Button = styled.button`
  height: 100%;
  width: auto;
  padding-left: 1rem;
  padding-right: 1rem;
  margin-left: 1rem;
  background-color: ${({theme}) => theme.boxColor};
  border: ${({theme}) => theme.hashtagBorder};
  border-radius: 5px;
  color: ${({theme}) => theme.hashtagColor};
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    background-color: ${({theme}) => theme.hashtagHoverColor};
    color: ${({theme}) => theme.backgroundColor};
  }
`

const ArrowButton = styled.button`
  height: 100%;
  width: 2rem;
  background: none;
  border: none;
  font-size: 1.8rem;
  transition: 0.15s all;
  cursor: pointer;
  color: ${({theme}) => theme.fontColor};

  &:hover {
    color: #1980ff;
  }
`

export default Hashtags