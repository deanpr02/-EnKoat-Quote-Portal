import { useState } from 'react'
import { BarChart,PieChart } from '@mui/x-charts'
import { useStateTotals } from '../Hooks/useStateTotals'
import { useRoofTypes } from '../Hooks/useRoofTypes'
import Map from './Map';

import './PerformanceDashboard.css'

//bar graph of monthly totals of projects
//pie chart of number of projects by state
//have a picture of the state and then it shows dots on the map of locations and if you hover over it it says the number of quotes

export default function PerformanceDashboard({quotes}){
    const { totals,refetch } = useStateTotals();
    const {typeCounts,refetchTypes} = useRoofTypes()
    const [selectedState,setSelectedState] = useState('AZ')

    return(
        <div className='performance-container'>
            <p>Performance</p>
            {totals && <QuotesBarChart totals={totals}/>}
            {typeCounts && <QuotesPieChart data={typeCounts}/>}
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

function QuotesPieChart({data}){
    const total = data.reduce((sum, item) => sum + item.value, 0);

    return(
        <div style={{display:'flex'}}>
            <PieChart
            colors={['rgb(36, 135, 228)','darkslateblue','rgb(108, 201, 238)']}
            series={[
                {
                    data:data,
                    arcLabel: (item) => `${((item.value / total)*100).toFixed(1)}` + '%'
                }
            ]}
            margin={{top:50,bottom:50,left:50,right:120}}
            slotProps={{
                legend: {
                    direction:'column',
                    position: {vertical:'middle',horizontal:'right'},
                    itemMarkWidth:20,
                    itemMarkHeight:20,
                    padding:{
                        left:60
                    },
                    markGap:5,
                    itemGap:10,
                    labelStyle:{
                        fontSize:14,
                        fill:'white'
                    }
                }
            }}
            sx={{
                '.MuiPieArcLabel-root':{
                    fill:'white',
                    fontSize:12
                }
            }}
            width={400}
            height={400}
            />
        </div>
    )
}