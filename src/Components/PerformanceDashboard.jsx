import { useStateTotals } from '../Hooks/useStateTotals'

import './PerformanceDashboard.css'

//bar graph of monthly totals of projects
//pie chart of number of projects by state
//have a picture of the state and then it shows dots on the map of locations and if you hover over it it says the number of quotes

export default function PerformanceDashboard({quotes}){
const { totals,refetch } = useStateTotals();

    return(
        <div className='performance-container'>
            <p>Performance</p>
        </div>
    )
}