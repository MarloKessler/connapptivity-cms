import "./style.css"


const SelectorUI = ({ type, allowMultiple, onSelected = () => {}, onCancel = () => {}, ...props }) => {

    const onSelectButtonClicked = () => {
        onSelected([{ name: "6f576b51-128f-4faf-a4d9-e3bf02ca5160" }])
    }

    /*const onCancelButtonClicked = () => {
        onCancel()
    }*/

    return (
        <div className="selector-container">
            <div className="selector-background"/>
            <div className="selector">
                <div className="items-grid">
                    
                </div>
                <div className="selector-toolbar">

                    <button onClick={ onCancel }>Abbrechen</button>
                    <button onClick={ onSelectButtonClicked }>Auswählen</button>
                </div>
            </div>
        </div>
    )
}


export { SelectorUI }