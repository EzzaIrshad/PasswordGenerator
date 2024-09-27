import React from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'
import CheckBox from './CheckBox';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Password() {

    const [length, setLength] = useState(8);
    const [upperAllowed, setUpperAllowed] = useState(false);
    const [lowerAllowed, setLowerAllowed] = useState(false);
    const [numAllowed, setNumAllowed] = useState(false);
    const [charAllowed, setCharAllowed] = useState(false);
    const [password, setPassword] = useState("");
    const [icon, setIcon] = useState("content_copy");
    const passwordRef = useRef(null);

    //Toast Messages
    const notify = () => toast.error("Please select at least one option!",{
      autoClose: false, 
      className: "text-black font-bold text-lg py-3 bg-[#FCE9E5] border-2 border-red-500"
      });

    const dismiss = () =>  toast.dismiss();

    // Function to generate Password
    const passwordGenerator = useCallback ( () => {
      let pass = "";
      let str = "";

      if(upperAllowed) str += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      if(lowerAllowed) str += "abcdefghijklmnopqrstuvwxyz";
      if(numAllowed) str += "0123456789";
      if(charAllowed) str += "!@#$%^&*_-+=[]{}~`";

      for (let i = 1; i <= length; i++) {
          let char = Math.floor(Math.random() * str.length);
          pass += str.charAt(char);
      }
      setPassword(pass);
      setIcon("content_copy");

    } ,[length, upperAllowed, lowerAllowed, numAllowed, charAllowed, setPassword])

    // Function when generate button is clicked
    const GeneratePassword = () => {
      if (upperAllowed || lowerAllowed || numAllowed || charAllowed) {
          passwordGenerator();    
      } else{
        notify();
      }
    }

    // Function to copy password to clipboard
    const CopyPasswordToClipboard = useCallback( () => {
    
      if(passwordRef.current.value) {
          setIcon("check");
          setPassword("");
          passwordRef.current.placeholder = "Copied!";
      } else{
      setIcon("content_copy");
      }

      window.navigator.clipboard.writeText(password)
    },[password])


    useEffect(() => {
        dismiss(); // Dismiss the toast message
        setPassword("");
        passwordRef.current.placeholder = "password";
        setIcon("content_copy");
    }, [upperAllowed, lowerAllowed, numAllowed, charAllowed, length])

  return (
    <div className='w-full h-[85vh] flex items-center justify-center'>
        <div className='w-full max-w-sm mx-auto px-6 py-5 rounded-lg shadow-xl bg-gradient-to-b from-[#066ECA] to-[#019389]'>
            <h1 className='text-white text-2xl font-bold'>Password Generator</h1>
            <hr className='mt-4 border-t-[1px] border-gray-400'/>
            <div className='relative flex shadow rounded-lg overflow-hidden my-4'>
              <input 
                type="text"
                value={password}
                placeholder='password'
                readOnly
                ref={passwordRef}
                className='outline-none w-full bg-transparent h-14 border-[1.5px] border-gray-300 rounded-lg text-white text-lg tracking-wider pl-4 pr-14 placeholder:text-gray-300'/>
              <button onClick={CopyPasswordToClipboard}><span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-2xl text-gray-200">{icon}</span></button>
            </div>
            
            <div>
              <div>
                <input 
                type="range"
                min={6}
                max={30}
                value={length}
                onChange={(e) => {setLength(e.target.value)}}
                className='cursor-pointer w-full accent-[#A1C159]'/>
                <div className='flex justify-between mx-1 text-white font-semibold'>
                  <label>Length:</label>
                  {length}
                </div>
              </div>

              <CheckBox 
                    icon="uppercase" 
                    id="upperInput" 
                    label="Uppercase" 
                    checked={upperAllowed} 
                    onCheckchange={() => { setUpperAllowed((prev) => !prev); }}
                />

                <CheckBox 
                    icon="lowercase" 
                    id="lowerInput" 
                    label="Lowercase" 
                    checked={lowerAllowed}
                    onCheckchange={() => { setLowerAllowed((prev) => !prev); }}
                />

                <CheckBox 
                    icon="123" 
                    id="numberInput" 
                    label="Numbers" 
                    checked={numAllowed}
                    onCheckchange={() => { setNumAllowed((prev) => !prev); }}
                />

                <CheckBox 
                    icon="emoji_symbols" 
                    id="charInput" 
                    label="Symbols" 
                    checked={charAllowed}
                    onCheckchange={() => { setCharAllowed((prev) => !prev); }}
                />

              <div>
                <button onClick={GeneratePassword} className='bg-gradient-to-b from-[#A1C159] to-[#44B154] hover:from-[#44B154] hover:to-[#A1C159] w-full mt-6 py-3 rounded-md text-white font-semibold text-lg'>Generate Password</button>
                <ToastContainer position="top-center" className="w-1/5"/>

              </div>
            </div>
        </div>
      </div>
  )
}

export default Password