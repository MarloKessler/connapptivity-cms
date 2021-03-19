import "./style.css"
import { useState } from "react"
import { FiImage, FiTrash2 } from "react-icons/fi"
import { CgArrowsExchange } from "react-icons/cg"
import { Image, SelectorUI, MediaTypes } from "../../index"


export { ImageSelectionUI }


function ImageSelectionUI({ imageName, onChange, imageSizes }) {
    const [showingSelector, setShowingSelector] = useState(false)
    const toggleSelector   = () => setShowingSelector(!showingSelector)
    const deleteImageName  = () => onChange(undefined)
    const onImageSelected  = images => {
        setShowingSelector(false)
        const imageName = images[0].name
        onChange(imageName)
    }

    return (
        <div className="image-selection-ui">
            { imageName
                ? <div className="isui-image-container">
                    <div className="image-toolbar">
                        <button onClick={ toggleSelector }><CgArrowsExchange/></button>
                        <button onClick={ deleteImageName }><FiTrash2/></button>
                    </div>
                    <Image path={ `media/images/${imageName}` } imageSizes={ imageSizes }/>
                </div>
                : <div className="image-placeholder-container">
                    <div className="image-placeholder" onClick={ toggleSelector }>
                        <div className="image-selection-button"><FiImage className="image-selection-button-label"/></div>
                    </div>
                </div>
            }
            { showingSelector && <SelectorUI type={ MediaTypes.IMAGE } onSelected={ onImageSelected } onCancel = { toggleSelector }/> }
        </div>
    )
}