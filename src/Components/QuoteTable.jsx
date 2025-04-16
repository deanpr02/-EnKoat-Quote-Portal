import { useState,useEffect,useMemo } from 'react'

import './QuoteTable.css'

export default function QuoteTable({quotes,setIsEnterQuote}){
    const [sortKey,setSortKey] = useState('contractor_name')
    const [sortDirection,setSortDirection] = useState(-1)

    const sortedQuotes = useMemo(() => {
        if (!sortKey || !quotes) return quotes;
        const arr = [...quotes]; // Copy array to avoid mutation
    
        return arr.sort((a, b) => {
          if (sortKey === 'roof_size') {
            return (b.roof_size - a.roof_size) * sortDirection;
          }
          return a[sortKey].localeCompare(b[sortKey]) * sortDirection;
        });
      }, [quotes, sortKey, sortDirection]);

    return(
        <div className='quote-table-container'>
            <TableLabel setIsEnterQuote={setIsEnterQuote} setSortKey={setSortKey} sortKey={sortKey} setSortDirection={setSortDirection}/>
            <div className='data-table-members'>
            {sortedQuotes && 
                sortedQuotes.map((obj,i) => {
                    return <DataRow quote={obj} colorKey={i}/>
                })}
            </div>
        </div>
    )
}

function TableLabel({setIsEnterQuote,setSortKey,sortKey,setSortDirection}){
    const handleSort = (val) => {
        setSortKey(val)

        if(val !== sortKey){
            setSortDirection(1)
            return
        }
        setSortDirection((prev) => prev*-1)
    }

    return(
        <div className='quote-table-label'>
            <div className='column' onClick={()=>handleSort('contractor_name')}><p>Contractor</p></div>
            <div className='column' onClick={()=>handleSort('company_name')}><p>Company</p></div>
            <div className='column' onClick={()=>handleSort('roof_size')}><p>Roof Size (sqft)</p></div>
            <div className='column' onClick={()=>handleSort('roof_type')}><p>Roof Type</p></div>
            <div className='column' onClick={()=>handleSort('city')}><p>City</p></div>
            <div className='column' onClick={()=>handleSort('state')}><p>State</p></div>
            <div className='column'><p>Date</p></div>
            <div className='add-button' onClick={()=>setIsEnterQuote(true)}>+</div>
        </div>
    )
}

function DataRow({quote,colorKey}){
    const rowColor = colorKey % 2 == 0 ? 'rgba(35,35,35)' : 'rgba(70,70,70)' 

    return(
        <div className='quote-table-row' style={{backgroundColor:rowColor}}>
            <div className='row-value'><p>{quote.contractor_name}</p></div>
            <div className='row-value'><p>{quote.company_name}</p></div>
            <div className='row-value'><p>{quote.roof_size}</p></div>
            <div className='row-value'><p>{quote.roof_type}</p></div>
            <div className='row-value'><p>{quote.city}</p></div>
            <div className='row-value'><p>{quote.state}</p></div>
            <div className='row-value'><p>{quote.date}</p></div>
            <HelpButton/>
        </div>
    )

}

function HelpButton(){
    return(
        <div className='help-button'>...</div>
    )
}