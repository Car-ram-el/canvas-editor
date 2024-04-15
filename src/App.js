import React from 'react'
import Editor from './components/Editor'

const App = () => {
  return (
    <div className=' bg-gray-200 h-screen flex flex-col md:flex-row justify-center items-center'>
      <Editor/>
    </div>
  )
}

export default App