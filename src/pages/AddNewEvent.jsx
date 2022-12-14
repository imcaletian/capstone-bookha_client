import { NavLink } from "react-router-dom"
import supabase from "../supabaseClient"
import backArrow from "../assets/chevron-left-solid.svg"
import EventForm from "../components/SetupForms/EventForm"


const AddNewEvent = (props) => {
  return (
    <div className="bg-indigo-900 min-h-screen rounded-2xl w-full relative">
      <div className="w-16 p-4 absolute">
        <NavLink to={-1}>
          <div className="rounded-lg bg-indigo-50 p-2 w-16 flex justify-center m-0">
          <img className="w-5 " src={backArrow} alt="" />
          </div>
        </NavLink>
      </div>
      <div className="h-24 flex items-center justify-center">
        <h1 className="text-center text-2xl text-white">Add an event</h1>
      </div>
<div className="bg-indigo-100 rounded-2xl">
    <EventForm artistInfo={props.artistInfo}/>
</div>
</div>
  )
}


export default AddNewEvent