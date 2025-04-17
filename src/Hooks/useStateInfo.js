import Alabama from '../assets/alabama.png'
import Alaska from '../assets/alaska.png'
import Arizona from '../assets/arizona.png'
import Arkansas from '../assets/arkansas.png'
import California from '../assets/california.png'
import Colorado from '../assets/colorado.png'
import Connecticut from '../assets/connecticut.png'
import Delaware from '../assets/delaware.png'
import Florida from '../assets/florida.png'
import Georgia from '../assets/georgia.png'
import Hawaii from '../assets/hawaii.png'
import Idaho from '../assets/idaho.png'
import Illinois from '../assets/illinois.png'
import Indiana from '../assets/indiana.png'
import Iowa from '../assets/iowa.png'
import Kansas from '../assets/kansas.png'
import Kentucky from '../assets/kentucky.png'
import Louisiana from '../assets/louisiana.png'
import Maine from '../assets/maine.png'
import Maryland from '../assets/maryland.png'
import Massachusetts from '../assets/massachusetts.png'
import Michigan from '../assets/michigan.png'
import Minnesota from '../assets/minnesota.png'
import Mississippi from '../assets/mississippi.png'
import Missouri from '../assets/missouri.png'
import Montana from '../assets/montana.png'
import Nebraska from '../assets/nebraska.png'
import Nevada from '../assets/nevada.png'
import NewHampshire from '../assets/newhampshire.png'
import NewJersey from '../assets/newjersey.png'
import NewMexico from '../assets/newmexico.png'
import NewYork from '../assets/newyork.png'
import NorthCarolina from '../assets/northcarolina.png'
import NorthDakota from '../assets/northdakota.png'
import Ohio from '../assets/ohio.png'
import Oklahoma from '../assets/oklahoma.png'
import Oregon from '../assets/oregon.png'
import Pennsylvania from '../assets/pennsylvania.png'
import RhodeIsland from '../assets/rhodeisland.png'
import SouthCarolina from '../assets/southcarolina.png'
import SouthDakota from '../assets/southdakota.png'
import Tennessee from '../assets/tennessee.png'
import Texas from '../assets/texas.png'
import Utah from '../assets/utah.png'
import Vermont from '../assets/vermont.png'
import Virginia from '../assets/virginia.png'
import Washington from '../assets/washington.png'
import WestVirginia from '../assets/westvirginia.png'
import Wisconsin from '../assets/wisconsin.png'
import Wyoming from '../assets/wyoming.png'

import { useState,useEffect } from 'react'

const stateImages = {
    'AL': Alabama,
    'AK': Alaska,
    'AZ': Arizona,
    'AR': Arkansas,
    'CA': California,
    'CO': Colorado,
    'CT': Connecticut,
    'DE': Delaware,
    'FL': Florida,
    'GA': Georgia,
    'HI': Hawaii,
    'ID': Idaho,
    'IL': Illinois,
    'IN': Indiana,
    'IA': Iowa,
    'KS': Kansas,
    'KY': Kentucky,
    'LA': Louisiana,
    'ME': Maine,
    'MD': Maryland,
    'MA': Massachusetts,
    'MI': Michigan,
    'MN': Minnesota,
    'MS': Mississippi,
    'MO': Missouri,
    'MT': Montana,
    'NE': Nebraska,
    'NV': Nevada,
    'NH': NewHampshire,
    'NJ': NewJersey,
    'NM': NewMexico,
    'NY': NewYork,
    'NC': NorthCarolina,
    'ND': NorthDakota,
    'OH': Ohio,
    'OK': Oklahoma,
    'OR': Oregon,
    'PA': Pennsylvania,
    'RI': RhodeIsland,
    'SC': SouthCarolina,
    'SD': SouthDakota,
    'TN': Tennessee,
    'TX': Texas,
    'UT': Utah,
    'VT': Vermont,
    'VA': Virginia,
    'WA': Washington,
    'WV': WestVirginia,
    'WI': Wisconsin,
    'WY': Wyoming
}

export function useStateInfo(stateName){
    const [stateInfo,setStateInfo] = useState(undefined)
    const [stateImage,setStateImage] = useState(undefined)

    useEffect(() => {
        const cachedData = sessionStorage.getItem(`state-info-${stateName}`)
        if(cachedData){
            setStateInfo(JSON.parse(cachedData))
            setStateImage(stateImages[stateName])
        }
        else{
            fetch('./states.json')
                .then(response => {
                    if(!response.ok){
                        throw new Error(`HTTP error, status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    setStateInfo(data[stateName])
                    setStateImage(stateImages[stateName])
                    sessionStorage.setItem(`state-info-${stateName}`,JSON.stringify(data[stateName]))
                })
                .catch(error => {
                    console.error('Failed to load JSON: ',error);
                })
        }

    },[stateName])

    return {stateInfo,stateImage}
}
