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
            nav('/')
        }
        catch (error) {
            alert(error.error_description || error.message)
        }
        finally {
            alert("Logout sucessful, now taking you back to login page")
        }
    }
    return (
        <>
            {
                props.userInfo &&
                <div className={props.visible === true ? "bg-indigo-900 absolute w-60 z-20 top-16 left-0 opacity-100 shadow-2xl shadow-black transition-all duration-300 ease-in-out rounded-2xl flex flex-col gap-2 box-content m-2 overflow-hidden" : "flex flex-col gap-2 box-content m-2 overflow-hidden bg-indigo-900 rounded-2xl absolute opacity-0 -z-50 w-60 top-16 -left-60 duration-300 shadow-2xl shadow-black transition-all ease-in-out"}>
                    <div className="bg-indigo-100">
                    <div className="h-32 w-32 m-4 box-content rounded-full bg-indigo-900">
                        <img className="overflow-hidden rounded-full" src={props.userInfo.avatar_url} alt="" />
                    </div>
                    <div className="pb-4 px-4 select-none">
                        <h1 className="text-indigo-900 text-lg font-semibold">{props.userInfo.name}</h1>
                        <h2 className="text-indigo-900 text-sm font-light">@{props.userInfo.username}</h2>
                    </div>
                    <div>
                    </div>
                        <Link to="/dashboard">
                            <div className="p-4 bg-indigo-900 text-indigo-50 font-semibold hover:bg-indigo-100 hover:text-indigo-800 ">Home</div>
                        </Link>
                        <Link to={`/artist/${props.userInfo.username}`}>
                            <div className="p-4 bg-indigo-900 text-indigo-50 font-semibold hover:bg-indigo-100 hover:text-indigo-800">My Artist Page</div>
                        </Link>
                        <Link to="/setup">
                            <div className="p-4 bg-indigo-900 text-indigo-50 font-semibold hover:bg-indigo-100 hover:text-indigo-800">
                                Settings
                            </div>
                        </Link>
                        <Link onClick={LogoutHandler}>
                            <div className="p-4 bg-indigo-900 text-indigo-50 font-semibold hover:bg-indigo-100 hover:text-red-600">
                                Log Out
                            </div>
                        </Link>
                    </div>
                </div>
            }

            {
                !props.userInfo &&
                <div className={props.visible === true ? "bg-indigo-900 absolute w-60 z-20 top-16 left-0 opacity-100 shadow-2xl transition-all duration-300 ease-in-out rounded-2xl flex flex-col gap-2 p-1" : "flex flex-col gap-2 p-1 bg-indigo-900 rounded-2xl absolute opacity-0 -z-50 w-60 top-16 -left-60 duration-300 shadow-2xl transition-all ease-in-out"}>
                    <div className="p-4 flex flex-col gap-2 select-none">
                        <h1 className="text-indigo-50 text-lg font-semibold">Hello!</h1>
                        <h2 className="text-indigo-50 text-sm font-light">Bookem is a easy way to book your favourite indie artists!</h2>
                    </div>
                    <div>
                        <Link to="/">
                            <div className="p-4 bg-indigo-900 text-indigo-50 font-semibold hover:bg-indigo-50 hover:text-indigo-800 ">Sign In</div>
                        </Link>
                        <Link to={`/signup`}>
                            <div className="p-4 bg-indigo-900 text-indigo-50 font-semibold hover:bg-indigo-50 hover:text-indigo-800">Sign Up</div>
                        </Link>
                    </div>
                </div>
            }
        </>

    )
}