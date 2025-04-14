import { useState } from 'react'
import QuoteSubmission from './QuoteSubmission'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <QuoteSubmission/>
    </>
  )
}

export default App
