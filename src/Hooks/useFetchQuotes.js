import { useEffect,useState,useCallback } from 'react'

export function useFetchQuotes(){
    const [quotes,setQuotes] = useState(undefined)
    
    const fetchQuotes = useCallback(async () => {
        try{
            const response = await fetch('/api/get_quotes');
            if(!response.ok){
                throw new Error(`HTTP error, stats: ${response.status}`);
            }
                const result = await response.json()
                setQuotes(result)
        }
        catch (error) {
            console.error('Fetch error:',error);
        }
    },[]);

    useEffect(() => {
        fetchQuotes();
    },[fetchQuotes]);

    return {quotes,refetch:fetchQuotes}
}