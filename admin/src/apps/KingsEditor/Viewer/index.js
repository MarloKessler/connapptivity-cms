// The following line forces react to reset slate editors state and thus prevents crashes on hot reload during development.
// @refresh reset

import React, { useMemo, useCallback } from 'react'
import { createEditor } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import Element from "../Element"
import Leaf from "../Leaf"


export { Viewer }

function Viewer(props) {
    const content = props.content
    const editor = useMemo(() => withReact(createEditor()), [])
    const renderElement = useCallback(props => <Element { ...props }/>, [])
    const renderLeaf = useCallback(props => <Leaf { ...props }/>, [])

    return (
        <div className="kings-editor" style={ { width: "100%" } }>
            <Slate editor={ editor } value={ content }>
                <Editable readOnly renderElement={ renderElement } renderLeaf={ renderLeaf } />
            </Slate>
        </div>
    )
}