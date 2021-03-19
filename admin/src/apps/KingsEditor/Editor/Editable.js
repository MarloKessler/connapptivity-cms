import { Editable as SlateEditable, useSlate } from 'slate-react'
import isHotkey from 'is-hotkey'
import Transforms from "./Transforms"
import Element from "../Element"
import Leaf from "../Leaf"


export { Editable }


const HOTKEYS = {
    'mod+b': 'bold',
    'mod+i': 'italic',
    'mod+u': 'underline',
    'mod+opt+c': 'code',
    'mod+l': 'link',
}


function Editable({ placeholder = "", spellCheck = true, ...props }) {
    const editor        = useSlate()
    const renderElement = props => <Element { ...props } isEditable/>
    const renderLeaf    = props => <Leaf { ...props }/>
    
    const handleKeyDown = event => {
        for (const hotkey in HOTKEYS) {
            if (isHotkey(hotkey, event)) {
                event.preventDefault()
                const mark = HOTKEYS[hotkey]
                return Transforms.toggleMark(editor, mark)
            }
        }
    }

    return <SlateEditable
        renderElement={ renderElement }
        renderLeaf={ renderLeaf }
        placeholder={ placeholder }
        spellCheck={ spellCheck }
        onKeyDown={ handleKeyDown }
        { ...props }
    />
}



