import React, {useEffect} from 'react'
import axios from 'axios'
import {useState} from 'react'

const Fib = () => {
  const [seenIndexes, setSeenIndexes] = useState([])
  const [values, setValues] = useState({})
  const [index, setIndex] = useState('')

  useEffect(() => {
    fetchValues()
    fetchIndexes()
  }, [])

  const fetchValues = async () => {
    const values = await axios.get('/api/values/current')
    setValues(values.data)
  }

  const fetchIndexes = async () => {
    const seenIndexes = await axios.get('/api/values/all')
    setSeenIndexes(seenIndexes.data)
  }

  const renderValues = () => {
    const entries = []

    for(let key in values) {
      if (values.hasOwnProperty(key)) {
        entries.push(
          <div key={key}>
            For index {key} I calculated {values[key]}
          </div>
        )
      }
    }

    return entries
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    axios.post('/api/values', {
      index: index
    })

    setIndex('')
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">enter Your index:</label>
        <input type="text" value={index} onChange={(event => setIndex(event.target.value))}/>
        <button>Submit</button>
      </form>

      <h3>Indexes i have seen</h3>
      { seenIndexes && seenIndexes.map((index) => index).join(', ') }

      <h3>Calculated values</h3>
      {renderValues()}
    </div>
  )
}

export default Fib