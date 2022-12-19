export default function SignUp(props) {
    return (
        <>
            <p className="text-xl py-2">Let's get you started!</p>
            <div className="p-3">
                <form onSubmit={props.formik.handleSubmit} className="flex flex-col gap-2 py-1">
                    <label className={`text-lg font-semibold ${props.formik.errors.email ? "text-red-400" : ""}`} htmlFor="email" >{props.formik.errors.email ? props.formik.errors.email : "Email"}</label>
                    <input className="rounded-md text-base p-2" type="email" name="email" placeholder="Enter Your Email" value={props.formik.values.email} onChange={props.formik.handleChange} />
                    <label className={`text-lg font-semibold ${props.formik.errors.password ? "text-red-400" : ""}`} htmlFor="password">{props.formik.errors.password ? props.formik.errors.password : "Password"}</label>
                    <input className="rounded-md text-base p-2" type="password" name="password" placeholder="Enter your password" value={props.formik.values.password} onChange={props.formik.handleChange} />
                    <label className={`text-lg font-semibold ${props.formik.errors.passwordConfirm ? "text-red-400" : ""}`} htmlFor="confirm">{props.formik.errors.passwordConfirm ? props.formik.errors.passwordConfirm : "Confirm Password"}</label>
                    <input className="rounded-md text-base p-2" type="password" name="passwordConfirm" placeholder="Enter your password" value={props.formik.values.passwordConfirm} onChange={props.formik.handleChange} />
                    <div className="rounded-md text-base font-semibold flex w-20 h-8 mt-4 cursor-pointer bg-indigo-800 text-indigo-50 items-center self-center justify-center px-18"><input type="submit" value="Register" /></div>
                </form>
            </div>
        </>
    )
}