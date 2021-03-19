import { Functions, Admin } from "./utils"


export const PostPreviewHandler = Functions.firestore.document("posts/{postID}").onWrite( async (change, context) => {
    const postID = context.params.postID
    const post = change.after.data()
    const postPreviewCollection = Admin.firestore().collection("postpreviews")
    if (!post) await deletePreview(postID, postPreviewCollection)
    else await setPreview(postID, post, postPreviewCollection)
})


export const PagePreviewHandler = Functions.firestore.document("pages/{pageID}").onWrite( async (change, context) => {
    const pageID = context.params.pageID
    const page = change.after.data()
    const pagePreviewCollection = () => Admin.firestore().collection("pagepreviews")
    if (!page) await deletePreview(pageID, pagePreviewCollection)
    else await setPreview(pageID, page, pagePreviewCollection)
})



const setPreview = async (publishableID: string, publishable: any, previewCollection: any) => {
    // Change content
    publishable.content = getPreviewForSlateContent(publishable.content),
    await previewCollection.doc(publishableID).set(publishable)
}


const getPreviewForSlateContent = (content: any) => {
    var text = ""
    // Leave loop if text is 200 characters long.
    const breakIfLongEnough = () => text.length >= 200
    content.some((element: any) => {
        if (element.type !== "p") return
        return element.children.some((leaf: any) => {
            const words = leaf.text.split(" ")
            return words.some((word: string) => {
                text += `${word} `
                return breakIfLongEnough()
            })  
        })
    })
    if (text.length >= 200) text += "…"
    return text
}


const deletePreview = async (publishableID: string, previewCollection: any) => await previewCollection.doc(publishableID).delete()