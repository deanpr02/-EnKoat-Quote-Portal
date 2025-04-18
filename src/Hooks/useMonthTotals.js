import { useEffect,useState,useCallback } from 'react'

export function useMonthTotals(){
    const [months,setMonths] = useState(undefined)
    
    const fetchMonths = useCallback(async () => {
        try{
            const response = await fetch('/api/month_totals');
            if(!response.ok){
                throw new Error(`HTTP error, stats: ${response.status}`);
            }
                const result = await response.json()
                setMonths(result)
        }
        catch (error) {
            console.error('Fetch error:',error);
        }
    },[]);

    useEffect(() => {
        fetchMonths();
    },[fetchMonths]);

    return {months,refetchMonths:fetchMonths}
}