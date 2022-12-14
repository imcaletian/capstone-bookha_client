import { useState, useEffect } from "react";
import DateTimePicker from "react-datetime-picker";
// import 'react-datetime-picker/dist/DateTimePicker.css'; 
import ImageUpload from "../ImageUpload";
import { useFormik } from "formik";
import supabase from "../../supabaseClient";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

const EventForm = (props) => {
    const uuid = uuidv4();
    const nav = useNavigate()
    const id = localStorage.getItem("bookem_user_id")
    const nowDate = new Date();
    const [img, setImg] = useState(null);
    const [url, setUrl] = useState(null);
    const [date, onChange] = useState(nowDate);
    const username = props.artistInfo.username
    const formik = useFormik ({
        initialValues: {
            event_name: "",
            location: "",
            link: ""           
        },
        onSubmit: (values) => {
            const formArr = {
                event_name: values.event_name,
                timestamp: date,
                location: values.location,
                link: values.link,
                username: [`${username}`],
                created_by: id,
                imgUrl: `https://hglvfiexyerckalqtbhh.supabase.co/storage/v1/object/public/photos/public/${uuid}.jpg`
            }
            uploadImage(img)
            createEvent(formArr)
            nav("/home")
        }
    });

    useEffect(()=>{
        if(img){
          const url = URL.createObjectURL(img);
          setUrl(url);
        }
      }, [img]);

      const createEvent = async (form) => {
        try {
            const { data, error } = await supabase
            .from('artist_events')
            .insert([form])
            if (error) throw error
            console.log(data)
        }
        catch {
            console.log(error.error_description || error.message)
        }

        finally {
            alert('submit successfully')
        }
      }

      const uploadImage = async (file) => {
        try {
            const { data, error } = await supabase
            .storage
            .from('photos')
            .upload(`public/${uuid}.jpg`, file, {
            cacheControl: '3600',
            upsert: false
            })
            if (error) throw (error)
        }
        catch {
            console.log(error.error_description || error.message)
        }
        finally {
            console.log("success")
        }
      }

  return (
    <form className="flex flex-col gap-2 mx-10 p-10 max-w-xl [&>label]:text-indigo-900 [&>label]:select-none [&>label]:font-semibold [&>input]:p-2 [&>input]:rounded-lg" onSubmit={formik.handleSubmit}>
        <div className="flex items-center justify-center">
        <label className={!url && `cursor-pointer p-2 w-48 aspect-square flex justify-center items-center border-2 border-indigo-50 rounded-xl`}>
            <p className={!url ? `font-semibold text-indigo-900` : `hidden`}>Add Image</p>
        <input className="hidden" type="file" accept="image/*" onChange={e => setImg(e.target.files[0])}/>
        </label>
        </div>
        {url && <div className="flex flex-col items-center gap-2 hover:brightness-75" onClick={()=> {setUrl(null)}}>
            <img src={url} className="border-2 border-indigo-50 rounded-xl w-48" />
            </div>}
        <label>
        Event Name
        </label>
        <input type="text" name="event_name" onChange={formik.handleChange} value={formik.values.event_name}/>
        <label>
        Event Date
        </label>
        <div className="bg-white p-2 rounded-lg">
        <DateTimePicker className="w-full" onChange={onChange} value={date} />
        </div>
        <label>
        Event Location
        </label>
        <input type="text" name="location" onChange={formik.handleChange} value={formik.values.location}/>
        <label>
            Ticket Link
        </label>
        <input type="text" name="link" onChange={formik.handleChange} value={formik.values.link}/>
        <input type="submit" value="Submit"/>
    </form>

  )
}

export default EventForm