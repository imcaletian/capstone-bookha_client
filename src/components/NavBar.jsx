import { Link, useNavigate } from "react-router-dom"
import supabase from "../supabaseClient";
export default function NavBar(props) {
    const nav = useNavigate();
    const LogoutHandler = async () => {
        try {
            let { error } = await supabase.auth.signOut()
            if (error) throw error;
            localStorage.removeItem("bookem_tokem")
            localStorage.removeItem("bookem_user_id")
            localStorage.removeItem("bookem_token")
            nav ('/')
        }
        catch(error){
            alert(error.error_description || error.message)
        }
        finally{
            alert("Logout sucessful, now taking you back to login page")
        }
    }
    return (
        <>
        {
            props.userInfo &&
            <div className="bg-indigo-900 ">
            <div className="h-24 w-24 p-4 box-content rounded-full bg-indigo-900">
                <img className="overflow-hidden rounded-full" src={props.userInfo.avatar_url} alt="" />
            </div>
            <div className="pb-4 px-4 select-none">
                <h1 className="text-indigo-50 text-lg font-semibold">{props.userInfo.name}</h1>
                <h2 className="text-indigo-50 text-sm font-light">@{props.userInfo.username}</h2>
            </div>
            <div>
                <Link to="/dashboard">
                    <div className="p-4 bg-indigo-900 text-indigo-50 font-semibold hover:bg-indigo-50 hover:text-indigo-800 ">Dashboard</div>
                </Link>
                <Link to={`/artist/${props.userInfo.username}`}>
                    <div className="p-4 bg-indigo-900 text-indigo-50 font-semibold hover:bg-indigo-50 hover:text-indigo-800">My Artist Page</div>
                </Link>
                <Link>
                    <div className="p-4 bg-indigo-900 text-indigo-50 font-semibold hover:bg-indigo-50 hover:text-indigo-800">
                        Settings
                    </div>
                </Link>
                <Link onClick={LogoutHandler}>
                    <div className="p-4 bg-indigo-900 text-indigo-50 font-semibold hover:bg-indigo-50 hover:text-indigo-800">
                        Log Out
                    </div>
                </Link>
            </div>
        </div>
        }
        </>

    )
}