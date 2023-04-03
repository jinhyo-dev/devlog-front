import React, { useEffect } from "react";
import MDEditor from '@uiw/react-md-editor';
import Header from "../components/Header";

const Main = () => {
  useEffect(() => {
    document.documentElement.setAttribute('data-color-mode', 'dark')
  }, [])
  const [value, setValue] = React.useState("# Hello world");

  return (
    <div className="container">
      <Header/>

      <div className="box-container">
        <div className="box">Box 1</div>
        <div className="box">Box 2</div>
        <div className="box">Box 3</div>
        <div className="box">Box 4</div>
        <div className="box">Box 5</div>
        <div className="box">Box 6</div>
        <div className="box">Box 7</div>
        <div className="box">Box 8</div>
        <div className="box">Box 9</div>
        <div className="box">Box 10</div>
      </div>


      {/*<div style={{ width: '80%', margin: 'auto' }}><MDEditor.Markdown source={value} style={{whiteSpace: 'pre-wrap'}}/></div>*/}
    </div>
  )
}

export default Main