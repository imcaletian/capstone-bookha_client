import './App.css'
import ArtistPage from './pages/ArtistsHome'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import {Routes, Route, BrowserRouter} from "react-router-dom"

function App() {

  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path="/*" element={<Landing />} />
        <Route path="/artist/:id/*" element={<ArtistPage />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
      </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App
