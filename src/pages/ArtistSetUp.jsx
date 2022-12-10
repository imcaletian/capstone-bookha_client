import { useState } from "react";
import { useEffect } from "react";
import Form1 from "../components/SetupForms/Form1"
import UploadAvt from "../components/UploadAvt";
import supabase from "../supabaseClient";
function ArtistSetUp () {
    const localId = localStorage.getItem("bookem_user_id")
    const [userInfo, setUserInfo] = useState ("")
    useEffect(() => {
        const fetchUserInfo = async () => {
            const { data, error } = await supabase
            .from ('artists')
            .select('*')
            .eq('id', localId)

            if (error) {
                setUserInfo(null)
            }
            if (data) {
                setUserInfo(data[0])
            }
        }
        fetchUserInfo()
    },[])
    return (
        <>
        {!userInfo &&
            <div className="bg-indigo-900 min-h-screen p-20">
            <h1 className=" text-center py-10 text-white">Hello! Let's Set Your Artist Page Up!</h1>
            {/* <UploadAvt /> */}
            <Form1 />
        </div>
        }
        {userInfo && 
            <div className="bg-indigo-900 min-h-screen p-20">
            <h1 className=" text-center py-10 text-white">Hello {userInfo.name}! Edit Your Artist Information Here!</h1>
            {/* <UploadAvt /> */}
            <Form1 userInfo={userInfo}/>
            </div>
        }
        </>

    )
}

export default ArtistSetUp