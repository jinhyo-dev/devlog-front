import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import LinesEllipsis from 'react-lines-ellipsis'
import Hashtags from "../components/Hashtags";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Main = () => {
  const [dummyData, setDummyData] = useState<any>([])
  const {tag} = useParams()

  useEffect(() => {
    document.documentElement.setAttribute('data-color-mode', 'dark')
  }, [])

  useEffect(() => {
    getDummyData()
  }, [tag])

  const getDummyData = () => {
    setDummyData([])
    const tmpDummyData = [
      {
        imgSrc: 'https://secrethub.io/img/blog/go-gopher.png',
        title: '컴퓨팅 사고와 개발 실력 늘리는 공부법',
        info: '이번 글은 개발 실력을 늘리기 위한 방법과 컴퓨터적으로 사고하는 법에 대한 개인적인 고찰에 관한 글입니다. 운동이라 생각하고 꾸준히 훈련하기, 요구사항을 데이터 관점으로 사고하기 라는 핵심철학을 바탕으로 어떻게 하면 개발실력을 효과적으로 키우고 컴퓨터적으로 생각하게 할 수 있을지에 대해 얘기하려고 합니다. 이 글이 개발 실력을 늘리고 나에게 맞는 공부법을 찾는 데 도움이 되기를 바랍니다.',
        date: '2023년 6월 8일',
        hashtags: ['go', 'back-end'],
        views: 43
      },
      {
        imgSrc: 'https://cdn.geekboots.com/geek/javascript-meta-1652702081069.jpg',
        title: '컴퓨팅 사고와 개발 실력 늘리는 공부법',
        info: '이번 글은 개발 실력을 늘리기 위한 방법과 컴퓨터적으로 사고하는 법에 대한 개인적인 고찰에 관한 글입니다. 운동이라 생각하고 꾸준히 훈련하기, 요구사항을 데이터 관점으로 사고하기 라는 핵심철학을 바탕으로 어떻게 하면 개발실력을 효과적으로 키우고 컴퓨터적으로 생각하게 할 수 있을지에 대해 얘기하려고 합니다. 이 글이 개발 실력을 늘리고 나에게 맞는 공부법을 찾는 데 도움이 되기를 바랍니다.',
        date: '2023년 6월 8일',
        hashtags: ['javascript'],
        views: 43
      },
      {
        imgSrc: 'https://velog.velcdn.com/images/real-bird/post/e78122ca-dd16-4ae6-832d-03d0edfb18cb/image.png',
        title: '컴퓨팅 사고와 개발 실력 늘리는 공부법',
        info: '이번 글은 개발 실력을 늘리기 위한 방법과 컴퓨터적으로 사고하는 법에 대한 개인적인 고찰에 관한 글입니다. 운동이라 생각하고 꾸준히 훈련하기, 요구사항을 데이터 관점으로 사고하기 라는 핵심철학을 바탕으로 어떻게 하면 개발실력을 효과적으로 키우고 컴퓨터적으로 생각하게 할 수 있을지에 대해 얘기하려고 합니다. 이 글이 개발 실력을 늘리고 나에게 맞는 공부법을 찾는 데 도움이 되기를 바랍니다.',
        date: '2023년 6월 8일',
        hashtags: ['typescript'],
        views: 43
      },
      {
        imgSrc: 'https://res.cloudinary.com/practicaldev/image/fetch/s--jPSX-ydn--/c_imagga_scale,f_auto,fl_progressive,h_900,q_auto,w_1600/https://dev-to-uploads.s3.amazonaws.com/i/tteuu4xw5tomxb7l0xjx.png',
        title: '컴퓨팅 사고와 개발 실력 늘리는 공부법',
        info: '이번 글은 개발 실력을 늘리기 위한 방법과 컴퓨터적으로 사고하는 법에 대한 개인적인 고찰에 관한 글입니다. 운동이라 생각하고 꾸준히 훈련하기, 요구사항을 데이터 관점으로 사고하기 라는 핵심철학을 바탕으로 어떻게 하면 개발실력을 효과적으로 키우고 컴퓨터적으로 생각하게 할 수 있을지에 대해 얘기하려고 합니다. 이 글이 개발 실력을 늘리고 나에게 맞는 공부법을 찾는 데 도움이 되기를 바랍니다.',
        date: '2023년 6월 8일',
        hashtags: ['python'],
        views: 43
      },
      {
        imgSrc: 'https://images.clickittech.com/2020/wp-content/uploads/2020/11/17202436/ReactJS_Banner-min-1-1536x772-1.jpg',
        title: '컴퓨팅 사고와 개발 실력 늘리는 공부법',
        info: '이번 글은 개발 실력을 늘리기 위한 방법과 컴퓨터적으로 사고하는 법에 대한 개인적인 고찰에 관한 글입니다. 운동이라 생각하고 꾸준히 훈련하기, 요구사항을 데이터 관점으로 사고하기 라는 핵심철학을 바탕으로 어떻게 하면 개발실력을 효과적으로 키우고 컴퓨터적으로 생각하게 할 수 있을지에 대해 얘기하려고 합니다. 이 글이 개발 실력을 늘리고 나에게 맞는 공부법을 찾는 데 도움이 되기를 바랍니다.',
        date: '2023년 6월 8일',
        hashtags: ['react'],
        views: 43
      }
    ]

    if (tag === undefined) {
      setDummyData(tmpDummyData)
    } else {
      for (let v of tmpDummyData) {
        if (v.hashtags.includes(tag)) {
          setDummyData((oldValue: any) => ([...oldValue, v]))
        }
      }
    }

  }

  return (
    <>
      <Header/>
      <Hashtags/>

      <div className="box-container">
        {Object.values(dummyData).map((value: any, index: number) => (
          <>
            {
              dummyData && (
                <div className="box" key={index}>
                  <div className={'image-container'}>
                    <img src={value.imgSrc}
                         alt={'newjeans'}/>
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
                        <><button style={{marginLeft: i === 0 ? '0' : ''}}>{tag}</button></>
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
              )
            }
          </>
        ))}
      </div>
    </>
  )
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
    background-color: ${({ theme }) => theme.backgroundColor};
    color: ${({ theme }) => theme.hashtagColor};
    border: none;
    border-radius: 1rem;
  }
`

export default Main