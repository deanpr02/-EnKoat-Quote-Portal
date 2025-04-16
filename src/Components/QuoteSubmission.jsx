import { useState } from 'react'
import DropDown from './Dropdown';

import './QuoteSubmission.css'

export default function QuoteSubmission({refetch,setIsEnterQuote}){
    const [contractorName,setContractorName] = useState('');
    const [companyName,setCompanyName] = useState('');
    const [roofSize,setRoofSize] = useState('');
    const [roofType,setRoofType] = useState('Foam');
    const [city,setCity] = useState('');
    const [state,setState] = useState('');

    const roofTypes = ['Foam','Metal','TPO'];

    const addQuote = async () => {
        if(!cleanseInput()){
            return
        }

        const now = new Date();
        const date = now.toLocaleDateString();

        const response = await fetch('/api/add_data',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({contractorName:contractorName,companyName:companyName,roofSize:roofSize,roofType:roofType,city:city,state:state,date:date})
        });

        if(!response.ok){
            throw new Error(`HTTP error, status:${response.status}`)
        }
        const result = await response.json();
        console.log(result);

        resetInput();
        refetch();
        setIsEnterQuote(false)

    }

    const resetInput = () => {
        setContractorName('')
        setCompanyName('')
        setCity('')
        setState('')
        setRoofType('Foam')
        setRoofSize('')
    }

    const cleanseInput = () => {
        if(contractorName == '' || contractorName.length > 50){
            alert('Invalid contractor name!');
            return false;
        }

        else if(companyName == '' || companyName.length > 50){
            alert('Invalid company name!');
            return false;
        }

        else if(city == '' || city.length > 20){
            alert('Invalid city name!');
            return false;
        }

        else if(state == '' || state.length > 20){
            alert('Invalid state name!');
            return false;
        }

        else if(!Number.isInteger(Number(roofSize))){
            alert('Roof size is not an integer!');
            return false;
        }

        return true;
    }

    return(
        <div className='background-filter'>
            <div className='quote-submission-container' id ='quote-submit'>
                <h1>Add a new quote</h1>
                <form>
                    <input type='text' name='contractor-name' placeholder='Contractor Name' value={contractorName} onChange={(e)=>setContractorName(e.target.value)}/>
                    <input type='text' name='company-name' placeholder='Company Name' value={companyName} onChange={(e)=>setCompanyName(e.target.value)}/>
                    <div className='location'><input type='text' name='location' placeholder='City' value={city} onChange={(e)=>setCity(e.target.value)}/><input type='text' name='location' placeholder='State' value={state} onChange={(e)=>setState(e.target.value)}/></div>
                    <div className='roof-info'>
                        <input type='text' name='roof-size' placeholder='Roof Size (sq)' value={roofSize} onChange={(e)=>setRoofSize(e.target.value)}/>
                        <DropDown data={roofTypes} state={roofType} setFunc={setRoofType}/>
                    </div>
                </form>
                <div className='button' onClick={addQuote}>
                    <p>Submit Quote</p>
                </div>
            </div>
        </div>
    )
}
