import { useState } from 'react'

import './Dropdown.css'

export default function DropDown({data,state,setFunc}){
    const [dropped,setDropped] = useState(false)
    
    const DropMenu = () => {
        return(
            <div className='dropdown-menu'>
                {data.map((obj => {
                    return <p className='dropdown-item'
                            onClick={() => {
                                setFunc(obj)
                                setDropped(false)
                            }}>{obj}</p>
                }))}
            </div>
        )
    }

    return(
        <div className='dropdown-container'>
            <div className='dropdown' onClick={()=>setDropped((prev => !prev))}>
                {!dropped ?
                    <p className='dropdown-text'>{state}</p>
                    :
                    <p className='dropdown-text' style={{opacity:0}}>{state}</p>
                }
            </div>
            {dropped && <DropMenu setFunc={setFunc}/>}
        </div>
    )
}