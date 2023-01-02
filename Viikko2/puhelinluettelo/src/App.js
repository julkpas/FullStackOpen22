
import { useState, useEffect } from 'react'
import contactService from './services/contacts'

const Person = (props) => {
  //console.log('Person',{props})
  const deleteId = (name, id) => {
    //console.log('Clikattu = ', id)
    const answer = window.confirm(`Do You want delete ${name} from the Phonebook?`)
    if (answer) {
      contactService.deleteId(id, props.persons, props.setContactArray, props.setMessage, name)
      props.setMessage(`${name} deleted from the phonebook!`);
      setTimeout(() => { props.setMessage(null) }, 5000)// 5 sek odotus ja message tyhjäys
    }
  }
  return (
    <div>{props.name} {props.number} {<Button handleDelete={() => deleteId(props.name, props.id)} text={'delete'} />}</div>
  )
}
const Contacts = (props) => {
  //console.log('Contacts',props)
  return (
    <div>
      {props.ps.filter(data => data.name.toLowerCase().match(props.MyFilter)).map(data =>
        <Person persons={props.ps} setContactArray={props.setContacts} key={data.name}
          name={data.name} number={data.number} id={data.id} setMessage={props.setErrorMessages} />)}
    </div>
  )
}
const Button = (props) => {
  return (
    <button onClick={props.handleDelete}>{props.text}</button>
  )
}
const Filter = (props) => {
  return (
    <div>
      <form>
        <table>
          <tbody>
            <tr>
              <td>filter shown with </td><td><input value={props.MyFilter} onChange={props.onFilterChange} /></td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  )
}
const ContactForm = (props) => {
  //console.log('Props', {props})
  //console.log('Num/name', props.name, props.number)
  return (
    <form onSubmit={props.onSubmit}>
      <table>
        <tbody>
          <tr>
            <td>name: </td><td><input value={props.name} onChange={props.onNameChange} /></td>
          </tr>
          <tr>
            <td>number:</td><td><input value={props.number} onChange={props.onNumberChange} /></td>
          </tr>
          <tr>
            <td><button type='submit'>add</button></td>
          </tr>
        </tbody>
      </table>
    </form>
  )
}
const AddHeader = (props) => {
  //console.log('Text: ',props.message)
  if (props.message === null && props.error === null)
    return null
  var headerStyle = {}
  if (props.error) {
    headerStyle = {
      color: 'red',
      background: 'lightgray',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10
    }
    setTimeout(() => { props.errM(null) }, 5000)
  } else if (props.message) {
    headerStyle = {
      color: 'green',
      background: 'lightgreen',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10
    }
    setTimeout(() => { props.regularMessage(null) }, 5000)
  }
  return (
    <div style={headerStyle}>
      {props.message}{props.error}
    </div>
  )
}
function App() {
  const [persons, setPersons] = useState([])
  /*
    { name: 'Arto Hellas', number: '040-1231244' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }]) */

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [newContactMessage, setNewContactMessage] = useState(null)
  const [newErrorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    console.log('effect')
    contactService
      .getAll()
      .then(initialContacts => {
        console.log('promise fulfilled: ', initialContacts)
        setPersons(initialContacts)
      })
  }, [])

  if (persons === undefined)
    return null
  console.log('render', persons.length, 'contacts')

  const addNewContact = (event) => {
    event.preventDefault()
    const contactInfo = {
      name: newName,
      number: newNumber
    }
    const nameArray = persons.filter((data) => data.name === newName)
    if (nameArray.length === 1) {
      const answer = window.confirm(`Name ${newName} is already in the Phonebook? Do You want update the number?`)
      if (answer) {
        // eslint-disable-next-line
        nameArray.map(data => {
          contactService.update(data.id, contactInfo, setErrorMessage, newName)//errorMessage herättää huomioo!
          setNewContactMessage(`${newName} updated to the phonebook!`)
          getUpdatedContacts()
        })//Ei aina tee 'näkyvää' päivitystä, jos haluu clogiin tiedot.
      }
      return
    }
    contactService.create(contactInfo)//palvelimelle tiedot
    setNewContactMessage(`${newName}  added to the phonebook!`)
    getUpdatedContacts()
  }
  const getUpdatedContacts = () => {
    contactService
      .getAll()
      .then(contacts => { setPersons(contacts) })//asetetaan uusi lista
    setNewName('')
    setNewNumber('')
  }
  const handleNameChange = (event) => {
    //console.log('handleNameChange: ', event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    //console.log('handleNumberChange: ', event.target.value)
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    //console.log('handleFilterChange: ', event.target.value)
    setNewFilter(event.target.value)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <AddHeader message={newContactMessage} error={newErrorMessage} errM={setErrorMessage} regularMessage={setNewContactMessage} />
      <Filter MyFilter={newFilter} onFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <ContactForm
        onSubmit={addNewContact} name={newName} number={newNumber} onNameChange={handleNameChange} onNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Contacts ps={persons} MyFilter={newFilter} setContacts={setPersons} setErrorMessages={setErrorMessage} />
    </div>
  )
}
export default App
