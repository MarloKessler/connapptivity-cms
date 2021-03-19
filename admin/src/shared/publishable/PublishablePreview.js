import { PublicationState } from "./PublicationState"


export default class PublishablePreview {
    constructor(dict) {
        this.id          = dict.id
        this.path        = dict.path
        this.author      = dict.author
        this.title       = dict.title
        this.title_image = dict.title_image
        this.read_time   = dict.read_time
        this.tags        = dict.tags
        this.creation_date    = dict.creation_date
        this.publication_date = dict.publication_date
    }

    publication_state = () => {
        const currentDT = new Date()
        if (this.publication_date === null) return PublicationState.draft
        else if (this.publication_date > currentDT) return PublicationState.scheduled
        else if (this.publication_date <= currentDT) return PublicationState.published
    }
}