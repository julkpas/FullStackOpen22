import Content from './course.js'

const App = (props) => {
 
  return (
    <div>
      <Content course={props.course} />
    </div>
  )
}
export default App