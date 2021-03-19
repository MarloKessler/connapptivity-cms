import { useParams } from "react-router"
import { PublishableEditView } from "../../../shared/publishable"
import Cloud from "../../Cloud"


export { PostEditView }


function PostEditView() {
    const { postID } = useParams()
    const labels = {
        backButtonLabel: "Alle Posts",
        loadingErrorMessage: "Der Post konnte nicht geladen werden.",
        loadingErrorActionButton: "Zur Postübersicht",
        loadingErrorActionPath: process.env.REACT_APP_PATH_POSTSOVERVIEW,
        deleteConfirmation: "Möchtest Du diesen Post wirklich löschen? Das Löschen kann nicht rückgängig gemacht werden!",
        delete: "Post löschen",
        deletationError: "Ein Fehler ist aufgetreten. Der Post konnte nicht gelöscht werden.",
    }
    
    return (
        <PublishableEditView 
            publishableID={postID}
            onLoad={() => Cloud.database().getPost(postID)}
            onSave={publishable => Cloud.database().savePost(publishable)}
            onDelete={() => Cloud.database().deletePost(postID)}
            isNewPublishable={`/${postID}` === process.env.REACT_APP_PATH_CREATE_POST}
            publishableOverviewPath={process.env.REACT_APP_PATH_POSTSOVERVIEW}
            labels={labels}
        />
    )
}
