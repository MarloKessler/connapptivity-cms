import { useHistory } from "react-router-dom"
import Cloud from "../../Cloud"
import { PublishableOverview } from "../../../shared/publishable"


export { PagesOverview }


function PagesOverview() {
    const history = useHistory()

    const labels = { 
        title: "Seiten",
        error: "Die Seiten konnten nicht geladen werden.",
        createNewButton: "Neue Seite",
    }

    return (
        <PublishableOverview
            labels={ labels } 
            requestOverview={ () => Cloud.database().getPagePreviews() } 
            createPublishable={ () => history.push(`${process.env.REACT_APP_PATH_PAGESOVERVIEW}${process.env.REACT_APP_PATH_CREATE_PAGE}`) }
            onSelect={ publishable => history.push(`${process.env.REACT_APP_PATH_PAGESOVERVIEW}/${publishable.id}`) }
        />
    )
}