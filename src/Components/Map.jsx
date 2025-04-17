import { useState,useEffect,useRef,useContext } from 'react'
import { useStateInfo } from '../Hooks/useStateInfo'
import { StateContext } from './App';
import DropDown from './Dropdown';

import './Map.css'

export default function Map({selectedState,setSelectedState}){
    const { stateInfo,stateImage,cityCounts } = useStateInfo(selectedState);
    const stateList = useContext(StateContext);

    return(
        <div className='map-main-container'>
            <DropDown data={stateList} state={selectedState} setFunc={setSelectedState}/>
            {stateInfo && <State left={stateInfo.left} right={stateInfo.right} top={stateInfo.top} bottom={stateInfo.bottom} cityPositions={stateInfo.cities} cityCounts={cityCounts} image={stateImage}/>}
        </div>
    )
}

function State({left,right,top,bottom,cityPositions,cityCounts,image}){
    const [cityObjects,setCityObjects] = useState([])
    const canvasRef = useRef();

    const convertToScreenCoords = (lat,long,width,height) => {
        const screenY = height -((lat-bottom) / (top-bottom)) * height;
        const screenX = ((long-left) / (right-left)) * width;

        return { screenX,screenY };
    }

    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
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

            const newCities = Object.entries(cityPositions).map(([cityName, city]) => {
                const { screenX, screenY } = convertToScreenCoords(city.lat, city.long, canvas.width, canvas.height);
                const randomColor = getRandomColor()
                ctx.beginPath();
                ctx.arc(screenX, screenY, 10, 0, 2 * Math.PI);
                ctx.fillStyle = randomColor;
                ctx.fill();
                return { x: screenX, y: screenY, info: cityCounts[cityName] || 0,name: cityName,color:randomColor};
            });
        
            setCityObjects(newCities);
        }

    },[cityPositions])

    return(
        <div className='map-container'>
            <canvas style={{maxWidth:'400px',maxHeight:'400px',width:'50vw',objectFit:'contain'}} ref={canvasRef}/>
            <div className='city-objects-list'>
            {
                cityObjects.map((obj) => {
                    return (
                        <div style={{display:'flex',alignItems:'center'}}>
                            <CityRow name={obj.name} count={obj.info} color={obj.color}/>
                        </div>
                    )
                })
            }
            </div>
        </div>
    )
}

function CityRow({name,count,color}){
    return(
        <>
            <div style={{width:'1vh',height:'1vh',backgroundColor:color}}></div>
            <p>{name}:</p>
            <p>{count}</p>
        </>
    )
}
