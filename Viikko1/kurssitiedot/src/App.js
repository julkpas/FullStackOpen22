const Part = (props) => {  
  return (
    <div>
      <p>{props.nameC} {props.ex}</p>   
    </div>
  )
}
const Content = (props) => {
  return (
    <div>
      <Part nameC={props.course.parts[0].name} ex={props.course.parts[0].exercises}/>
      <Part nameC={props.course.parts[1].name} ex={props.course.parts[1].exercises} />
      <Part nameC={props.course.parts[2].name} ex={props.course.parts[2].exercises} />
    </div>
  )
}
const Header = (props,course) => { 
 console.log(course)
  return (
    <div>
      <h1>{props.course.name}</h1>
    </div>
  )
}
const Total = (props,course) => {
  console.log('Total/props->course',props)
  
  //parts.forEach((data) => (data.forEach((data2) => console.log(data2) )) );
  /*parts.forEach((data) => {
    console.log('data')
    console.log(data) 
  })*/
  //studentsData.forEach((student) => ( student.forEach((data) => ( console.log(data); )); ));
  
  console.log('Course',course)
  return (
    <div>
      Number of exercises {props.course.parts[0].exercises + props.course.parts[1].exercises + props.course.parts[2].exercises}
    </div>
  )
}

const App = () => {
  const course = {
    
    name: 'Half Stack application development',

  parts: [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]
}
  //parts.forEach((data) => (data.forEach((data2) => console.log(data2) )) )
  return (
    <div>
      <Header course={course}/>
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}


export default App