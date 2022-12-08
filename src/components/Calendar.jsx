import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
const CalComponent = () => {

    // const [value, onChange] = useState(new Date()); 

    return(
        <div className='flex justify-center items-center p-10'>
        <Calendar 
        // value={value}
        onChange={e => {console.log(e)}}
        />
        </div>
    )
}

export default CalComponent