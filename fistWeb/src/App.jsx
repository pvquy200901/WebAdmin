import { Container } from '@mui/material'
import Board from './pages/Board/index'
import { Route, Routes } from 'react-router-dom'
import DashBoard from './pages/Board/DashBoard/dashBoard'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
function App() {

  return (
    <Container disableGutters maxWidth={false} sx={{height:"100vh"}}>
      <Routes>
      <Route path='/dashboard/*' element={<DashBoard />} />
      <Route path='/*' element={<Board />} />
      </Routes>
      <ToastContainer />

    </Container>
  )
}

export default App
