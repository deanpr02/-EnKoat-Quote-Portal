import { useEffect,useState } from 'react'

export function useFetchQuotes(){
    const [quotes,setQuotes] = useState(undefined)
    
    useEffect(() => {
        const fetchFromDatabase = async () => {
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
        }

        fetchFromDatabase()

    },[])

    return {quotes}
}