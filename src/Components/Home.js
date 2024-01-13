import React from 'react'
import Notes from './Notes'

const Home = (props) => {
  return (
    <div className='my-3'>
      <Notes showalert={props.showalert}/>
    </div>
  )
}

export default Home
