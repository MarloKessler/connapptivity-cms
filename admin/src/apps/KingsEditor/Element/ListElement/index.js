import "./style.css"

export default ListElement

function ListElement(props) {
    const { attributes, children, element } = props
    switch (element.type) {
        case "ol": return <ol {...attributes} className="list">{ children }</ol>
        case "ul": return <ul {...attributes} className="list">{ children }</ul>
        case "li": return <li>{ children }</li>
        default: break
    }
}