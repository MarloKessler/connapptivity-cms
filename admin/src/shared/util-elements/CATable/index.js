import "./style.css"


export function CATable({ className = "", children, ...props }) {
    return <table className={ `ca-table ${className}` } { ...props }>{ children }</table>
}