import "./style.css"

export default TextElement

function TextElement(props) {
    const elementType = props.element.type
    const textAlign = props.element.textAlign || TextAlign.left
    switch (elementType) {
        case "h1": return <h1 { ...props.attributes } className={ "text-element " + textAlign }>{ props.children }</h1>
        case "h2": return <h2 { ...props.attributes } className={ "text-element " + textAlign }>{ props.children }</h2>
        case "h3": return <h3 { ...props.attributes } className={ "text-element " + textAlign }>{ props.children }</h3>
        case "h4": return <h4 { ...props.attributes } className={ "text-element " + textAlign }>{ props.children }</h4>
        case "h5": return <h5 { ...props.attributes } className={ "text-element " + textAlign }>{ props.children }</h5>
        case "h6": return <h6 { ...props.attributes } className={ "text-element " + textAlign }>{ props.children }</h6>
        case "p": 
        default: return <p { ...props.attributes } className={ "text-element " + textAlign }>{ props.children }</p> 
    }
}

export const TextAlign = {
    left: "align-left",
    right: "align-right",
    center: "align-center",
    justify: "justify-text",
}