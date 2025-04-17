import { useState,useContext } from 'react'
import DropDown from './Dropdown';
import { useFetchCities } from '../Hooks/useFetchCities';
import { StateContext } from './App';

import './QuoteSubmission.css'

export default function QuoteSubmission({refetch,setIsEnterQuote}){
    const [contractorName,setContractorName] = useState('');
    const [companyName,setCompanyName] = useState('');
    const [roofSize,setRoofSize] = useState('');
    const [roofType,setRoofType] = useState('Foam');
    const [city,setCity] = useState('---');
    const [state,setState] = useState('---');
    const stateList = useContext(StateContext)

    const { cityList } = useFetchCities(state)

    const roofTypes = ['Foam', 'Tile', 'TPO', 'Wood', 'Composite', 'Metal'];

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

        resetInput();
        refetch();
        setIsEnterQuote(false)

    }

    const resetInput = () => {
        setContractorName('')
        setCompanyName('')
        setCity('---')
        setState('---')
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

        else if(city == '---' || city.length > 20){
            alert('Invalid city name!');
            return false;
        }

        else if(state == '---' || state.length > 20){
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
                <div className='quote-submission-title'>
                    <h1 style={{marginLeft:'30%'}}>Add a new quote</h1>
                    <p className='quote-exit' onClick={()=>setIsEnterQuote(false)}>X</p>
                </div>
                <form>
                    <input type='text' name='contractor-name' placeholder='Contractor Name' value={contractorName} onChange={(e)=>setContractorName(e.target.value)}/>
                    <input type='text' name='company-name' placeholder='Company Name' value={companyName} onChange={(e)=>setCompanyName(e.target.value)}/>
                    <div className='location'>
                        <div style={{display:'flex',flexDirection:'column',alignItems:'flex-start',justifyContent:'center',width:'10vw'}}>
                            <p>State:</p>
                            <DropDown data={stateList} state={state} setFunc={setState} style={{minHeight:'200px'}}/>
                        </div>
                        <div>
                            <p style={{display:'flex',flexDirection:'column',alignItems:'flex-start',justifyContent:'center'}}>City:</p>
                            <DropDown data={cityList} state={city} setFunc={setCity}/>
                        </div>
                    </div>
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
