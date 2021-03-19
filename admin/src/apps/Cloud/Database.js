
var db
var dbClass


export default class Database {

    static init(firebaseObject) {
        db      = firebaseObject.firestore()
        dbClass = firebaseObject.firestore
    }

    /* Posts */
    /** If number == null, load all. */
    static getPostPreviews = async () => await getPublishablePreviews(db.collection(process.env.REACT_APP_DB_POSTPREVIEWS))
    static getPost = async postID => await getPublishable(db.collection(process.env.REACT_APP_DB_POSTS).doc(postID))
    static savePost = async post => await savePublishable(post, db.collection(process.env.REACT_APP_DB_POSTS))
    static deletePost = async postID => await db.collection(process.env.REACT_APP_DB_POSTS).doc(postID).delete()


    /* Pages */
    /** If number == null, load all. */
    static getPagePreviews = async () => await getPublishablePreviews(db.collection(process.env.REACT_APP_DB_PAGEPREVIEWS))
    static getPage = async pageID => await getPublishable(db.collection(process.env.REACT_APP_DB_PAGES).doc(pageID))
    static savePage = async page => await savePublishable(page, db.collection(process.env.REACT_APP_DB_PAGES))
    static deletePage = async pageID => await db.collection(process.env.REACT_APP_DB_PAGES).doc(pageID).delete()


    /* Authors */
    static async getAuthors() {
        var query = db.collection(process.env.REACT_APP_DB_AUTHORS).orderBy("surname", "asc")
        const authors = await getDocArrayFor(query)
        authors.forEach(author => author.full_name = `${author.first_name} ${author.surname}`)
        return authors
    }


    /*static async getAuthor(authorID, completionHandler) {
        try {
            const doc = await db.doc("authors/" + authorID).get()
            if (doc.exists) {

                const contentDict = getContentDictFrom(doc)
                contentDict.full_name = contentDict.first_name + " " + contentDict.surname
                completionHandler(contentDict)
            }
            else completionHandler(null, null) 
        } catch (error) {
            completionHandler(null, error)
        }
    }*/


    /** Get the latest post previews for a author. If number = null, load all. */
    /*static async getLatestPostPreviewsForAuthor(authorID, number, completionHandler) {
        try {
            var query = db.collection("postpreviews").where("author.id", "==", authorID).orderBy("publication_date", "desc")
            if (number) query = query.limit(number)
            const previews = await getDocArrayFor(query)
            completionHandler(previews)
        } catch (error) {
            completionHandler(null, error)
        }
    }*/

    /** Get the latest post previews for a tag. If number = null, load all. */
    /*static async getLatestPostPreviewsForTag(tag, number, completionHandler) {
        try {
            var query = db.collection("postpreviews").where("tags", "array-contains", tag).orderBy("publication_date", "desc")
            if (number) query = query.limit(number)
            const previews = await getDocArrayFor(query)
            completionHandler(previews)
        } catch (error) {
            completionHandler(null, error)
        }
    }

    static async getPagesDoc(pageName, completionHandler) {
        try {
            var query = db.collection("pages").where("page_name", "==", pageName).limit(1)
            const pages = await getDocArrayFor(query)
            if(pages.length <= 0) throw Error("Page not found")
            const pageSnapshot = pages[0]
            completionHandler(pageSnapshot)
        } catch (error) {
            completionHandler(null, error)
        }
    }*/
}


/* Publishable */
async function getPublishablePreviews(collectionRef) {
    const query = collectionRef.orderBy("publication_date", "desc")
    const previews = await getDocArrayFor(query)
    // Adapt dates
    previews.forEach(preview => {
        preview.publication_date  = preview.publication_date && preview.publication_date.toDate()
        preview.creation_date = preview.creation_date && preview.creation_date.toDate()
    })
    // Put drafts on top of previews
    const drafts = []
    const others = []
    previews.forEach(preview => preview.publication_date ? others.push(preview) : drafts.push(preview))
    return drafts.concat(others)
}

async function getPublishable(docRef) {
    const doc = await docRef.get()
    if (doc.exists) {
        const dict = getContentDictFrom(doc)
        dict.publication_date  = dict.publication_date && dict.publication_date.toDate()
        dict.creation_date = dict.creation_date && dict.creation_date.toDate()
        return dict
    }
    else throw Error("Publishable does not exist.")
}

async function savePublishable(publishable, collectionRef) {
    const dict = publishable.toJSON()        
    const id   = publishable.id
    // Delete unnecessary and undefined fields
    delete dict.id
    Object.keys(dict).forEach(key => dict[key] === undefined && delete dict[key])
    // Convert dates
    if (dict.creation_date) dict.creation_date = dbClass.Timestamp.fromDate(dict.creation_date)
    if (dict.publication_date) dict.publication_date = dbClass.Timestamp.fromDate(dict.publication_date)
    return await collectionRef.doc(id).set(dict)
}


/* Misc */
async function getDocArrayFor(query) {
    const snapshot = await query.get()
    var docs = []
    snapshot.forEach(doc => {
        const preview = getContentDictFrom(doc)
        docs.push(preview)
    })
    return docs
}


function getContentDictFrom(doc) {
    const dict = doc.data()
    dict.id = doc.id
    return dict
}