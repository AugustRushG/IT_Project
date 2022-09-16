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
import { faker } from '@faker-js/faker';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );


  
  
  const VerticalBarChart = () => {
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
            data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          {
            label: 'Income',
            data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      };
      
    return (
        <Bar options={options} data={data} />
    )
  }
  
  export default VerticalBarChart