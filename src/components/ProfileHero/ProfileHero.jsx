import userAvt from "../../../public/user-avt.jpg"

const ProfileHero = (props) => {
    return (
        <div className="flex flex-col relative">
            <div className="w-full bg-indigo-200 h-48"></div>
            <div className="w-48 aspect-square bg-white rounded-full overflow-hidden z-2 absolute top-24 left-[calc(50%-6rem)] transition-transform hover:scale-110">
                <img className="hero--avatar__img" src={props.artistInfo !== null ? props.artistInfo.avatar_url : ""} alt="" />
            </div>
            <div className="w-full bg-indigo-800 h-52 flex justify-end items-center flex-col p-4 select-none text-white">
                <h2 className="font-bold text-xl">{props.artistInfo !== null ? props.artistInfo.name : ""}</h2>
                <h4 className="font-semibold text-xs">{props.artistInfo !== null ? props.artistInfo.pronouns : ""}</h4>
                <p className="font-extralight text-xs">{props.artistInfo !== null ? `${props.artistInfo.city}, ${props.artistInfo.province}`  : ""}</p>
                <p className="font-light mt-2">{props.artistInfo !== null ? props.artistInfo.description : ""}</p>
            </div>
        </div>
    )
}

export default ProfileHero