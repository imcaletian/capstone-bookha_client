import './App.scss'
import ArtistHome from './pages/ArtistsHome'
import {Routes, Route, BrowserRouter} from "react-router-dom"
function App() {

  return (
    <BrowserRouter>
    <div className="App">
      {/* <ArtistHome /> */}
      <Routes>
        <Route path="/artist/id/*" element={<ArtistHome />} />
      </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App
