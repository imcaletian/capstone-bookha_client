import { NavLink } from "react-router-dom"
import supabase from "../supabaseClient"
import backArrow from "../assets/chevron-left-solid.svg"
import EventForm from "../components/SetupForms/EventForm"


const AddNewEvent = (props) => {
  return (
    <div className="bg-indigo-900 min-h-screen rounded-2xl w-full relative">
      <div className="w-16 p-4 absolute top-4">
          <NavLink to={-1}>
              <img className=" bg-indigo-50 w-11 p-2 aspect-square box-border rounded-lg " src={backArrow} alt="" />
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