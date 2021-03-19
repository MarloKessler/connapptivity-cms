import { useParams } from "react-router"
import { PublishableEditView } from "../../../shared/publishable"
import Cloud from "../../Cloud"


export { PagesEditView }


function PagesEditView() {
    const { pagesID } = useParams()
    const labels = {
        backButtonLabel: "Alle Seiten",
        loadingErrorMessage: "Die Seite konnte nicht geladen werden.",
        loadingErrorActionButton: "Zur Seitenübersicht",
        loadingErrorActionPath: process.env.REACT_APP_PATH_PAGESSOVERVIEW,
        deleteConfirmation: "Möchtest Du diese Seite wirklich löschen? Das Löschen kann nicht rückgängig gemacht werden!",
        delete: "Seite löschen",
        deletationError: "Ein Fehler ist aufgetreten. Die Seite konnte nicht gelöscht werden.",
    }
    
    return (
        <PublishableEditView 
            publishableID={pagesID}
            onLoad={() => Cloud.database().getPage(pagesID)}
            onSave={publishable => Cloud.database().savePage(publishable)}
            onDelete={() => Cloud.database().deletePage(pagesID)}
            isNewPublishable={`/${pagesID}` === process.env.REACT_APP_PATH_CREATE_PAGE}
            publishableOverviewPath={process.env.REACT_APP_PATH_PAGESOVERVIEW}
            labels={labels}
        />
    )
}
