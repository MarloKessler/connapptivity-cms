import { useHistory } from "react-router-dom"
import Cloud from "../../Cloud"
import { PublishableOverview } from "../../../shared/publishable"


export { PostsOverview }


function PostsOverview() {
    const history = useHistory()

    const labels = { 
        title: "Posts",
        error: "Die Posts konnten nicht geladen werden.",
        createNewButton: "Neuer Post",
    }

    return (
        <PublishableOverview
            labels={ labels } 
            requestOverview={ () => Cloud.database().getPostPreviews() } 
            createPublishable={ () => history.push(`${process.env.REACT_APP_PATH_POSTSOVERVIEW}${process.env.REACT_APP_PATH_CREATE_POST}`) }
            onSelect={ publishable => history.push(`${process.env.REACT_APP_PATH_POSTSOVERVIEW}/${publishable.id}`) }
        />
    )
}