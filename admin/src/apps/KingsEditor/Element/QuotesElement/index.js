import "./style.css"

export default QuotesElement

function QuotesElement(props) {
    const { attributes, children, element } = props
    switch (element.type) {
        case "quote": return <div {...attributes} className="quotes-container">{ children }</div>
        case "quote-content": return <p className="quote">{ children }</p>
        case "quote-author": return <p className="quote-author-name">{ children }</p>
        default: break
    }
}