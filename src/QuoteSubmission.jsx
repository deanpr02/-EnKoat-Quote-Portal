import { useState } from 'react'

import './QuoteSubmission.css'

export default function QuoteSubmission(){
    const [contractorName,setContractorName] = useState('')
    const [companyName,setCompanyName] = useState('')
    const [roofSize,setRoofSize] = useState('')
    const [roofType,setRoofType] = useState(undefined)


    const roofTypes = ['Foam','Metal','TPO']

    return(
        <div className='quote-submission-container'>
            <h1>Contractor Quote System</h1>
            <form>
                <input type='text' name='contractor-name' placeholder='Contractor Name' onChange={(e)=>setContractorName(e.target.value)}/>
                <input type='text' name='company-name' placeholder='Company Name'/>
                <input type='text' name='location' placeholder='City / State'/>
                <input type='text' name='date' placeholder='Date'/>
                <div className='roof-info'>
                    <input type='text' name='roof-size' placeholder='Roof Size (sq)'/>
                    <DropDown items={roofTypes}/>
                </div>
            </form>
            <div className='button'>
                <p>Submit Quote</p>
            </div>
        </div>
    )
}

function DropDown({items}){
    const [isVisible,setIsVisible] = useState(false)

    return(
        <div className='drop-down-container'> 
            <div className='dropdown-label' onMouseEnter={()=>setIsVisible(true)} onMouseLeave={()=>setIsVisible(false)}>
                <p>Roof Types</p>
            </div>
            {isVisible && 
            <><p>Test</p></>
            }
        </div>
    )
}

function DropDownItem({itemName}){
}