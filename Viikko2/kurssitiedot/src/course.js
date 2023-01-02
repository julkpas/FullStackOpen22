
const Part = (props) => {  
  return (
    <div>
      <p>{props.nameC} <span style={{'fontWeight': 700, 'fontSize': 18}}>{props.nameNode}</span>{props.ex}</p> 
    </div>
  )
}
const Content = (props) => {
  return (   
    <div>
      <Header courseName={props.course.name} />
      <Part nameC={props.course.parts[0].name} ex={props.course.parts[0].exercises} />
      <Part nameC={props.course.parts[1].name} ex={props.course.parts[1].exercises} />
      <Part nameC={props.course.parts[2].name} ex={props.course.parts[2].exercises} />
      <Part nameC={props.course.parts[3].name} ex={props.course.parts[3].exercises} />
      <Total course={props.course} />
      <Part nameNode={props.course.parts[4].name} />
      <Part nameC={props.course.parts[4].parts[0].name} ex={props.course.parts[4].parts[0].exercises} /> 
      <Part nameC={props.course.parts[4].parts[1].name} ex={props.course.parts[4].parts[1].exercises} /> 
      <Total course={props.course.parts[4]} />
    </div>
  )
}
const Header = ({courseName}) => { 
const mainHeader = ' Web development curriculum'
  return (
    <div>
      <h1>{mainHeader}</h1>
      <h2>{courseName}</h2>
    </div>
  )
}
const Total = (props) => {
  
  const sumWithInitial = props.course.parts.reduce((previousValue, currentValue) =>{
    if(currentValue.exercises === undefined){
      currentValue.exercises = 0
    }
    return previousValue + currentValue.exercises
  }, 0)

  return (
    <div>
      <b>total of exercises </b> {sumWithInitial}
    </div>
  )
}
export default Content