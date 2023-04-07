import React, { useRef } from "react";
import styled from "styled-components";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md'

const Hashtags = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = (scrollOffset: number) => {
    if (scrollRef.current)
      scrollRef.current.scrollLeft += scrollOffset;
  }

  return (
    <HashtagContainer>
      <ArrowButton style={{ float: 'left', marginRight: '0.5rem' }} onClick={() => handleScroll(-200)}>
        <MdOutlineKeyboardArrowLeft/>
      </ArrowButton>
      <Hashtag ref={scrollRef}>
        <Button style={{ marginLeft: '0' }}>All (12)</Button>
        <Button>All (1242)</Button>
        <Button>All</Button>
        <Button>All (2)</Button>
        <Button>All (3)</Button>
        <Button>All (12)</Button>
        <Button>All (1242)</Button>
        <Button>All</Button>
        <Button>All (2)</Button>
        <Button>All (3)</Button>
        <Button>All (12)</Button>
        <Button>All (1242)</Button>
        <Button>All</Button>
        <Button>All (2)</Button>
        <Button>All (3)</Button>
        <Button>All (12)</Button>
        <Button>All (1242)</Button>
        <Button>All</Button>
        <Button>All (2)</Button>
        <Button>All (3)</Button>
        <Button>All (12)</Button>
        <Button>All (1242)</Button>
        <Button>All</Button>
        <Button>All (2)</Button>
        <Button>All (3)</Button>
        <Button>All (12)</Button>
        <Button>All (1242)</Button>
        <Button>All</Button>
        <Button>All (2)</Button>
        <Button>All (3)</Button>
        <Button>All (12)</Button>
        <Button>All (1242)</Button>
        <Button>All</Button>
        <Button>All (2)</Button>
        <Button>All (3)</Button>
        <Button>All (12)</Button>
        <Button>All (1242)</Button>
        <Button>All</Button>
        <Button>All (2)</Button>
        <Button>All (3)</Button>
      </Hashtag>
      <ArrowButton style={{ float: 'right' }} onClick={() => handleScroll(200)}>
        <MdOutlineKeyboardArrowRight/>
      </ArrowButton>
    </HashtagContainer>
  )
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
  background-color: ${({ theme }) => theme.boxColor};
  border: ${({ theme }) => theme.hashtagBorder};
  border-radius: 5px;
  color: ${({ theme }) => theme.hashtagColor};
  transition: all 0.2s;
  cursor: pointer;
  
  &:hover {
    background-color: ${({ theme }) => theme.hashtagHoverColor};
    color: ${({ theme }) => theme.backgroundColor};
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
  color: ${({ theme }) => theme.fontColor};

  &:hover {
    color: #1980ff;
  }
`

export default Hashtags