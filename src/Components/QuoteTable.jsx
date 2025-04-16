import { useFetchQuotes } from "../Hooks/useFetchQuotes"

import './QuoteTable.css'

export default function QuoteTable(){
    const { quotes } = useFetchQuotes();

    return(
        <div className='quote-table-container'>
            <TableLabel/>
            {quotes && 
                quotes.map((obj,i) => {
                    return <DataRow quote={obj} colorKey={i}/>
                })}
        </div>
    )
}

function TableLabel(){
    return(
        <div className='quote-table-label'>
            <div className='column'><p>Contractor</p></div>
            <div className='column'><p>Company</p></div>
            <div className='column'><p>Roof Size (sqft)</p></div>
            <div className='column'><p>Roof Type</p></div>
            <div className='column'><p>City</p></div>
            <div className='column'><p>State</p></div>
            <div className='column'><p>Date</p></div>
        </div>
    )
}

function DataRow({quote,colorKey}){
    const rowColor = colorKey % 2 == 0 ? 'rgba(35,35,35)' : 'rgba(70,70,70)' 

    return(
        <div className='quote-table-row' style={{backgroundColor:rowColor}}>
            <div className='row-value'style={{borderRight:'2px solid gray'}}><p>{quote.contractor_name}</p></div>
            <div className='row-value'style={{borderRight:'2px solid gray'}}><p>{quote.company_name}</p></div>
            <div className='row-value'style={{borderRight:'2px solid gray'}}><p>{quote.roof_size}</p></div>
            <div className='row-value'style={{borderRight:'2px solid gray'}}><p>{quote.roof_type}</p></div>
            <div className='row-value'style={{borderRight:'2px solid gray'}}><p>{quote.city}</p></div>
            <div className='row-value'style={{borderRight:'2px solid gray'}}><p>{quote.state}</p></div>
            <div className='row-value'><p>{quote.date}</p></div>
        </div>
    )

}