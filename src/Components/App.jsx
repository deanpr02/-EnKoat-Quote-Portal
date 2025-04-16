import { useState } from 'react'
import { useFetchQuotes } from "../Hooks/useFetchQuotes"
import QuoteSubmission from './QuoteSubmission'
import QuoteTable from './QuoteTable'
import PerformanceDashboard from './PerformanceDashboard'
import './App.css'

function App() {
  const [isEnterQuote,setIsEnterQuote] = useState(false)
  const { quotes, refetch } = useFetchQuotes();

  return (
    <div className='dashboard-container' style={{width:'100%'}}>
      <QuoteTable quotes={quotes} setIsEnterQuote={setIsEnterQuote}/>
      <PerformanceDashboard quotes={quotes}/>
      
      {isEnterQuote &&
        <QuoteSubmission refetch={refetch} setIsEnterQuote={setIsEnterQuote}/>}
    </div>
  )
}

export default App
