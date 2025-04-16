import { useState } from 'react'
import { useFetchQuotes } from "../Hooks/useFetchQuotes"
import QuoteSubmission from './QuoteSubmission'
import QuoteTable from './QuoteTable'
import './App.css'

function App() {
  const [isEnterQuote,setIsEnterQuote] = useState(false)
  const { quotes, refetch } = useFetchQuotes();

  return (
    <div style={{width:'100%'}}>
      <QuoteTable quotes={quotes} setIsEnterQuote={setIsEnterQuote}/>
      {isEnterQuote &&
        <QuoteSubmission refetch={refetch} setIsEnterQuote={setIsEnterQuote}/>}
    </div>
  )
}

export default App
