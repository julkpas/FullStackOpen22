import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}
const create = (newObject) => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject, setErrorMessage, name) => {
  axios
  .put(`${baseUrl}/${id}`, newObject)
  .catch(error => { 
    setErrorMessage(`Update failed! ${name} was already deleted from the phonebook!`)
  })
}
const deleteId = (id, persons, setPersons, setErrorMessage, name) => {
  axios
  .delete(`${baseUrl}/${id}`)
  .catch(error => { 
    setErrorMessage(`${name} was already deleted from the phonebook!`)
    console.log('catch error: ', error)
  })
  const newContacts = persons.filter(data => id !== data.id)
  setPersons(newContacts)
}
//eslint-disable-next-line
export default { getAll, create, update, deleteId }
