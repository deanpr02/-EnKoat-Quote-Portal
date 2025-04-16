import { useState } from 'react'
import { BarChart } from '@mui/x-charts'
import { useStateTotals } from '../Hooks/useStateTotals'
import Map from './Map';

import './PerformanceDashboard.css'

//bar graph of monthly totals of projects
//pie chart of number of projects by state
//have a picture of the state and then it shows dots on the map of locations and if you hover over it it says the number of quotes

export default function PerformanceDashboard({quotes}){
    const { totals,refetch } = useStateTotals();
    const [selectedState,setSelectedState] = useState('AZ')

    return(
        <div className='performance-container'>
            <p>Performance</p>
            {totals && <QuotesBarChart totals={totals}/>}
            <Map selectedState={selectedState} setSelectedState={setSelectedState}/>
        </div>
    )
}

function QuotesBarChart({totals}){
    const xValues = totals.map(item => item.x);
    const yValues = totals.map(item => item.y);

    return(
        <div style={{display:'flex',width:1100,height:300}}>
            <div style={{ textAlign: 'center',marginTop: 8,fontSize: 10, color: '#444',alignSelf:'center',justifyContent:'center', transform:'rotate(90deg)'}}>
                # of quotes
            </div>
            <BarChart 
                series={[{data:yValues}]}
                xAxis={[{scaleType: 'band',data:xValues,dataKey:'States',tickLabelStyle:{fontSize:10}}]}
                yAxis={[]}
            />

        </div>
    )
}