import { useState } from 'react'
import QuoteSubmission from './QuoteSubmission'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div style={{width:'100%'}}>
      <QuoteSubmission/>
    </div>
  )
}

export default App
