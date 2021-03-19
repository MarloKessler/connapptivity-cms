
export default DividerElement

function DividerElement(props) {
    const style = { 
        borderBottom: "1px solid #eee", 
        width: "100%", 
        height: "0", 
        margin: "20px 0"
    }
    return <div {...props.attributes} style={ style } />
}