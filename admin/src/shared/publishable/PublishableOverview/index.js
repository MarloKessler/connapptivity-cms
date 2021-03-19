import "./style.css"
import { useEffect, useState } from "react"
import { LoadingErrorView } from "../../util-elements"
import PublicationsTable from "../PublicationsTable"
import PublishablePreview from "../PublishablePreview"


export { PublishableOverview }


function PublishableOverview({ className = "", labels, requestOverview, createPublishable, onSelect }) {
    const [publishables, setPublishables] = useState([])

    useEffect(() => {
        requestOverview()
        .then(dicts => {
            const array = []
            dicts.forEach(dict => array.push(new PublishablePreview(dict)))
            setPublishables(array)
        })
        .catch(() => setPublishables(null))
    }, [requestOverview])

    return (
        <div className={ `publishable-overview ${className}` }>
            <header>
                <h1>{ labels.title }</h1>
                <div className="toolbar">
                    <button className="new-publishable-button" onClick={ createPublishable }>{ labels.createNewButton }</button>
                </div>
            </header>
            { publishables
                ? <div className="pub-table-container">
                    <PublicationsTable publications={ publishables } onClickRow={ onSelect }/>
                </div>
                : publishables === null && <LoadingErrorView message={ labels.error } linkMessage="Home" link={ process.env.REACT_APP_PATH_HOME }/>
            }
        </div>
    )
}

/*

<div className="table-tools">
    <button className="table-tool">Alle <FiChevronDown className="tool-icon"/></button> | 
    <button className="table-tool">Sortiert nach: Neuste <FiChevronDown className="tool-icon"/></button>
</div>

function DropDown() {
    return(
        <ul className="drop-down">
            <li><button>Alle</button></li>
            <li><button>Veröffentlicht</button></li>
            <li><button>Geplant</button></li>
            <li><button>Entwurf</button></li>
        </ul>
    )
}


.posts-overview .toolbar .table-tools {
    margin: 10px;

    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;

    border-radius: 5px;
    background-color: rgb(233, 233, 233);
}

.posts-overview .toolbar .tool-icon {
    margin: auto 0;
}

.posts-overview .toolbar .table-tools .table-tool {
    padding: 10px;

    display: flex;
    flex-wrap: nowrap;

    cursor: pointer;
    border: none;
    background-color: transparent;
}

*/