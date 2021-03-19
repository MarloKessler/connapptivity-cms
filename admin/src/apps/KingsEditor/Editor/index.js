// The following line forces react to reset slate editors state and thus prevents crashes on hot reload during development.
// @refresh reset

import { useMemo } from "react"
import { createEditor } from "slate"
import { Slate, withReact } from 'slate-react'
import { withHistory } from 'slate-history'


export { Editor }


function Editor({ value = [ {type: 'p', children: [{ text: '' }]} ], onChange, children }) {
    const editor = useMemo(() => withYouTube( withHistory( withReact( createEditor()))), [])
    return (
        <Slate editor={ editor } value={ value } onChange={ onChange }>
            { children }
        </Slate>
    )
}


const withYouTube = editor => {
    const { isVoid } = editor
    editor.isVoid = element => element.type === 'youtube' ? true : isVoid(element)
    return editor
}
