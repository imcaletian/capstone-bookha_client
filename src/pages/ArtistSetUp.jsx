import { useState } from "react";
import { useEffect } from "react";
import PageHeader from "../components/PageHeader/PageHeader";
import Form1 from "../components/SetupForms/Form1"
import backArrow from "../assets/chevron-left-solid.svg"
import supabase from "../supabaseClient";
import { NavLink } from "react-router-dom";
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
        <div className="bg-indigo-800" >
        <PageHeader userInfo={userInfo} localId={localId}/>
        {!userInfo &&
            <div className="bg-indigo-900 min-h-screen rounded-2xl ">
            <div className="h-36 flex items-center justify-center">
            <h1 className="text-center text-2xl text-white">Hello! Let's Set Your Profile Up!</h1>
            </div>
            <div className="bg-indigo-100 rounded-2xl">
            <Form1 />
            </div>
            </div>
        }
        {userInfo && 
            <div className="bg-indigo-900 min-h-screen rounded-2xl mt-2 relative">
                <div className="w-16 p-4 absolute top-8">
                <NavLink to={-1}>
                    <img className=" bg-indigo-50 w-11 p-2 aspect-square box-border rounded-lg " src={backArrow} alt="" />
                </NavLink>
                </div>
            <div className="h-32 flex items-center justify-center">
            <h1 className="text-center text-2xl text-white">Hello <b>{userInfo.name}</b>! <br/> Edit Your Profile Here!</h1>
            </div>
            <div className="bg-indigo-100 rounded-2xl">
            <Form1 userInfo={userInfo} />
            </div>
            </div>
        }
        </div>
    )
}

export default ArtistSetUp