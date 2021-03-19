import "./style.css"
import { useEffect, useRef } from "react"


export default TitleInput


function TitleInput({ value, onChange }) {
    const inputRef = useRef()


    const onTextAreaInput = event => {
        // Filter out line breaks in title
        const newTitle = event.target.value.replace(/\r\n|\n|\r/gm, '')
        // Set new title
        onChange(newTitle)
    }


    const resizeTitleTextArea = () => {
        const element = inputRef.current
        if (!element) return
        // Resize element
        element.style.height = 'auto'
        element.style.height = `${element.scrollHeight}px`
    }
    useEffect(resizeTitleTextArea, [value])


    return <textarea ref={ inputRef } rows="1" type="text" className="publishable-title title-input" placeholder="Titel" value={ value } onInput={ onTextAreaInput }/>
}