import Form1 from "../components/SetupForms/Form1"
import UploadAvt from "../components/UploadAvt";
function ArtistSetUp () {

    return (
        <div className="bg-indigo-900 min-h-screen p-20">
            <h1 className=" text-center py-10 text-white">Hello! Let's Set Your Artist Page Up!</h1>
            {/* <UploadAvt /> */}
            <Form1 />
        </div>
    )
}

export default ArtistSetUp