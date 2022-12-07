import { createBrowserRouter, Link, redirect } from "react-router-dom"
import { useEffect } from "react";
function Landing () {

    // sign in with google 

    const [user, loading] = useAuthState(auth);
    const GoogleProvider = new GoogleAuthProvider();
    const GoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, GoogleProvider);
            console.log(result);
            redirect ("/artist/id/*");
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=> {
        if(user){
            console.log(user)
        }else {
            console.log("error")
        }
    }, [user])
    return (
        <div className="flex items-center justify-center bg-red-50  ">
            <div className="flex flex-col w-1/2 h-96 items-center justify-center text-center bg-slate-200 gap-12">
            <Link to="/"><h1 className="font-bold text-4xl text-center">Bookha</h1></Link>
            {
            !user && <h1>hi</h1>
            }
            <div>{user !== null ?`Hello ${user.displayName}, welcome to Bookha` : null}</div>
            <div onClick={GoogleLogin} className=" cursor-pointer w-48 h-12 border-green-100 border-2 flex items-center justify-center bg-green-100">Login with Google</div>
            </div> 
        </div>
    )
}

export default Landing