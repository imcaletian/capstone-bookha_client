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
            props.navShow()
        }
    }
    return (
        <>
            {
                props.userInfo &&
                <div className={props.visible === true ? "bg-indigo-900 absolute w-60 z-20 top-16 left-0 opacity-100 shadow-2xl shadow-black transition-all duration-300 ease-in-out rounded-2xl flex flex-col box-content m-2 overflow-hidden" : "flex flex-col box-content m-2 overflow-hidden bg-indigo-900 rounded-2xl absolute opacity-0 -z-50 w-60 top-16 -left-60 duration-300 shadow-2xl shadow-black transition-all ease-in-out"}>
                    <div className="bg-indigo-100 flex flex-col justify-center items-center">
                        <div className="h-32 w-32 m-4 box-content rounded-full bg-indigo-900 ">
                            <img className="overflow-hidden rounded-full h-full w-full object-cover" src={props.userInfo.avatar_url} alt="" />
                        </div>
                        <div className="pb-4 px-4 select-none">
                            <h1 className="text-indigo-900 text-lg font-semibold">{props.userInfo.name}</h1>
                            <h2 className="text-indigo-900 text-sm font-light">@{props.userInfo.username}</h2>
                        </div>
                </div>
                <div className="">
                        <Link to="/home" onClick={props.navShow}> 
                            <div className="p-5 bg-indigo-900 text-indigo-50 font-semibold hover:bg-indigo-100 hover:text-indigo-800 ">Home</div>
                        </Link>
                        <Link to={`/${props.userInfo.username}`} onClick={props.navShow}>
                            <div className="p-5 bg-indigo-900 text-indigo-50 font-semibold hover:bg-indigo-100 hover:text-indigo-800">My Artist Page</div>
                        </Link>
                        <Link to="/setup" onClick={props.navShow}>
                            <div className="p-5 bg-indigo-900 text-indigo-50 font-semibold hover:bg-indigo-100 hover:text-indigo-800">
                                Settings
                            </div>
                        </Link> 
                        <Link onClick={LogoutHandler}>
                            <div className="p-5 bg-indigo-900 text-indigo-50 font-semibold hover:bg-indigo-100 hover:text-rose-700">
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
                        <Link to="/" onClick={props.navShow}>
                            <div className="p-4 bg-indigo-900 text-indigo-50 font-semibold hover:bg-indigo-50 hover:text-indigo-800 ">Sign In</div>
                        </Link>
                        <Link to={`/signup`} onClick={props.navShow}>
                            <div className="p-4 bg-indigo-900 text-indigo-50 font-semibold hover:bg-indigo-50 hover:text-indigo-800">Sign Up</div>
                        </Link>
                    </div>
                </div>
            }
        </>

    )
}