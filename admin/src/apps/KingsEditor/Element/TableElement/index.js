import "./style.css"

export default TableElement

function TableElement(props) {
    const { attributes, children, element } = props

    switch (element.type) {
        case 'table':
            return (
                <div className={ "table-container " + (element.position || TablePosition.fullWidth) }>
                    <table>
                        <tbody {...attributes}>{children}</tbody>
                    </table>
                </div>
            )
        case 'table-row':
            return <tr {...attributes}>{children}</tr>
        case 'table-cell':
            return <td {...attributes}>{children}</td>
        default:
            return <p {...attributes}>{children}</p>
    }
}

export const TablePosition = {
    center: "center",
    left: "left",
    right: "right",
    fullWidth: "fullWidth",
}