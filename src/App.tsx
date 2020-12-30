import React from "react"
import { MemoryRouter, Route, Switch } from "react-router-dom"
import "focus-visible/dist/focus-visible"
import { ChakraProvider } from "@chakra-ui/react"
import dayjs from "dayjs"
import "dayjs/locale/zh-cn"
import relativeTime from "dayjs/plugin/relativeTime"
import utc from "dayjs/plugin/utc"
// import Home from "./Home"
import Login from "./components/Login"
import mytheme from "./theme"
import { PrivateRoute } from "./utils/PrivateRoute"

dayjs.extend(utc)
dayjs.locale("zh-cn")
dayjs.extend(relativeTime)

const App = (): JSX.Element => {
  return (
    <div className="app">
      <ChakraProvider theme={mytheme}>
        <MemoryRouter>
          <Switch>
            {/* <PrivateRoute path="/" exact component={Home} /> */}
            <Route path="/login" exact component={Login} />
          </Switch>
        </MemoryRouter>
      </ChakraProvider>
    </div>
  )
}

export default App