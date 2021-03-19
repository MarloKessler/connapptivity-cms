
import TextElement from "./TextElement"
import ImageElement from "./ImageElement"
import YTVideoElement from "./YTVideoElement"
import DividerElement from "./DividerElement"
import QuotesElement from "./QuotesElement"
import TableElement from "./TableElement"
import ListElement from "./ListElement"

export default Element

function Element(props) {
    switch (props.element.type) {

        case "image": return ImageElement(props)
        case "youtube": return YTVideoElement(props)
        case "divider": return DividerElement(props)

        case "quote":
        case "quote-content":
        case "quote-author": return QuotesElement(props)

        case "ul":
        case "ol":
        case "li": return ListElement(props)

        case "table":
        case "table-row":
        case "table-cell": return TableElement(props)

        case "h1":
        case "h2":
        case "h3":
        case "h4":
        case "h5":
        case "h6":
        case "p":
        default: return TextElement(props)
    }
}