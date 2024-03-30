
import { useState, useCallback, useEffect, useRef } from 'react'


function App() {
  const [length, setLength] = useState(8)
  const [numAllow, setNumAllow] = useState(false);
  const [charAllow, setCharAllow] = useState(false);
  const [password, setPassword] = useState("");
  const [buttonText, setButtonText] = useState('Copy');

  const passwordRef = useRef(null)
  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numAllow) {
      str += "0123456789"
    }
    if (charAllow) {
      str += "!#$%&*-?@_"
    }

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)

  }, [length, numAllow, charAllow, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    setButtonText('Copied');
    window.navigator.clipboard.writeText(password)
  }, [password])
  
  useEffect( () => {passwordGenerator()}, [length, numAllow, charAllow, passwordGenerator])

  useEffect( () => {
    setButtonText('Copy')
  }, [password])
  return (
    <>

      <div className='font-PrimaryRegular w-full max-w-md mx-auto shadow-2xl rounded-lg px-4 py-4 my-8 text-black bg-white'>
        <h1 className=' text-black text-center'>Password Generator</h1>
        <div className='flex shadow rounded-lg outline outline-gray-200 overflow-hidden mb-4 my-3'>
          <input
            type="text"
            value={password}
            className='outline-none w-full py-1 px-3 text-black'
            placeholder='password'
            readOnly
            ref={passwordRef}
          />
          <button
           onClick={copyPasswordToClipboard}
           className='outline-none bg-blue-500 text-white px-3 py-0.5 shrink-0'>{buttonText}</button>

        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input
              type="range"
              min={6}
              max={48}
              value={length}
              
              className='cursor-pointer'
              onChange={(e) => { setLength(e.target.value) }}
            />
            <label>Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
              type="checkbox"
              defaultChecked={numAllow}
              className='cursor-pointer'
              id='numberInput'
              onChange={() => { setNumAllow((prev) => !prev) }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
              type="checkbox"
              defaultChecked={charAllow}
              id='characterInput'
              onChange={() => { setCharAllow((prev) => !prev) }}
            />
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
