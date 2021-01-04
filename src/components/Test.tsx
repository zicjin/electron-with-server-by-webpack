import React, { useCallback, useEffect, useState, ChangeEvent } from "react"
import { useLocation, Redirect } from "react-router-dom"
import { useToast, FormControl, FormLabel, Input, FormHelperText, Container, Button } from "@chakra-ui/react"
import { BeatLoader } from "react-spinners"
import { login } from "../services/api"
import { send } from "../renderer-ipc"

const Test = (): JSX.Element => {
  const [factorial, setFactorial] = useState(0)
  const [ring, setRing] = useState("")

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
  </div>
}

export default Test
