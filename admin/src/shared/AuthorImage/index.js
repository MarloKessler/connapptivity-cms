import "./style.css"
import { useState } from "react"
import { IoPersonCircle } from "react-icons/io5"
import { Image } from "../../apps/MediaCenter"

export default AuthorImage

function AuthorImage({ authorID, alt, estimatedWidth: imgWidth = "100px", className = "", style = {}, onClick = () => {} }) {
    const [imgLoadFailed, setImgLoadFailed] = useState(false)
    const imageSizes = {
        xs: imgWidth,
        s: imgWidth,
        m: imgWidth,
        l: imgWidth,
        xl: imgWidth,
    }

    return (
        <div className={ "author-image " + className } style={ style } onClick={ onClick }>
            { (authorID && !imgLoadFailed)
                ? <Image path={ `authors/${authorID}` } imageSizes={ imageSizes } alt={ alt || "" } onFailed={ () => setImgLoadFailed(true) }/>
                : <IoPersonCircle className="person-image-placeholder"/>
            }
        </div>
    )
}