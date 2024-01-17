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
          <Route exact path="/" element={<News progress={setProgressBar} key='world'  country='US,CA' category='world' apiKey={apiKey} color='dark' />} />
          <Route exact path="/gaming" element={<News progress={setProgressBar} key='gaming'  country='US,CA' category='gaming' apiKey={apiKey}color='dark' />} />
          <Route exact path="/food" element={<News progress={setProgressBar} key='food'  country='US,CA' category='food' apiKey={apiKey}color='success' />} />
          <Route exact path="/entertainment" element={<News progress={setProgressBar} key='entertainment'  country='US,CA' category='entertainment' apiKey={apiKey}color='primary' />} />
          <Route exact path="/politics" element={<News progress={setProgressBar} key='politics'  country='US,CA' category='politics' apiKey={apiKey}color='danger' />} />
          <Route exact path="/travel" element={<News progress={setProgressBar} key='travel'  country='US,CA' category='travel' apiKey={apiKey}color='warning' />} />
          <Route exact path="/sports" element={<News progress={setProgressBar} key='sport'  country='US,CA' category='sport' apiKey={apiKey}color='info' />} />
          <Route exact path="/technology" element={<News progress={setProgressBar} key='tech'  country='US,CA' category='tech' apiKey={apiKey}color='secondary' />} />
        </Routes>
      </BrowserRouter>
      
    )
  }


