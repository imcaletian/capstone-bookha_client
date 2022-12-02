import userAvt from "../../../public/user-avt.jpg"

const ProfileHero = () => {
    return (
        <div className="flex flex-col relative">
            <div className="w-full bg-indigo-200 h-48"></div>
            <div className="w-48 aspect-square bg-white rounded-full overflow-hidden z-2 absolute top-24 left-[calc(50%-6rem)] transition-transform hover:scale-110">
                <img className="hero--avatar__img" src={userAvt} alt="user avatar" />
            </div>
            <div className="w-full bg-indigo-400 h-52 flex justify-end items-center flex-col p-4 select-none">
                <h2 className="font-bold text-xl">Whore-ia Estefan</h2>
                <h4 className="font-semibold text-lg">She/They</h4>
                <p className="font-light">Ahahahah</p>
            </div>
        </div>
    )
}

export default ProfileHero