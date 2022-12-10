import { Link } from "react-router-dom";

export default function SignUp (props) {


    return (
        <div className="h-screen w-screen flex justify-center items-center bg-slate-600">
        <div className="mx-auto rounded-lg w-60 h-96 flex flex-col justify-center items-center bg-slate-200 shadow-2xl">
            <Link to="../"><h1 className="text-2xl font-semibold">Bookem</h1></Link>
            <p className="text-sm font-light py-2">Let's get you started!</p>
            <div className="p-3">
                <form onSubmit={props.formik.handleSubmit} className="flex w-sfull flex-col gap-2 py-1">
                    <label className={`text-xs ${props.formik.errors.email ? "text-red-400" : ""}`} htmlFor="email" >{props.formik.errors.email ? props.formik.errors.email: "Email"}</label>
                    <input className="rounded-md text-xs w-40 h-5 p-2" type="email" name="email" placeholder="Enter Your Email" value={props.formik.values.email} onChange={props.formik.handleChange} />
                    <label className={`text-xs ${props.formik.errors.password ? "text-red-400" : ""}`} htmlFor="password">{props.formik.errors.password ? props.formik.errors.password: "Password"}</label>
                    <input className="rounded-md text-xs w-40 h-5 p-2" type="password" name="password" placeholder="Enter your password" value={props.formik.values.password} onChange={props.formik.handleChange} />
                    <label className={`text-xs ${props.formik.errors.passwordConfirm ? "text-red-400" : ""}`} htmlFor="confirm">{props.formik.errors.passwordConfirm ? props.formik.errors.passwordConfirm: "Confirm Password"}</label>
                    <input className="rounded-md text-xs w-40 h-5 p-2" type="password" name="passwordConfirm" placeholder="Enter your password" value={props.formik.values.passwordConfirm} onChange={props.formik.handleChange} />
                    <div className=" rounded-md text-xs font-semibold flex w-20 h-8 mt-2 bg-slate-100 items-center justify-center self-center"><input type="submit" value="Register" /></div>
                </form>
            </div>
        </div>
        </div>
    )
}