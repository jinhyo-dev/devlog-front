import React, { FormEvent, useEffect, useRef, useState } from 'react'
import Header from "../components/Header";
import styled, { keyframes } from "styled-components";
import axios, { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { returnTokenValue } from "../utils/cookie";
import { useCookies } from "react-cookie";

const AdminLogin = () => {
  const [cookies, setCookies] = useCookies()
  const [headingText, setHeadingText] = useState<string>('Enter your password')
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [password, setPassword] = useState<string>('')
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    returnTokenValue()
      .then((res: any) => {
        if (res?.roles === "ROLE_ADMIN") {
          navigate('/admin/upload');
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSelectAll = () => {
    if (inputRef.current) {
      inputRef.current.select();
    }
  };

  const login = (e: FormEvent) => {
    setHeadingText('Verifying credentials...')
    e.preventDefault()

    let payload = {
      username: import.meta.env.VITE_ADMIN,
      password: password
    }

    axios.post(`${import.meta.env.VITE_API_URL}/api/login`, payload)
      .then((res: AxiosResponse) => {
        if (res.status === 200) {
          navigate('/')
          setCookies('token', res.data.token, {
            sameSite: "none",
            secure: true
          })
        }
      })
      .catch(() => {
        setPasswordMismatch(true)
        setHeadingText('Password incorrect')
        handleSelectAll()
      })
      .then(() => {
        setTimeout(() => {
          setPasswordMismatch(false);
        }, 350);
      })
  }

  return (
    <>
      <Header/>
      <Container>
        <LoginForm onSubmit={login}>
          {
            passwordMismatch ?
              <PasswordMismatch>{headingText}</PasswordMismatch> :
              <div style={{color: headingText === 'Password incorrect' ? '#ff4d4d' : ''}}>{headingText}</div>
          }
          <input placeholder={'password'} type={"password"} ref={inputRef} onChange={(e) => setPassword(e.target.value)}/>
        </LoginForm>
      </Container>
    </>
  )
}

const shakeAnimation = keyframes`
  0% {
    transform: translateX(-9px);
  }
  50% {
    transform: translateX(9px);
  }
  100% {
    transform: translateX(-9px);
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(85vh - 5rem);
`

const PasswordMismatch = styled.div`
  animation: ${shakeAnimation} 0.15s linear infinite;
  color: #ff4d4d !important;
`

const LoginForm = styled.form`
  font-family: 'Source Code Pro', monospace;
  width: 25rem;
  margin: auto;
  height: auto;

  & input {
    margin-top: 2rem;
    width: 23rem;
    height: 3.5rem;
    background-color: ${({theme}) => theme.boxColor};
    box-shadow: ${({theme}) => theme.boxShadow};
    border: none;
    border-radius: 9px;
    padding-left: 1rem;
    padding-right: 1rem;
    color: ${({theme}) => theme.fontColor};
    font-size: 1.1rem;

    &::placeholder {
      color: ${({theme}) => theme.fontColor};
    }
  }

  & div {
    color: ${({theme}) => theme.fontColor};
    font-size: 1.7rem;
    text-align: center;
  }

  @media (max-width: 549px) {
    width: 18rem;

    & input {
      width: 16rem;
    }
    
    & div {
      font-size: 1.3rem;
    }
    
  }
`

export default AdminLogin