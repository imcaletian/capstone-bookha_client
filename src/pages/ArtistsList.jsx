import PageHeader from "../components/PageHeader/PageHeader"

function ArtistList () {
    <div>
        <h1>1</h1>
            <Routes>
                <Route path="/"><h1>h1</h1></Route>
                <Route path="/:id/*" element={<ArtistHome />} />
            </Routes>
    </div>
}

export default ArtistList