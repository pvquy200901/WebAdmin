import { Route, Routes } from 'react-router-dom'
import LoginPage from "../LoginPage"
import DashBoard from "./DashBoard/dashBoard"

function Board() {
  return (
    <Routes>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/' exact element={<LoginPage />} />
      <Route path='/dashboard/*' element={<DashBoard />} />
    </Routes>
  )
}

export default Board