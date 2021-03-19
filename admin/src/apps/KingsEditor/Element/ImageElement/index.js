import "./style.css"
import { useRef, useEffect } from "react"
import { ReactEditor, useSlate } from "slate-react"
import { Transforms } from "slate"
import { Image, ImageSelectionUI } from "../../../MediaCenter"


export default ImageElement


function ImageElement({ attributes, children, element, isEditable, ...props }) {
    const { imageName, caption = "" } = element

    const editor     = useSlate()
    const captionInp = useRef()

    // Set image size
    const imageSizes = {
        xs: "100vw",
        s: "100vw",
        m: "750px",
        l: "750px",
        xl: "750px",
    }

    useEffect(() => { if (captionInp.current) captionInp.current.value = caption }, [caption])

    const setElementNode = props => {
        const elementPath = ReactEditor.findPath(editor, element)
        Transforms.setNodes(editor, props, { at: elementPath })
    }

    const changeImageName  = name => setElementNode({ imageName: name })
    const onCaptionChanged = () => setElementNode({ caption: captionInp.current.value })

    return (
        <div { ...attributes } contentEditable={ false } className="image-element">
            { isEditable
                ? <ImageSelectionUI imageName={ imageName } onChange={ changeImageName } imageSizes={ imageSizes }/>
                : <Image path={ `media/images/${imageName}` } imageSizes={ imageSizes } alt={ caption || "" }/>
            }
            { isEditable
                ? <div><input ref={ captionInp } className="caption-input" type="text" placeholder="Bildunterschrift" onChange={ onCaptionChanged }/></div>
                : caption && <p className="caption">{ caption }</p>
            }
            <div style={{ display: "none" }}>{ children }</div>
        </div>
    )
}

/** ImageElementSize */
/*export const ImageElementSize = {
    regular: "regular",
    wide: "wide",
    fullWidth: "fullWidth",
}*/