import { useState,useEffect } from 'react'

export function useFetchCities(stateName){
    const [cityList,setCities] = useState([])

    useEffect(() => {
        const fetchCities = async () => {
            if(stateName === '---'){
                return
            }
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
            })
            .catch(error => {
                console.error('Failed to load JSON: ',error);
            })
        }

        fetchCities();
        
    },[stateName])

    return {cityList}
}