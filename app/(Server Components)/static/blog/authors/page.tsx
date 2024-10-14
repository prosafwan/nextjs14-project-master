"use client"
import { useEffect, useState } from "react"

const Test = () => {
    console.log('Hello World 1')
    const [state, setState] = useState(() => {
      console.log('Hello World 3')
  
      return 0
    })

    const test = (id ="") =>{
        console.log("Hello World 5");
        console.log(id)
    }
  
    useEffect(() => {
      console.log('Hello World 2')
    }, [])
  
    useEffect(() => {
      console.log('Hello World 4', state)
      test("yes");
    }, [state])
  
    return <>{console.log('Hello World')} {test("rrrrr")}</>
  }

  export default Test
  