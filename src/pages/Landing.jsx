import { createBrowserRouter, Link, redirect, Route, Routes} from "react-router-dom"
import { useEffect } from "react";
import { useState } from "react";
import { useFormik } from "formik";
import Login from "../components/login";
import SignUp from "../components/signup";

function Landing () {

    const formikLogin = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        
        onSubmit: (values) => {
            console.log(values)
        }
    })

    const formikRegister = useFormik ({
        initialValues: {
            email: '',
            password: '',
            passwordConfirm : ''
        }
    })
    return (
        <Routes>
            <Route path="/" element={<Login formik={formikLogin} />} />
            <Route path="/signup" element={<SignUp formik={formikRegister} />} />
        </Routes>
    )
}

export default Landing