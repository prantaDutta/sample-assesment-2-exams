import React from 'react'
import { Home } from './pages/Home'
import CssBaseline from '@mui/material/CssBaseline'
import { Route, Routes } from 'react-router-dom'
import { Exam } from './pages/Exam'
import { Box } from '@mui/material'

const App: React.FC = () => {
  return (
    <Box sx={{ maxWidth: '800px', mx: 'auto', my: 5 }}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="exam" element={<Exam />} />
      </Routes>
    </Box>
  )
}

export default App
