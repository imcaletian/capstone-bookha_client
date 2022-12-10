import { createBrowserRouter, Link, redirect, Route, Routes, useNavigate } from "react-router-dom"
import { useEffect } from "react";
import { useState } from "react";
import { useFormik } from "formik";
import Login from "../components/login";
import SignUp from "../components/signup";
import { useToast } from "@chakra-ui/toast"
import supabase from "../supabaseClient";
import * as Yup from "yup";


function Landing() {
    const nav = useNavigate();
    const [loading, setLoading] = useState(false);
    const toast = useToast();

    const formikLogin = useFormik({
        initialValues: {
            email: '',
            password: ''
        },

        onSubmit: (values) => {
            loginHandler(values.email, values.password)
        },

        validationSchema: Yup.object({
            email: Yup.string().email('Must be valid email address').required("Email is required"),
            password: Yup.string().required('Password is required').min(6, "Password must be 6 characters or more"),
        })
    })

    const formikRegister = useFormik({
        initialValues: {
            email: '',
            password: '',
            passwordConfirm: ''
        },

        onSubmit: (values) => {
            SignupHandler(values.email, values.password)
        },

        validationSchema: Yup.object({
            email: Yup.string().email('Must be valid email address').required("Email is required"),
            password: Yup.string().required('Password is required').min(6, "Password must be 6 characters or more"),
            passwordConfirm: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match')
        })
    })


    const loginHandler = async (email, password) => {
        try {
            setLoading(true);
            const { data, error } = await
                supabase.auth.signInWithPassword({
                    email: email,
                    password: password
                })
            if (error) throw error;
            alert(`Welcome Back!`)
            console.log(data)
            localStorage.setItem("bookem_token", data.session.access_token)
            localStorage.setItem("bookem_user_id", data.user.id)
            nav('/home')
        }
        catch (error) {
            alert(error.error_description || error.message)
        }
        finally { setLoading(false) }
    }


    const SignupHandler = async (email, password) => {
        try {
            setLoading(true);
            const { data, error } = await
                supabase.auth.signUp({
                    email: email,
                    password: password
                })
            if (error) throw error;
            if (data) throw data;
            alert("Check your email for the login link!")
        }
        catch (error) {
            alert(error.error_description || error.message)
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <div className="h-screen w-screen flex flex-col justify-center items-center bg-indigo-800">
           
            <Link to="/"><div className="py-10">
                <h1 className="text-3xl font-semibold text-indigo-50">Bookem</h1>
            </div></Link>
            <div className="rounded-t-2xl w-full h-full flex flex-col justify-center items-center bg-indigo-50 shadow-2xl">
                <Routes>
                    <Route path="/" element={<Login formik={formikLogin} />} />
                    <Route path="/signup" element={<SignUp formik={formikRegister} />} />
                </Routes>
            </div>
        </div>

    )
}

export default Landing