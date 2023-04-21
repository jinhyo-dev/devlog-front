import React, { FormEvent, useRef, useState } from "react";
import styled from "styled-components";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md'
import { useNavigate } from "react-router-dom";

const Hashtags = (props: any) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate()
  const [searchValue, setSearchValue] = useState<string>('')

  const handleScroll = (scrollOffset: number) => {
    if (scrollRef.current)
      scrollRef.current.scrollLeft += scrollOffset;
  }

  const searchHandler = (e: FormEvent) => {
    e.preventDefault()
    navigate(searchValue ? `/search/${searchValue}` : '/')
  }

  return (
    <TopContainer>
      <HashtagContainer>
        <ArrowButton style={{float: 'left', marginRight: '0.5rem'}} onClick={() => handleScroll(-200)}>
          <MdOutlineKeyboardArrowLeft/>
        </ArrowButton>
        <Hashtag ref={scrollRef}>
          <>
            <Button style={{marginLeft: '0'}} onClick={() => navigate('/')}>All ({props.postCount})</Button>
            {Object.values(props.hashtag).map((value: any, index: number) => (
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

      <form onSubmit={searchHandler}>
        <SearchBar>
          <Svg aria-hidden="true" viewBox="0 0 24 24" onClick={searchHandler}>
            <g>
              <path
                d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
            </g>
          </Svg>
          <Input placeholder="Search" value={searchValue}
                 onChange={(e) => setSearchValue(e.target.value)}/>
        </SearchBar>
      </form>
    </TopContainer>
  )
}

const TopContainer = styled.div`
  width: 90%;
  height: 2.5rem;
  margin: 0.2rem auto;
`

const SearchBar = styled.div`
  display: flex;
  float: right;
  line-height: 2rem;
  align-items: center;
  position: relative;
  width: 25%;
  max-width: 25rem;

  @media (max-width: 549px) {
    width: 30%;
  }
`

const Svg = styled.svg`
  position: absolute;
  left: 1rem;
  fill: ${({theme}) => theme.hashtagColor};
  width: 1rem;
  height: 1rem;
`

const Input = styled.input`
  width: 100%;
  height: 2rem;
  line-height: 2rem;
  padding: 0 1rem;
  padding-left: 2.5rem;
  border: 1px solid ${({theme}) => theme.hashtagColor};
  border-radius: 8px;
  width: 100%;
  outline: none;
  background-color: ${({theme}) => theme.boxColor};
  color: ${({theme}) => theme.hashtagColor};
  transition: .3s ease;

  &::placeholder {
    color: ${({theme}) => theme.hashtagColor};
  }

  &:focus, &:hover {
    outline: none;
    box-shadow: 0 0 0 2px ${({theme}) => theme.hashtagColor};
`

const HashtagContainer = styled.div`
  margin-top: 0.1rem;
  float: left;
  width: 70%;
`

const Hashtag = styled.div`
  float: left;
  width: calc(100% - 5rem);
  height: 2rem;
  overflow: hidden;
  scroll-behavior: smooth;
  white-space: nowrap;

  @media (max-width: 549px) {
    padding-left: 0.8rem;
    padding-right: 0.8rem;
    overflow: auto;
  }
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
    background-color: ${({theme}) => theme.hashtagColor};
    color: ${({theme}) => theme.backgroundColor};
  }

  @media (max-width: 549px) {
    padding-left: 0.8rem;
    padding-right: 0.8rem;
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
  color: ${({theme}) => theme.hashtagColor};

  &:hover {
    color: ${({theme}) => theme.secondColor};
  }

  @media (max-width: 549px) {
    display: none;
    width: 1.2rem;
    font-size: 1.5rem;
  }

`

export default Hashtags