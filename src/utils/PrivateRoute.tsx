import { Route, Redirect, RouteProps, RouteComponentProps } from "react-router-dom"

// https://stackoverflow.com/a/51125455/346701
// or tsconfig: "noImplicitAny": false
export const PrivateRoute = ({ component, ...rest }: RouteProps): JSX.Element => {
  if (!component) {
    throw Error("component is undefined")
  }

  const Component = component
  return (
    <Route
      {...rest}
      render={(props: RouteComponentProps<any>) =>
        localStorage.getItem("jwt") ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  )
}
