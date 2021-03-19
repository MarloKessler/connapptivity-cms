
import { Editor as SlateEditor, Element as SlateElement, Transforms as SlateTransforms, Range } from "slate"
import { ReactEditor } from "slate-react"


class Transforms {

    // Mark
    static isMarkActive = (editor, format) => {
        const marks = SlateEditor.marks(editor)
        if (!marks) return false
        if (format === "link") return marks.link !== undefined
        else return marks[format] === true
    }


    static toggleMark = (editor, format) => {
        const isActive = Transforms.isMarkActive(editor, format)
        if (isActive) SlateEditor.removeMark(editor, format)
        else SlateEditor.addMark(editor, format, format === "link" ? "" : true)
    }


    // Align
    static isAlignActive = (editor, alignment) => {
        const [match] = SlateEditor.nodes(editor, { match: node => !SlateEditor.isEditor(node) && SlateElement.isElement(node) && node.textAlign === alignment })
        return match
    }


    static toggleAlign = (editor, alignment) => {
        if (Transforms.isAlignActive(editor, alignment)) return SlateTransforms.setNodes(editor, { textAlign: null })
        SlateTransforms.setNodes(editor, { textAlign: alignment })
    }


    // Block
    static isBlockActive = (editor, format) => {
        const [match] = SlateEditor.nodes(editor, { match: node => !SlateEditor.isEditor(node) && SlateElement.isElement(node) && node.type === format })
        return match
    }


    static toggleBlock = (editor, format) => {
        const isActive = Transforms.isBlockActive(editor, format)
        switch (format) {
            case "ul":
            case "ol": return Transforms.#toggleListBlock(editor, format, isActive)
            case "quote": return Transforms.#toggleQuoteblock(editor, format, isActive)
            case "h1":
            case "h2":
            case "h3": 
            case "h4":
            case "h5":
            case "h6": return Transforms.#toggleHeading(editor, format, isActive)
            default: break
        }
    }


    static #toggleHeading = (editor, format, isActive) => SlateTransforms.setNodes(editor, { type: isActive ? 'p' : format })


    static #toggleListBlock = (editor, format, isActive) => {
        SlateTransforms.unwrapNodes(editor, { match: node => SlateElement.isElement(node) && (node.type === "ul" || node.type === "ol"), split: true })

        if (isActive) SlateTransforms.setNodes(editor, { type: "p" }, { match: node => SlateElement.isElement(node) && node.type === "li" })
        else {
            SlateTransforms.setNodes(editor, { type: "li" })
            SlateTransforms.wrapNodes(editor, { type: format, children: [] }, {split: false})
        }
    }


    static #toggleQuoteblock = (editor, format, isActive) => {
        if (isActive) {
            SlateTransforms.unwrapNodes(editor, { match: node => SlateElement.isElement(node) && node.type === format, split: false })
            SlateTransforms.setNodes(editor, { type: "p" }, { match: node => SlateElement.isElement(node) && node.type === "quote-content" })
        } else {
            SlateTransforms.wrapNodes(editor, { type: format })
            SlateTransforms.setNodes(editor, { type: "quote-content" })
            
            /*
            const anchorPath = editor.selection.anchor.path
            const focusPath  = editor.selection.focus.path

            const elementNo = Math.max(anchorPath[0], focusPath[0])
            const childNo   = Math.max(anchorPath[1], focusPath[1])

            const authorPath = [elementNo, childNo + 1]
            const authorNode = { type: "quote-author", children: [{ text: "Autor" }] }
            SlateTransforms.insertNodes(editor, [authorNode], { at: [authorPath] })
            */
        }
    }


    static isEditorFocused = editor => editor.selection && ReactEditor.isFocused(editor)


    static isRangeSelected = editor => Transforms.isEditorFocused(editor) && !Range.isCollapsed(editor.selection) && SlateEditor.string(editor, editor.selection) !== ''


    // Element
    static insertElement = (editor, element) => {
        if (!Transforms.isEditorFocused(editor)) return
        const anchorPath = editor.selection.anchor.path
        const focusPath  = editor.selection.focus.path
        
        const elementNo   = Math.max(anchorPath[0], focusPath[0])
        const elementPath = [elementNo + 1]
        
        const elementNode = { type: element, children: [] }
        switch (element) {
            case "image":
                elementNode.caption = ""
                break
            case "youtube":
                elementNode.url = ""
                break

            default: break
        }

        const newNodes = [ elementNode ]
        // Adds a new line below the element if it is the last child in the editor.
        if (editor.children.length === elementPath[0]) newNodes.push({ type: "p", children: [{ text: "" }] })
        SlateTransforms.insertNodes(editor, newNodes, { at: elementPath })
    }
}


export default Transforms