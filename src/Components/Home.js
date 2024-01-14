import React,{useContext,useEffect} from 'react'
import Notes from './Notes'
import usercontext from '../context/notes/usercontext';

const Home = (props) => {
  const context = useContext(usercontext);
  const { getuser } = context;
  useEffect(() => {
    if (localStorage.getItem('token')) {
      getuser();
    }
    // eslint-disable-next-line
  }, []);
  return (
    <div className='my-3'>
      <Notes showalert={props.showalert} />
    </div>
  )
}

export default Home
