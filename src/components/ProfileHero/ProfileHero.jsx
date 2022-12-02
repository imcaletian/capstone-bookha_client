import "./ProfileHero.scss"
import userAvt from "../../../public/user-avt.jpg"

const ProfileHero = () => {
    return (
        <div className="hero">
            <div className="hero--cover"></div>
            <div className="hero--avatar">
                <img className="hero--avatar__img" src={userAvt} alt="user avatar" />
            </div>
            <div className="hero--detail">
                <h2 className="hero--detail__name">Whore-ia Estefan</h2>
                <h4 className="hero--detail__pronoun">She/They</h4>
                <p className="hero--detail__bio">Ahahahah</p>
            </div>
        </div>
    )
}

export default ProfileHero