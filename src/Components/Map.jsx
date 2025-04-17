import { useState,useEffect,useRef,useContext } from 'react'
import { useStateInfo } from '../Hooks/useStateInfo'
import { StateContext } from './App';
import DropDown from './Dropdown';

import './Map.css'

export default function Map({selectedState,setSelectedState}){
    const { stateInfo,stateImage } = useStateInfo(selectedState);
    const stateList = useContext(StateContext);

    return(
        <div className='map-main-container'>
            <DropDown data={stateList} state={selectedState} setFunc={setSelectedState}/>
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
