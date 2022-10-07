import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

/**
 * Module Name: VerticalBarChart.js
 * Date of Creation: 15/09/2022
 * Creator: Hao Xu
 * Summary: A module takes in data and display a verticalbar chart according to the data.
 * Variable Accessed: 
 */


  
  
  const VerticalBarChart = ({wholeYearIncome,wholeYearExpenditure}) => {
    const top='top';
    const options= {
        responsive: true,
        plugins: {
          legend: {
            position: top,
          },
          title: {
            display: true,
            text: 'Compare',
          },
        },
    };
    
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug','Sep','Oct','Nov','Dec'];

    const data={
        labels,
        datasets: [
          {
            label: 'Expenditure',
            data: wholeYearExpenditure,
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          {
            label: 'Income',
            data:  wholeYearIncome,
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      };
      
    return (
        <Bar options={options} data={data} />
    )
  }
  
  export default VerticalBarChart