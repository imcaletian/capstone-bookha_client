import supabase from "../../supabaseClient"
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

function Form1(props) {
    const nav = useNavigate()
    const userId = localStorage.getItem('bookem_user_id')
    console.log(userId)
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
    console.log(props.userInfo)
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
            nav('/dashboard')
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
            alert ('Changes made!')
            nav('/dashboard')
        }
    }


    console.log(formik.values)


    return (
        <form className="flex flex-col gap-2 [&>label]:text-white [&>input]:p-2" onSubmit={formik.handleSubmit} >
            <label>
                Aritst Name
            </label>
            <input type="text" name="name" placeholder="" onChange={formik.handleChange} value={formik.values.name} />
            <label>
                User Name
            </label>
            <input type="text" name="username" placeholder="" onChange={formik.handleChange} value={formik.values.username} />
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
            <textarea name="description" className="h-36" onChange={formik.handleChange} value={formik.values.description} />
            <input type="submit" value={props.userInfo ? "Update" : "Submit"} className="bg-indigo-50 p-4" />
        </form>
    )
}

export default Form1