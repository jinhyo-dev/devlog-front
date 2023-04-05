import React, { useRef } from "react";
import styled from "styled-components";

const Hashtags = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = (scrollOffset: number) => {
    if (scrollRef.current)
      scrollRef.current.scrollLeft += scrollOffset;
  }

  return (
    <HashtagContainer>
      <button style={{ float: 'left' }} onClick={() => handleScroll(-200)}>left</button>
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
      <button style={{ float: 'right' }} onClick={() => handleScroll(200)}>right</button>
    </HashtagContainer>
  )
}

const HashtagContainer = styled.div`
  width: 90%;
  height: 2rem;
  margin: auto;
`

const Hashtag = styled.div`
  width: 87%;
  height: 2rem;
  margin: auto;
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
  background-color: #ccc;
  border: none;
  border-radius: 5px;
`

export default Hashtags