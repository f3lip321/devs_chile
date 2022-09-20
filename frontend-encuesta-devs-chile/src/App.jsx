import { useState, useEffect } from 'react'
import axios from 'axios'
import stringToColor from 'string-to-color'
import {Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

import './App.css'

ChartJS.register(ArcElement, Tooltip, Legend);
/*
export const data = {
  labels: ['FrontEnd', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 40, 3, 5, 2, 8],
      backgroundColor: [
        'red',
        'coral',
        'green',
        'aquawhite',
        'brown',
        'purple',
      ],
      //borderColor: [
      //  'rgba(255, 99, 132, 1)',
      //  'rgba(54, 162, 235, 1)',
      //  'rgba(255, 206, 86, 1)',
      //  'rgba(75, 192, 192, 1)',
      //  'rgba(153, 102, 255, 1)',
      //  'rgba(255, 159, 64, 1)',
      //],
      borderWidth: 1,
    },
  ],
};
*/
function App() {
  const [title, setTitle] = useState('')
  const [data, setData] = useState(null)

  const getData = async () => {
    try {
      const response = await axios.get('https://dev-chile-boolean-bff.onrender.com/answers')  
      const answersList = response.data
      const targetAnswer = answersList[0].answers[6]
      const answersCount = {}
      
      setTitle(targetAnswer.question)
      
      for(const answer of answersList) {
        const answserIndex = 6
        const userAnswer = answer.answers[answserIndex]

        for (const job of userAnswer.answer){
          if(answersCount[job]){
            answersCount[job] = answersCount[job] + 1  
          }else{
            answersCount[job] = 1
          }
        }
      }
      const labels = Object.keys(answersCount)
      const data = Object.values(answersCount)
      const backgroundColor = labels.map((label) => stringToColor(label))

      return { labels, data, backgroundColor}

    } catch (error) {
      console.log(error.message)  
    }    
  }


  useEffect( () => {
    
    async function fetchData(){
      const { labels, data, backgroundColor} = await getData()
      const staticData = {
        labels,
        datasets: [
          {
            label: title,
            data,
            backgroundColor,      
            borderWidth: 1,
          },
        ],
      }
      setData(staticData)
    }

    fetchData()
    
  }, [])

  return ( 
    <div> 
      <h1>{ title }</h1>
      <div className="card">
      { data && <Pie data={data} />}
      </div>
    </div>
  )
}

export default App