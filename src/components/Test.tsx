import React, { useCallback, useEffect, useState, ChangeEvent } from "react"
import { useLocation, Redirect } from "react-router-dom"
import { useToast, FormControl, FormLabel, Input, FormHelperText, Container, Button } from "@chakra-ui/react"
import { BeatLoader } from "react-spinners"
import { login } from "../services/api"
import { send } from "../renderer-ipc"

const Test = (): JSX.Element => {
  const [factorial, setFactorial] = useState(0)
  const [ring, setRing] = useState("")
  const [test, setTest] = useState("")

  return <div>
    <button id="factorial" onClick={async () => {
        let result = await send('make-factorial', { num: 5 })
        setFactorial(result)
    }}>Compute factorial</button>
    <p>factorial: {factorial}</p>

    <button id="call" onClick={async () => {
        let result = await send('ring-ring', { message: 'this is james' })
        setRing(result)
    }}>Make phone call</button>
    <p>ring: {ring}</p>

    <button id="store" onClick={async () => {
        await send('setStore', { key: 'test', value: 'test1' })
        let result = await send('getStore', { key: 'test' })
        setTest(result)
    }}>setStore</button>
    <p>test: {test}</p>
  </div>
}

export default Test
