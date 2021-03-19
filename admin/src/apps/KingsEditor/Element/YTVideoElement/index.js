import "./style.css"
import { useRef, useEffect } from "react"
import { useSlate } from "slate-react"
import { Transforms } from "slate"

export default YTVideoElement

function YTVideoElement(props) {
    const { attributes, children, element, isEditable } = props
    const videoUrl = element.url
    const editor   = useSlate()
    const urlInput = useRef()

    /* Possible URL combinations:

    Single video: "https://www.youtube.com/watch?v=zktJ8-k0JDc" to "https://www.youtube.com/embed/zktJ8-k0JDc"

    Playlist from start: "https://www.youtube.com/playlist?list=PL4cUxeGkcC9g9gP2onazU5-2M-AzA8eBw" to "https://www.youtube.com/embed?listType=playlist&list=PL4cUxeGkcC9g9gP2onazU5-2M-AzA8eBw"

    Playlist with specific video position: "https://www.youtube.com/watch?v=zktJ8-k0JDc&list=PL4cUxeGkcC9g9gP2onazU5-2M-AzA8eBw&index=2" to "https://www.youtube.com/embed?listType=playlist&list=PL4cUxeGkcC9g9gP2onazU5-2M-AzA8eBw&index=2"
    */

    useEffect(() => urlInput.current.value = videoUrl, [videoUrl])

    const handleUrlChange = () => Transforms.setNodes(editor, { url: urlInput.current.value })
    
    return (
        <div {...attributes} contentEditable={ false } className="ytvideo-container">
            { isEditable && 
                <div className="url-input-container">
                    <label className="url-input-label"><b>Video Link:  </b></label><input ref={ urlInput } className="url-input" type="url" placeholder="Video Url" onChange={ handleUrlChange }/>
                </div> 
            }
            <div className="iframe-container">
                <iframe
                    src={ getSrcUrlFrom(videoUrl) }
                    title={ `YouTube Video ${videoUrl}` }
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen 
                />
            </div>
            { children }            
        </div>
    )
}

function getSrcUrlFrom(url) {
    var srcUrl = "https://www.youtube.com/embed"

    if (url.includes("list=")) {
        const listID = getListIDFrom(url)
        srcUrl += "?listType=playlist&list=" + listID
        
        if (url.includes("index=")) {
            const index = getIndexFrom(url)
            srcUrl += "&index=" + index
        }
    } else if (url.includes("v=")) {
        const videoID = getVideoIDFrom(url)
        srcUrl += "/" + videoID
    }
    
    return srcUrl
}

const getVideoIDFrom = (url) => url.split("v=")[1].split("&")[0]
const getListIDFrom  = (url) => url.split("list=")[1].split("&")[0]
const getIndexFrom   = (url) => url.split("index=")[1].split("&")[0]
