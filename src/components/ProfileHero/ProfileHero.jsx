import userAvt from "../../../public/user-avt.jpg"

const ProfileHero = (props) => {

    console.log(props.artistInfo)
    return (
        <div className="flex flex-col relative mt-2">
            <div className="w-full bg-indigo-200 h-48 rounded-t-2xl"></div>
            <div className="w-36 aspect-square bg-white rounded-full overflow-hidden z-10 absolute top-28 left-[calc(50%-4.5rem)] transition-transform hover:scale-110">
                <img className="hero--avatar__img" src={props.artistInfo !== null ? props.artistInfo.avatar_url : ""} alt="" />
            </div>
            <div className="w-full bg-indigo-800 h-44 flex justify-end items-center flex-col p-2 select-none text-white">
                <h2 className="font-bold text-xl">{props.artistInfo !== null ? props.artistInfo.name : ""}</h2>
                <h4 className="font-semibold text-xs">{props.artistInfo !== null ? props.artistInfo.pronouns : ""}</h4>
                <p className="font-extralight text-xs">{props.artistInfo !== null ? `${props.artistInfo.city}, ${props.artistInfo.province}`  : ""}</p>
                <p className="font-light mt-2">{props.artistInfo !== null ? props.artistInfo.description : ""}</p>
            </div>
        </div>
    )
}

export default ProfileHero