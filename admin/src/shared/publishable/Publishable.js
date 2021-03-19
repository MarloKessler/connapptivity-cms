import { v4 as uuid } from "uuid"
import crypto from "crypto"
import Cloud from "../../apps/Cloud"
import { PublicationState } from "./PublicationState"


export default class Publishable {
    constructor(dict) {
        this.id          = dict.id
        this.author      = dict.author
        this.title       = dict.title
        this.title_image = dict.title_image
        this.content     = dict.content
        this.read_time   = dict.read_time
        this.tags        = dict.tags
        this.creation_date    = dict.creation_date
        this.publication_date = dict.publication_date
    }

    static create() {
        const author = Cloud.auth().currentAuthor || { id: "", full_name: "" }
        const authorDict = {
            id: author.id,
            full_name: author.full_name,
        }
        const dict = {
            id:               uuid(),
            author:           authorDict ,
            title:            "",
            read_time:        "PT0M",
            creation_date:    new Date(),
            publication_date: null,
        }
        return new Publishable(dict)
    }

    publication_state = () => {
        const currentDT = new Date()
        if (this.publication_date === null) return PublicationState.draft
        else if (this.publication_date > currentDT) return PublicationState.scheduled
        else if (this.publication_date <= currentDT) return PublicationState.published
    }

    path = () => {
        const titlePart = this.title.replace(/ /g, "-").replace(/[^a-zA-Z0-9-_]/g, '')
        const randomPart = crypto.createHash("sha1").update(this.title).digest("hex").substring(0,6)
        return `${titlePart}-${randomPart}`
    }

    toJSON() {
        return {
            id         : this.id,
            path       : this.path(),
            title      : this.title,
            title_image: this.title_image,
            author     : this.author,
            content    : this.content,
            read_time  : this.read_time,
            tags       : this.tags,
            creation_date   : this.creation_date,
            publication_date: this.publication_date,
        }
    }
}