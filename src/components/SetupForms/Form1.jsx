import supabase from "../../supabaseClient"
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";

function Form1(props) {
    const nav = useNavigate()
    const userId = localStorage.getItem('bookem_user_id')
    
    const formik = useFormik({

        initialValues: {
            name: `${props.userInfo ? props.userInfo.name : ""}`,
            username: `${props.userInfo ? props.userInfo.username : ""}`,
            pronouns: `${props.userInfo ? props.userInfo.pronouns : ""}`,
            city: `${props.userInfo ? props.userInfo.city : ""}`,
            province: `${props.userInfo ? props.userInfo.province : ""}`,
            country: `${props.userInfo ? props.userInfo.country : ""}`,
            description: `${props.userInfo ? props.userInfo.description : ""}`
        }
        ,

        onSubmit: (values) => {
            console.log(values);
            const submissionArr = {
                id: userId,
                name: values.name,
                username: values.username,
                pronouns: values.pronouns,
                city: values.city,
                province: values.province,
                country: values.country,
                description: values.description
            }
            if (props.userInfo) {
                updateHandler(submissionArr)
            }else {
                formHandler(submissionArr)
            }
        }
    })
    const formHandler = async (submission) => {
        try {
            const { data, error } = await supabase
                .from('artists')
                .insert([submission])
            if (error) throw error;
            console.log(data)
        }
        catch (error) {
            alert(error.error_description || error.message)
        }
        finally {
            console.log("success")
            nav('/home')
        }
    }


    const updateHandler = async (submission) => {
        try {
            const { data, error } = await supabase
                .from('artists')
                .update([submission])
                .eq('id', userId)
            if (error) throw error;
        }
        catch(error) {
            alert(error.error_description || error.message)
        }
        finally {
            alert ('Changes made!');
            nav(-1)
        }
    }

    return (
        <form className="flex flex-col gap-2 mx-10 p-10 max-w-xl [&>label]:text-indigo-900 [&>label]:select-none [&>label]:font-semibold [&>input]:p-2 [&>input]:rounded-lg" onSubmit={formik.handleSubmit} >
            <label>
                Display Name
            </label>
            <input type="text" name="name" placeholder="" onChange={formik.handleChange} value={formik.values.name} />
            { !props.userInfo && 
            <>
            <label>
                User Name
            </label>
            <input type="text" name="username" placeholder="" onChange={formik.handleChange} value={formik.values.username} />
            </>
            }

            <label>
                Pronouns
            </label>
            <input type="text" name="pronouns" placeholder="" onChange={formik.handleChange} value={formik.values.pronouns} />
            <label>
                City
            </label>
            <input type="text" name="city" placeholder="" onChange={formik.handleChange} value={formik.values.city} />
            <label>
                Province
            </label>
            <input type="text" name="province" placeholder="" onChange={formik.handleChange} value={formik.values.province} />
            <label>
                Country
            </label>
            <input type="text" name="country" placeholder="" onChange={formik.handleChange} value={formik.values.country} />
            <label>
                Description
            </label>
            <textarea name="description" className="h-36 p-2 rounded-lg resize-none" onChange={formik.handleChange} value={formik.values.description} />
            <div className="flex justify-between my-3">
            <input type="submit" value={props.userInfo ? "Update" : "Submit"} className="bg-indigo-50 p-3 w-full rounded-lg cursor-pointer" />
            </div>
        </form>
    )
}

export default Form1