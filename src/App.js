import React, { useState } from 'react'
import Navbar from './components/Navbar'
import News from './components/News'
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default function App() {
  const apiKey = process.env.REACT_APP_NEWS_API;
  const [progress, setProgress] = useState(0)
 
  const setProgressBar=(progress)=>{
    setProgress(progress)
  }
    return (
      <BrowserRouter >
        <Navbar/>
        <LoadingBar
        color='#f11946'
        progress={progress}
      />
        <Routes>
          <Route exact path="/" element={<News progress={setProgressBar} key='general'  country='us' category='general' apiKey={apiKey} color='dark' />} />
          <Route exact path="/general" element={<News progress={setProgressBar} key='general'  country='us' category='general' apiKey={apiKey}color='dark' />} />
          <Route exact path="/business" element={<News progress={setProgressBar} key='business'  country='us' category='business' apiKey={apiKey}color='success' />} />
          <Route exact path="/entertainment" element={<News progress={setProgressBar} key='entertainment'  country='us' category='entertainment' apiKey={apiKey}color='primary' />} />
          <Route exact path="/health" element={<News progress={setProgressBar} key='health'  country='us' category='health' apiKey={apiKey}color='danger' />} />
          <Route exact path="/science" element={<News progress={setProgressBar} key='science'  country='us' category='science' apiKey={apiKey}color='warning' />} />
          <Route exact path="/sports" element={<News progress={setProgressBar} key='sports'  country='us' category='sports' apiKey={apiKey}color='info' />} />
          <Route exact path="/technology" element={<News progress={setProgressBar} key='technology'  country='us' category='technology' apiKey={apiKey}color='secondary' />} />
        </Routes>
      </BrowserRouter>
      
    )
  }


