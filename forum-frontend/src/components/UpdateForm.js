import React, { useState } from 'react'
import userService from '../services/users'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { useNavigate } from 'react-router-dom'

const UpdateForm = ({ user }) => {
  const [name, setName] = useState(user.name)
  const [age, setAge] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleNameChange = (e) => {
    setName(e.target.value)
  }

  const handleAgeChange = (e) => {
    setAge(e.target.value)
  }

  const submitDetails = (e) => {
    e.preventDefault()
    const formData = new FormData()
    try {
      if (name || age){
        formData.append('name', name)
        formData.append('age', age)
        userService.update(user.id, formData)
        setName(user.name)
        setAge('')
        dispatch(setNotification('Updated profile', 10))
        navigate(`/user/${user.username}`)
      } else {
        dispatch(setNotification('Fields cannot be empty', 10))
      }
    } catch(error){
      dispatch(setNotification('Error', 10))
    }
  }

  return (
    <div>
      <form onSubmit={submitDetails} className='form'>
        <label>Change Name</label><br/>
        <input
          type='text'
          onFocus={(e) => e.target.placeholder = ''}
          onBlur={(e) => e.target.placeholder = 'Name'}
          placeholder='Name'
          value={name}
          onChange={handleNameChange}
        ></input>
        <br/>
        <label>Age</label><br/>
        <input
          type='number'
          onFocus={(e) => e.target.placeholder = ''}
          onBlur={(e) => e.target.placeholder = 'Age'}
          placeholder='Age'
          value={age}
          onChange={handleAgeChange}
        ></input>
        <button className="btn btn-primary" type='submit'>Submit</button>
      </form>
    </div>
  )
}
export default UpdateForm