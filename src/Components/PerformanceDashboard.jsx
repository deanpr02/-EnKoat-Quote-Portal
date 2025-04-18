import { useState,useEffect } from 'react'
import { BarChart,PieChart,LineChart } from '@mui/x-charts'
import { useStateTotals } from '../Hooks/useStateTotals'
import { useRoofTypes } from '../Hooks/useRoofTypes'
import { useMonthTotals } from '../Hooks/useMonthTotals'
import Map from './Map';

import './PerformanceDashboard.css'

export default function PerformanceDashboard({quotes}){
    const { totals,refetch } = useStateTotals();
    const { months,refetchMonths } = useMonthTotals();
    const { typeCounts,refetchTypes } = useRoofTypes()
    const [ selectedState,setSelectedState ] = useState('AZ')

    useEffect(() => {
        refetch();
        refetchTypes();
        refetchMonths();
    },[quotes])

    return(
        <div className='performance-container'>
            <p style={{fontSize:'36px',width:'100%',display:'flex',justifyContent:'center',borderBottom:'2px solid black',backgroundColor:'rgba(50,50,50,0.5)',margin:'0',marginBottom:'10px'}}>
                Performance Dashboard
            </p>
            <div style={{backgroundColor:'rgba(50,50,50,0.5)',borderRadius:'10px',border:'2px solid black',margin:'5px'}}>
                {totals && <QuotesBarChart totals={totals}/>}
            </div>
            <div style={{display:'flex',flexDirection:'row',backgroundColor:'rgba(50,50,50,0.5)',borderRadius:'10px',border:'2px solid black',margin:'5px',width:'80%'}}>
                {months && <QuotesLineChart data={months}/>}
                {typeCounts && <QuotesPieChart data={typeCounts}/>}
            </div>
            <Map selectedState={selectedState} setSelectedState={setSelectedState}/>
        </div>
    )
}

function QuotesBarChart({totals}){
    const xValues = totals.map(item => item.x);
    const yValues = totals.map(item => item.y);

    return(
        <div style={{display:'flex',width:'65vw',height:300}}>
            <div style={{ textAlign: 'center',marginTop: 8,fontWeight:'bold',fontSize: 14, color: 'white',alignSelf:'center',justifyContent:'center', transform:'rotate(90deg)'}}>
                # of quotes
            </div>
            <BarChart 
                series={[{data:yValues}]}
                xAxis={[{scaleType: 'band',data:xValues,dataKey:'States',tickLabelStyle:{fontSize:12,fontFamily:'Bebas Neue, sans serif'}}]}
                yAxis={[{tickLabelStyle:{fontFamily:'Bebas Neue, sans serif'}}]}
                sx={{
                    ".MuiChartsAxis-root .MuiChartsAxis-line": {
                stroke: "white", // Changes axis line color
            },
                    ".MuiChartsAxis-tickLabel": {
                fill: "white !important", // Changes axis text color
            },
                }}
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
                        fill:'white',
                        fontFamily:'Bebas Neue, sans serif'
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

function QuotesLineChart({data}){
    const xValues = data.map((item) => item.month);
    const yValues = data.map((item) => item.count);

    return(
        <div style={{width:'60vh',height:'50vh',borderRight:'2px solid black'}}>
        <LineChart 
        xAxis={[{
            data:xValues,
            scaleType:'band',
            tickLabelStyle:{fontFamily:'Bebas Neue, sans serif'},
            tickLabelInterval: () => true
        }]}
        yAxis={[{
            tickLabelStyle:{fontFamily:'Bebas Neue, sans serif'},
            tickLabelInterval: () => true
        }]}
        series={[{
            data:yValues,
            color: 'red'
        }]}
        grid={{ vertical: true, horizontal: true }}
        sx={{
            ".MuiChartsAxis-root .MuiChartsAxis-line": {
                stroke: "white", // Changes axis line color
            },
            ".MuiChartsAxis-tickLabel": {
                fill: "white !important", // Changes axis text color
            },
            '.MuiChartsGrid-line': {
                stroke: 'white'  // Changes grid line color
            },
            '.MuiChartsAxis-label': {
                    fill: 'white !important', // Changes axis label color
                },
        }}
        />
        </div>
    )
}