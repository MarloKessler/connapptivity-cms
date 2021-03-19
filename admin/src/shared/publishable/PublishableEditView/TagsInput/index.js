import "./style.css"
import { CgClose } from "react-icons/cg"


export default TagsInput


function TagsInput({ tags = [], onChange, className = "" }) {
    const addTag = tag => {
        const lowercaseTag = tag.toLowerCase().trim()
        if (!tags.includes(lowercaseTag)) {
            const newTagsArray = Array.from(tags)
            newTagsArray.push(lowercaseTag)
            onChange(newTagsArray)
        }
    }

    const removeTag = index => {
        const newTagsArray = Array.from(tags)
        newTagsArray.splice(index, 1)
        onChange(newTagsArray)
    }


    const handleInputKeyDown = event => { 
        if(event.key === "Enter" && event.target.value !== "") {
            addTag(event.target.value)
            event.target.value = ""
        } else if (event.key === "Backspace" && event.target.value === "") removeTag(tags.length - 1)
    }


    return (
        <div className={ `tags-input ${className}` }>
            <h3>Tags:</h3>
            <div className="tags-container">
                {
                    tags.map( (tag, index) => 
                        <div className="tag" key={ tag }>
                            { tag }
                            <button className="remove-tag-button" onClick={ () => removeTag(index) }><CgClose/></button>
                        </div>
                    )
                }
                <input type="text" placeholder="Neuer Tag…" onKeyDown={ handleInputKeyDown }/>
            </div>
        </div>
    )
}