import React from 'react'
import { useCallback } from 'react';
import { useState ,useEffect,useRef} from 'react'

function App() {

  const [password,setPassword] = useState("");
  const [allowedChar,setAllowedChar] = useState(false);
  const [allowedNumbers,setAllowedNumbers] = useState(false);
  const [length,setLength] = useState(10);
  
  const generatedPassword = useCallback(()=>{

    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    let specialChars = "~!##$%^&*()+[]{}@<>?"
    let numbers = "0123456789"

    if(allowedChar){
      str+=specialChars
    }
    if(allowedNumbers){
      str+=numbers
    }

    for (let i =1 ; i <= length; i++) {
      
      let index = Math.floor(Math.random() * str.length + 1)
      
      pass += str.charAt(index)
    }

    setPassword(pass)
  },[allowedNumbers,allowedChar,length,setPassword])



useEffect(()=>{generatedPassword()},[allowedNumbers,allowedChar,length,generatedPassword] )

let passwordRef = useRef(null)

let copyToClip = ()=>{
  passwordRef.current?.select()
  passwordRef.current?.setSelectionRange(0, length)
  window.navigator.clipboard.writeText(password)
  

}

  return (
    <>
      <div className='w-full h-screen  bg-zinc-800 flex justify-center items-center px-2'>

        <div className='w-full  min-h-fit  bg-zinc-900 mx-20 shadow-inner shadow-white rounded-md text-orange-500 text-center  flex items-center justify-center flex-col gap-8 px-14 py-14' >

          <h1 className='text-3xl'>Password Generator</h1>

          <div className=' flex flex-wrap gap-2 justify-center items-center p-3'>
            <input type="text" placeholder='Password' value={password} readOnly ref={passwordRef} className='w-96 px-8 py-4 rounded-md bg-zinc-700 text-white '  />
            <button onClick={copyToClip} className='bg-blue-800 px-10 py-4 rounded-md text-white  shadow-inner shadow-white hover:bg-blue-700'>Copy To Clipbaord</button>
          </div>

          <div className='flex flex-wrap gap-2 items-center justify-center'>

            <input type="range"  onChange={(e)=>{setLength(e.target.value)}} /> <label htmlFor="">Length( {length} ) </label>

            <input type="checkbox" defaultChecked={allowedChar}  onChange={()=>{setAllowedChar((prev)=>!prev)}}/>   <label htmlFor="">Include Chars</label>

            <input type="checkbox" defaultChecked={allowedNumbers} onChange={()=>{setAllowedNumbers((prev)=>!prev)}}/> <label htmlFor="">Include Numbers</label>
            
          </div>
        </div>
      </div>
    </>
  )
}

export default App