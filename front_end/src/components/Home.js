import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import "../styles/Home.css"

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
            <div className='head'>HiHello-Tech Warriors</div>
            <div>
            <input className='component' type="text" onChange={(e)=>{setUser(e.target.value)}} value={user} placeholder='Enter Your Name'/>
            </div>
            <div>
            <input className='component' type="submit" onClick={join} value='Join Chat'/>
            </div>
        </form>
        <footer>
        &copy;2022-2024 Tech Warriors
        </footer>
    </>
  )
}

export default Home

export {exportuser}

