import "./style.css"
import { Link } from "react-router-dom"

export function LoadingErrorView({ message, linkMessage, link, className = "" }) {
    return (
        <div className={ `loading-error-view ${className}` }>
            <h2>{ message }</h2>
            <div className="le-actions">
                <Link to={ link }><button className="button">{ linkMessage }</button></Link>
            </div>
        </div>
    )
}