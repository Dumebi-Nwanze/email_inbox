import HomeScreen from "./components/HomeScreen"
import EmailListScreen from "./components/EmailListScreen"
import { Route, Routes } from "react-router-dom"
import EmailContentScreen from "./components/EmailContentScreen"
import NotFound from "./components/NotFound"
import LoginScreen from "./components/LoginScreen"
import PrivateRoutes from "./PrivateRoutes"
import { useContext, } from "react"
import { AuthContext } from "./AuthProvider"


function App() {
  const auth = useContext(AuthContext);

  return (
    <Routes>

      <Route path="/login" element={<LoginScreen />} />
      <Route path="/" element={
        <PrivateRoutes
          auth={auth?.state?.isAuthenticated ?? false}

          redirectPath="/login"
        />}>
        <Route index element={<HomeScreen />} />
        <Route path="/mail" element={<EmailListScreen />} />
        <Route path="/mail/:id" element={<EmailContentScreen />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>)
}

export default App
