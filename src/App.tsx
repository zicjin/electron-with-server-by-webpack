import React from "react"
import { MemoryRouter, Route, Switch } from "react-router-dom"
import Test from "./components/Test"

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
