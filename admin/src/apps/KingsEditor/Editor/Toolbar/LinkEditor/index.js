import "./style.css"
import { useRef, useState, useEffect } from "react"
import { Editor as SlateEditor, Transforms as SlateTransforms } from "slate"
import { ReactEditor, useSlate } from "slate-react"
import { createPopper } from '@popperjs/core'
import Transforms from "../../Transforms"


export default LinkEditor


function LinkEditor() {
    const editor = useSlate()

    const ref = useRef()
    const inputRef = useRef()
    
    const [editorIsShown, setEditorIsShown] = useState(false)
    const [hidingEditor, setHidingEditor] = useState(false)
    const [linkInputIsFocused, setLinkInputIsFocused] = useState(false)
    const [selection, setSelection] = useState()
    
    
    
    useEffect(() => {
        const editorElement = ref.current
        if (!editorElement) return
        if ((!Transforms.isRangeSelected(editor) || !Transforms.isMarkActive(editor, "link")) && !linkInputIsFocused) return showEditor(false)
        
        if (!linkInputIsFocused) {
            const domSelection = window.getSelection()
            const domRange = domSelection.getRangeAt(0)
            createPopper(domRange, editorElement, { placement: 'top' })
            showEditor(true)
        }

        setCurrentLinkAsInputValue()
    })


    const setCurrentLinkAsInputValue = () => { if (SlateEditor.marks(editor) && SlateEditor.marks(editor).link !== undefined) inputRef.current.value = SlateEditor.marks(editor).link }


    const showEditor = show => {
        const editor = ref.current
        const classList = editor.classList

        if (show) {
            setClass(classList, "display-self")
            editor.addEventListener('transitionend', () => setEditorIsShown(true), { once: true })
            setTimeout(() => setClass(classList, "visible"), 1)
        } else if (editorIsShown && !hidingEditor) {
            setHidingEditor(true)
            removeClass(classList, "visible")
            editor.addEventListener('transitionend', () => {
                removeClass(classList, "display-self")
                setHidingEditor(false)
                setEditorIsShown(false)
            }, { once: true })
        }
    }

    const setClass = (classList, className) => { if (!classList.contains(className)) classList.add(className) }
    const removeClass = (classList, className) => { if (classList.contains(className)) classList.remove(className) }

    
    const onEditorFocused = () => {
        setSelection(editor.selection)
        inputRef.current.value = SlateEditor.marks(editor).link
        setLinkInputIsFocused(true)
    }


    const onEditorBlurred  = () => {
        // Set the selection to the previous selection so that the link can be added to the leaf.
        ReactEditor.focus(editor)
        SlateTransforms.select(editor, selection)

        SlateEditor.addMark(editor, "link", inputRef.current.value)

        // Set the selection that an author can continue typing behind the link.
        const newSelection = { anchor: selection.focus, focus: selection.focus }
        SlateTransforms.select(editor, newSelection)
        SlateEditor.removeMark(editor, "link")

        inputRef.current.value = ""
        setSelection(null)
        setLinkInputIsFocused(false)
    }
    

    const handleKeyDown = event => {
        if(event.key === "Enter") {
            event.preventDefault()
            inputRef.current.blur()
        }
    }


    return (
        <div ref={ ref } className="link-editor" onFocus={ onEditorFocused } onBlur={ onEditorBlurred }>
            <b className="link-label"><small>Link:</small></b>
            <input className="link-input" type="url" ref={ inputRef } onKeyDown={ handleKeyDown }/>
        </div>
    )
}