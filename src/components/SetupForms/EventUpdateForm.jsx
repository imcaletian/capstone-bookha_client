import { useState, useEffect } from "react";
import { useFormik } from "formik";
import supabase from "../../supabaseClient";
import { useNavigate } from "react-router-dom";

const EventUpdateForm = (props) => {
    const nav = useNavigate()
    const id = localStorage.getItem("bookem_user_id")
    const nowDate = new Date();
    const [img, setImg] = useState(null);
    const [url, setUrl] = useState(null);
    const [eventInfo, setEventInfo] = useState(null)
    const formik = useFormik({
        initialValues: {
            event_name: `${eventInfo ? eventInfo.event_name : ""}`,
            location: `${eventInfo ? eventInfo.location : ""}`,
            link: `${eventInfo ? eventInfo.link : ""}`
        },
        onSubmit: (values) => {
            const formArr = {
                event_name: `${values.event_name === "" ? eventInfo.event_name : values.event_name}`,
                location: `${values.location === "" ? eventInfo.location : values.location}`,
                link: `${values.link === "" ? eventInfo.link : values.link}`
            }
            updateEvent(formArr)
            nav("/home")
        }
    });

    useEffect(() => {
        const getEvent = async () => {
            const { data, error } = await supabase
                .from('artist_events')
                .select('*')
                .eq("id", props.id)
            if (data) {
                setEventInfo(data[0])
            }
            if (error) { console.log(error) }
        }
        getEvent()
    }, [props.id])

    const deleteEvent = async () => {
        try {
            const { data, error } = await supabase
                .from('artist_events')
                .delete()
                .eq('id', props.id)
                if (error) throw error
        } 
        catch {
            console.log(error)
        }
        finally{
            alert('delete successfully')
            nav('/home')
        }
    }

    const updateEvent = async (form) => {
        try {
            const { data, error } = await supabase
                .from('artist_events')
                .update(form)
                .eq("id", props.id)
            if (error) throw error
        }
        catch {
            console.log(error)
        }
        finally {
            alert('update successfully')
            props.setModal(false)
            nav('/home')
        }
    }

    return (
        <>
        <div className="w-full h-16 bg-indigo-900 flex justify-center items-center font-semibold text-indigo-50 text-xl">Update Event</div>
        <form onSubmit={formik.handleSubmit}>
            <div className="flex flex-col gap-3 py-4 max-w-xl mx-10 my-2 [&>label]:text-indigo-900 [&>label]:select-none [&>label]:font-semibold [&>input]:p-2 [&>input]:rounded-lg ">
                <label>
                    Event Name
                </label>
                <input type="text" name="event_name" onChange={formik.handleChange} placeholder={eventInfo ? eventInfo.event_name : ""} value={formik.values.event_name} />
                <label>
                    Event Location
                </label>
                <input type="text" name="location" onChange={formik.handleChange} placeholder={eventInfo ? eventInfo.location : ""} value={formik.values.location} />
                <label>
                    Ticket Link
                </label>
                <input type="text" name="link" onChange={formik.handleChange} placeholder={eventInfo ? eventInfo.link : ""} value={formik.values.link} />
            </div>

            <div className="flex justify-evenly w-full mt-10">
                <input className="p-4 bg-indigo-900 w-1/2 font-semibold hover:bg-teal-700 text-indigo-50 transition-all cursor-pointer rounded-none" type="submit" value="Update" />
                <div className="p-4 text-center bg-indigo-900 w-1/2 font-semibold hover:bg-rose-700 text-indigo-50 transition-all cursor-pointer" 
                onClick={()=> {deleteEvent();
                    props.setModal(false)}
                }>Delete</div>
            </div>
        </form>
        </>
    )
}

export default EventUpdateForm