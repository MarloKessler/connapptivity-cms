import "./style.css"
import {  useSlate } from "slate-react"
import { FiBold, FiItalic, FiUnderline, FiCode, FiLink, FiAlignLeft, FiAlignCenter, FiAlignRight, FiAlignJustify, FiImage, FiMinus } from "react-icons/fi"
import { BsBlockquoteLeft, BsListOl, BsListUl } from "react-icons/bs"
import { AiOutlineYoutube } from "react-icons/ai"
import Transforms from "../Transforms"
import LinkEditor from "./LinkEditor"


export { Toolbar }


function Toolbar() {
    return (
        <div className="kings-toolbar">
            <LinkEditor/>

            <BlockButton format="h1" title="Überschrift 1">H1</BlockButton>
            <BlockButton format="h2" title="Überschrift 2">H2</BlockButton>
            <BlockButton format="h3" title="Überschrift 3">H3</BlockButton>
            
            <div className="toolbar-divider">|</div>
            
            <MarkButton format="bold" title="Fett (Cmd + B)"><FiBold/></MarkButton>
            <MarkButton format="italic" title="Kursiv (Cmd + I)"><FiItalic/></MarkButton>
            <MarkButton format="underline" title="Unterstreichen (Cmd + U)"><FiUnderline/></MarkButton>
            <MarkButton format="code" title="Mono (Cmd + Alt + C)"><FiCode/></MarkButton>
            <MarkButton format="link" title="Link (Cmd + L)"><FiLink/></MarkButton>

            <div className="toolbar-divider">|</div>

            <AlignButton alignment="align-left" title="Linksbündig"><FiAlignLeft/></AlignButton>
            <AlignButton alignment="align-center" title="Rechtsbündig"><FiAlignCenter/></AlignButton>
            <AlignButton alignment="align-right" title="Zentriert"><FiAlignRight/></AlignButton>
            <AlignButton alignment="justify-text" title="Blocksatz"><FiAlignJustify/></AlignButton>

            <div className="toolbar-divider">|</div>
            
            <BlockButton format="quote" title="Zitat"><BsBlockquoteLeft/></BlockButton>
            <BlockButton format="ol" title="Nummerierte Liste"><BsListOl/></BlockButton>
            <BlockButton format="ul" title="Liste"><BsListUl/></BlockButton>
            
            <div className="toolbar-divider">|</div>
            
            <ElementButton element="divider" title="Horizontale Linie"><FiMinus/></ElementButton>
            <ElementButton element="image" title="Bild"><FiImage/></ElementButton>
            <ElementButton element="youtube" title="Youtube Video"><AiOutlineYoutube/></ElementButton>
        </div>
    )
}


const Button = ({ isActive, className, onMouseDown, children, ...props }) => <button { ...props } className={ "menu-button" + (isActive ? " active" : "") + (className ? ` ${className}` : "") } onMouseDown={ onMouseDown }>{ children }</button>


const ElementButton = ({ element, ...props }) => {
    const editor = useSlate()
    const handleMouseDown = event => {
        event.preventDefault()
        Transforms.insertElement(editor, element)
    }
    
    return <Button {...props} className="click-effect" onMouseDown={ handleMouseDown }/>
}


const BlockButton = ({ format, ...props }) => {
    const editor = useSlate()

    const handleMouseDown = event => {
        event.preventDefault()
        Transforms.toggleBlock(editor, format)
    }

    return <Button {...props} isActive={ Transforms.isBlockActive(editor, format) } onMouseDown={ handleMouseDown }/>
}


const AlignButton = ({ alignment, ...props }) => {
    const editor = useSlate()

    const handleMouseDown = event => {
        event.preventDefault()
        Transforms.toggleAlign(editor, alignment)
    }

    return <Button {...props} isActive={ Transforms.isAlignActive(editor, alignment) } onMouseDown={ handleMouseDown }/>
}


const MarkButton = ({ format, ...props }) => {
    const editor = useSlate()

    const handleMouseDown = event => {
        event.preventDefault()
        Transforms.toggleMark(editor, format)
    }

    return <Button {...props} isActive={ Transforms.isMarkActive(editor, format) } onMouseDown={ handleMouseDown }/>
}
