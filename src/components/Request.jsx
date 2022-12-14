import { useState } from "react";
import DateTimePicker from "react-datetime-picker";
import supabase from "../supabaseClient";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Link } from "react-router-dom";


const Request = (props) => {
    const nowDate = new Date();
    const [date, onChange] = useState(nowDate);
    const [till, setTill] = useState()
    console.log(date)

    const requestHandler = async (form) => {
        try {
            const { data, error } = await supabase
                .from('requests')
                .insert([form])
            if (error) throw error;
        } catch (error) {
            alert(error.error_description || error.message)
        }
        finally {
            alert('Submission Sent!');
        }
    }

    const formik = useFormik({
        initialValues: {
            description: '',
            location: '',
            private: 'false',
            booking_fee: '',
        },

        onSubmit: (values) => {
            const requestForm = {
                created_by: props.localId,
                sent_to: props.artistInfo.id,
                request_timestamp: date,
                till_timestamp: till,
                location: values.location,
                description: values.description,
                private: values.private,
                booking_fee: values.booking_fee
            }
            requestHandler(requestForm)
        },

        validationSchema: Yup.object({
            description: Yup.string().required("Email is required"),
            location: Yup.string().required('Password is required'),
        })
    })

    return (
        <>
            {props.userInfo &&
                <div className="bg-indigo-50 h-full py-10" >
                    <div className="flex justify-center flex-col items-center">
                        <h1 className="font-semibold py-4">Make a request</h1>
                        <form className="flex flex-col items-center" onSubmit={formik.handleSubmit}>
                            <h1 className="pb-2">Pick A Date and Time</h1>
                            <div className="flex flex-wrap justify-center items-center gap-3">
                                <div className="w-80 flex justify-between">
                                    <label className="text-left w-10">From</label>
                                    <DateTimePicker onChange={onChange} value={date} />
                                </div>
                                <div className="w-80 flex justify-between">
                                    <label className="text-left w-10">To</label>
                                    <DateTimePicker onChange={setTill} value={till} />
                                </div>
                                <div className="w-80 flex flex-col gap-2" >
                                    <label htmlFor="description">What is the booking for?</label>
                                    <textarea className="h-36 p-2 rounded-lg resize-none" onChange={formik.handleChange} name="description" value={formik.values.description} />
                                </div>
                                <div className="w-80 flex flex-col gap-2">
                                    <label>Where is your event?</label>
                                    <input className="p-2 rounded-lg w-full" type="text" onChange={formik.handleChange} value={formik.values.location} name="location" />
                                </div>
                                <div className="w-80 flex flex-col gap-2">
                                    <label>What's your budget for this booking?</label>
                                    <input className="p-2 rounded-lg w-full" type="text" onChange={formik.handleChange} value={formik.values.booking_fee} name="booking_fee" />
                                </div>
                                <div className="w-80 flex gap-2">
                                    <label>Is this a private event?</label>
                                    <input type="checkbox" name="private" onChange={formik.handleChange} value={formik.values.private} />
                                </div>
                                <div className="w-80 flex gap-2" >
                                    <input type="submit" value="Submit" className="bg-indigo-600 font-semibold text-indigo-50 p-3 w-full rounded-lg cursor-pointer" />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            }
            {!props.userInfo &&
                <div>
                    <div className="w-full h-full bg-indigo-900 z-20 absolute opacity-100 flex items-center justify-start bg-opacity-60 flex-col">
                        <p className="text-white font-semibold p-24">You need to login in order to make a booking request.</p>
                        <Link to="/"><div className="px-8 py-2 w-fit border-2 h-fit rounded-xl font-semibold bg-indigo-50">Login</div></Link>
                    </div>
                    <div className="bg-indigo-50 h-full py-10 " >
                        <div className="flex justify-center flex-col items-center blur-sm">
                            <h1 className="font-semibold py-4">Make a request</h1>
                            <form className="flex flex-col items-center" onSubmit={formik.handleSubmit}>
                                <h1 className="pb-2">Pick A Date and Time</h1>
                                <div className="flex flex-wrap justify-center items-center gap-3">
                                    <div className="w-80 flex justify-between">
                                        <label className="text-left w-10">From</label>
                                        <DateTimePicker onChange={onChange} value={date} />
                                    </div>
                                    <div className="w-80 flex justify-between">
                                        <label className="text-left w-10">To</label>
                                        <DateTimePicker onChange={setTill} value={till} />
                                    </div>
                                    <div className="w-80 flex flex-col gap-2" >
                                        <label htmlFor="description">What is the booking for?</label>
                                        <textarea className="h-36 p-2 rounded-lg resize-none" onChange={formik.handleChange} name="description" value={formik.values.description} />
                                    </div>
                                    <div className="w-80 flex flex-col gap-2">
                                        <label>Where is your event?</label>
                                        <input className="p-2 rounded-lg w-full" type="text" onChange={formik.handleChange} value={formik.values.location} name="location" />
                                    </div>
                                    <div className="w-80 flex flex-col gap-2">
                                        <label>What's your budget for this booking?</label>
                                        <input className="p-2 rounded-lg w-full" type="text" onChange={formik.handleChange} value={formik.values.booking_fee} name="booking_fee" />
                                    </div>
                                    <div className="w-80 flex gap-2">
                                        <label>Is this a private event?</label>
                                        <input type="checkbox" name="private" onChange={formik.handleChange} value={formik.values.private} />
                                    </div>
                                    <div className="w-80 flex gap-2" >
                                        <input type="submit" value="Submit" className="bg-indigo-600 font-semibold text-indigo-50 p-3 w-full rounded-lg cursor-pointer" />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            }
        </>
    )

}

export default Request;