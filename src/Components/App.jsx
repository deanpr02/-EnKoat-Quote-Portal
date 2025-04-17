import { useState,createContext } from 'react'
import { useFetchQuotes } from "../Hooks/useFetchQuotes"
import QuoteSubmission from './QuoteSubmission'
import QuoteTable from './QuoteTable'
import PerformanceDashboard from './PerformanceDashboard'
import './App.css'

export const StateContext = createContext(null);
const states = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY']

function App() {
  const [isEnterQuote,setIsEnterQuote] = useState(false)
  const { quotes, refetch } = useFetchQuotes();

  return (
    <StateContext.Provider value={states}>
      <div className='dashboard-container' style={{width:'100%'}}>
        <QuoteTable quotes={quotes} setIsEnterQuote={setIsEnterQuote}/>
        <PerformanceDashboard quotes={quotes}/>

        {isEnterQuote &&
          <QuoteSubmission refetch={refetch} setIsEnterQuote={setIsEnterQuote}/>}
      </div>
    </StateContext.Provider>
  )
}

export default App
