
import { Link } from "react-router-dom";

export default function Login(props) {
    return (
        <>
            <p className="text-xl py-2">A better way to book 'em!</p>
            <div className="w-60 p-3 box-content">
                <form onSubmit={props.formik.handleSubmit} className="flex flex-col gap-2 py-1" >
                    <label className="text-lg font-semibold" htmlFor="email">Email</label>
                    <input className="rounded-md text-base p-2" type="email" name="email" placeholder="Enter Your Email" value={props.formik.values.email} onChange={props.formik.handleChange} />
                    <label className="text-lg font-semibold" htmlFor="password">Password</label>
                    <input className="rounded-md text-base p-2" type="password" name="password" placeholder="Enter your password" value={props.formik.values.password} onChange={props.formik.handleChange} />
                    <input className="rounded-md text-base font-semibold flex w-20 h-8 mt-2 cursor-pointer bg-indigo-800 text-indigo-50 items-center justify-center self-center px-18 mt-5 box-border" type="submit" value="Login" />
                </form>
            </div>
            <div className="flex flex-row gap-2">
                <Link to="/signup"><div className="rounded-md text-base font-semibold flex w-20 h-8 mt-2 cursor-pointer bg-indigo-800 text-indigo-50 items-center justify-center px-18">Sign Up</div></Link>
            </div>
        </>
    )
}