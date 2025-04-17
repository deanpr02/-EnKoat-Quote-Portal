import { useEffect,useState,useCallback } from 'react'

export function useRoofTypes(){
    const [typeCounts,setTypeCounts] = useState(undefined)
    
    const fetchTypeCounts = useCallback(async () => {
        try{
            const response = await fetch('/api/roof_types');
            if(!response.ok){
                throw new Error(`HTTP error, stats: ${response.status}`);
            }
                const result = await response.json()
                console.log(result)
                setTypeCounts(result)
        }
        catch (error) {
            console.error('Fetch error:',error);
        }
    },[]);

    useEffect(() => {
        fetchTypeCounts();
    },[fetchTypeCounts]);

    return {typeCounts,refetchTypes:fetchTypeCounts}
}