import { useState,useEffect } from 'react'

export function useFetchCities(stateName){
    const [cityList,setCities] = useState([])

    useEffect(() => {
        const fetchCities = async () => {
            if(stateName === '---'){
                return
            }

            const cachedData = sessionStorage.getItem(`city-list-${stateName}`)
            if(cachedData){
                setCities(JSON.parse(cachedData));
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
                    const stateData = data[stateName]
                    const cityData = Object.keys(stateData['cities'])
                    setCities(cityData)
                    sessionStorage.setItem(`city-list-${stateName}`,JSON.stringify(cityData))
                })
                .catch(error => {
                    console.error('Failed to load JSON: ',error);
                })
        }
        }

        fetchCities();
        
    },[stateName])

    return {cityList}
}