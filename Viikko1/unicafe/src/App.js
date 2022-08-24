

import { useState } from 'react'

//const Display = props => <div>{props.allClicks}</div>

const Header = (props) => { 
  //console.log('Title',props)
  return (
    <div>
      <h1>{props.title}</h1>
    </div>
  )
 }
const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
)
const Statistics = (props) => {
  if(props.allClicks == 0){  
    return(<div><br /><br />No feedback given</div> )
  }
  return (
    <div>    
      <h1>{props.title}</h1>    
      
      <StatisticLine text='good' value={props.good}/>
      <StatisticLine text='neutral' value={props.neutral}/>
      <StatisticLine text='bad' value={props.bad}/>
      <StatisticLine text='all' value={props.allClicks}/>
      <StatisticLine text= 'average' value={((props.good * 1) + (props.bad * -1)) / (props.allClicks)}/>
      <StatisticLine text='positive' value={((props.good) / (props.allClicks)) * 100} pct={' %'}/>
    
     </div>
  )
} 
 const StatisticLine = (props) => {
  return (
    <div>
      <table>
        <tbody>
            <tr>
             <td style={{width: 60}}>{props.text}</td><td style={{width: 50}}>{new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(props.value)}{ props.pct}</td>
            </tr>
        </tbody>
      </table>
    </div>
  )
 }
const App = () => {
  const title = 'give feedback'
  const titleS = 'statistics'

  // napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  // määritelty scopessa jo
  const [allClicks, setAllClicks] = useState(0)

  const setToGood = (good) => {
    //console.log('Good', good)
    setGood(good)
    setAllClicks(allClicks + 1)
  }
  const setToNeutral = (neutral) => {
    //console.log('Neutral', neutral)
    setNeutral(neutral)
    setAllClicks(allClicks + 1)
  }
  const setToBad = (bad) => {
    //console.log('Bad', bad)
    setBad(bad)
    setAllClicks(allClicks + 1)
  }
  return (
    <div>
      <Header title ={title} />
      <Button handleClick={() => setToGood(good + 1)} text="Good" />
      <Button handleClick={() => setToNeutral(neutral + 1)} text="Neutral" />
      <Button handleClick={() => setToBad(bad + 1)} text="Bad" />
      <Statistics title={titleS} good={good} neutral={neutral} bad={bad} allClicks={allClicks}/>
    </div>
  )
}
export default App