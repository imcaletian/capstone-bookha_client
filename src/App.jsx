import './App.css'
import ArtistPage from './pages/ArtistsHome'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import {Routes, Route, BrowserRouter} from "react-router-dom"
import ArtistSetUp from './pages/ArtistSetUp'

function App() {

  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path="/*" element={<Landing />} />
        <Route path="/artist/:id/*" element={<ArtistPage />} />
        <Route path="/home" element={<Dashboard />} />
        <Route path="/setup" element={<ArtistSetUp />} />
      </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App
