import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);


/**
 * Module Name: PieChart.js
 * Date of Creation: 15/09/2022
 * Creator: Hao Xu
 * Summary: A module takes in data and displays a pie chart graph according to the data.
 * Variable Accessed: 
 */

const IncomePieChart = ({pieDataSet}) => {

    const data={
        
        labels: ['Salary', 'Investment', 'PartTime'],
        datasets: [
            {
              label: '# of Votes',
              data: pieDataSet,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
              borderWidth: 1,
            },
        ]
    }


  return (
    <Pie data={data} />
  )
}

export default IncomePieChart