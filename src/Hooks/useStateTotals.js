import { useEffect,useState,useCallback } from 'react'

export function useStateTotals(){
    const [totals,setTotals] = useState(undefined)
    
    const fetchTotals = useCallback(async () => {
        try{
            const response = await fetch('/api/state_totals');
            if(!response.ok){
                throw new Error(`HTTP error, stats: ${response.status}`);
            }
                const result = await response.json()
                setTotals(result)
        }
        catch (error) {
            console.error('Fetch error:',error);
        }
    },[]);

    useEffect(() => {
        fetchTotals();
    },[fetchTotals]);

    return {totals,refetch:fetchTotals}
}