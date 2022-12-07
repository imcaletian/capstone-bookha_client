import './App.css'
import ArtistPage from './pages/ArtistsHome'
import Landing from './pages/Landing'
import {Routes, Route, BrowserRouter} from "react-router-dom"

function App() {

  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path="/*" element={<Landing />} />
        <Route path="/artist/:id/*" element={<ArtistPage />} />
      </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App
