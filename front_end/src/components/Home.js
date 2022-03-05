import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'


let exportuser;

function Home() {
    const navigate=useNavigate()
    const [user,setUser]=useState('')
    function join(e){
        e.preventDefault()
        if(user.length>=3){
          exportuser=user
          navigate('/chat')
        }
        else{
          alert('Enter valid name')
        }
    }
  return (
    <>
        <form action="" >
            <div className='head'></div>
            <div>
            <input className='component' type="text" onChange={(e)=>{setUser(e.target.value)}} value={user} placeholder='Enter Your Name'/>
            </div>
            <div>
            <input className='component' type="submit" onClick={join} value='Join Chat'/>
            </div>
        </form>
    </>
  )
}

export default Home

export {exportuser}

