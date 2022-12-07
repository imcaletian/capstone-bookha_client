import './App.scss'
import ArtistHome from './pages/ArtistsHome'
import Landing from './pages/Landing'
import {Routes, Route, BrowserRouter} from "react-router-dom"
function App() {

  return (
    <BrowserRouter>
    <div className="App">
      {/* <ArtistHome /> */}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/artist" element={<ArtistList />} />
        <Route path="/artist/id" element={<ArtistHome />} />
      </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App
