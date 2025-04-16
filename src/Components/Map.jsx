import { useState,useEffect,useRef } from 'react'
import { useStateInfo } from '../Hooks/useStateInfo'
import DropDown from './Dropdown';

import './Map.css'

const states = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY']

export default function Map({selectedState,setSelectedState}){
    const { stateInfo,stateImage } = useStateInfo(selectedState);
    
    return(
        <div className='map-main-container'>
            <DropDown data={states} state={selectedState} setFunc={setSelectedState}/>
            {stateInfo && <State left={stateInfo.left} right={stateInfo.right} top={stateInfo.top} bottom={stateInfo.bottom} cities={stateInfo.cities} image={stateImage}/>}
        </div>
    )
}

function State({left,right,top,bottom,cities,image}){
    const canvasRef = useRef();

    const convertToScreenCoords = (lat,long,width,height) => {
        const screenY = height -((lat-bottom) / (top-bottom)) * height;
        const screenX = ((long-left) / (right-left)) * width;

        return { screenX,screenY };
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.src = image;

        img.onload = function() {
            canvas.width = img.width;
            canvas.height = img.height;

            ctx.drawImage(img,0,0,canvas.width,canvas.height);

            Object.values(cities).forEach(city => {
                const { screenX,screenY } = convertToScreenCoords(city.lat,city.long,canvas.width,canvas.height);
                ctx.beginPath();
                ctx.arc(screenX,screenY,10,0,2*Math.PI);
                ctx.fillStyle = 'red';
                ctx.fill();
            })
        }

    },[cities])

    return(
        <div className='map-container'>
            <canvas style={{maxWidth:'400px',maxHeight:'400px',width:'50vw',objectFit:'contain'}} ref={canvasRef}/>
        </div>
    )
}
