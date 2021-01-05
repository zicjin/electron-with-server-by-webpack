import React from "react"
import { MemoryRouter, Route, Switch } from "react-router-dom"
import "focus-visible/dist/focus-visible"
import dayjs from "dayjs"
import "dayjs/locale/zh-cn"
import relativeTime from "dayjs/plugin/relativeTime"
import utc from "dayjs/plugin/utc"
import Test from "./components/Test"

dayjs.extend(utc)
dayjs.locale("zh-cn")
dayjs.extend(relativeTime)

const App = (): JSX.Element => {
  return (
    <div className="app">
      <MemoryRouter>
        <Switch>
          {/* <PrivateRoute path="/" exact component={Home} /> */}
          <Route path="/" exact component={Test} />
        </Switch>
      </MemoryRouter>
    </div>
  )
}

export default App
