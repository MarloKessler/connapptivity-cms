import "./style.css"

export default Leaf

function Leaf({ attributes, children, leaf }) {
    if (leaf.bold) children = <b>{ children }</b>
    if (leaf.italic) children = <i>{ children }</i>
    if (leaf.underline) children = <u>{ children }</u>
    if (leaf.code) children = <code>{ children }</code>
    // Needs to check for undefined, cause link = "" would result false for (leaf.link).
    if (leaf.link !== undefined) children = <a href={ leaf.link } style={ { color: "#efdf00" } }>{ children }</a>

    return <span {...attributes} >{ children }</span>
}