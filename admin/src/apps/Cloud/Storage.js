import { v4 as uuidv4 } from "uuid"


var storage


class Storage {


    static init = firebaseObject => storage = firebaseObject.storage()


    static uploadImage(file, path, progressHandler, completionHandler) {
        const generatedName = uuidv4()
        const task = storage.ref(`${path}/${generatedName}/o.jpg`).put(file)
        
        const onProgress = snapshot => {
            const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
            progressHandler(progress)
        }
        const onError    = error => completionHandler(error)
        const onComplete = () => completionHandler(null)

        task.on('state_changed', onProgress, onError, onComplete)
    }


    static async getImageUrlSetFor(path) {
        const promises = [
            Storage.#getDownloadUrlPromiseFor(`${path}/xl.jpg`),
            Storage.#getDownloadUrlPromiseFor(`${path}/l.jpg`),
            Storage.#getDownloadUrlPromiseFor(`${path}/m.jpg`),
            Storage.#getDownloadUrlPromiseFor(`${path}/s.jpg`),
            Storage.#getDownloadUrlPromiseFor(`${path}/xs.jpg`),
        ]

        const urls = await Promise.all(promises)
        const urlSet = {
            /*webp: {
                xl: "https://picsum.photos/2400/1800",
                l: "https://picsum.photos/1800/1350",
                m: "https://picsum.photos/1200/800",
                s: "https://picsum.photos/900/675",
                xs: "https://picsum.photos/600/400",
            },*/
            jpeg: {
                xl: urls[0],
                l: urls[1],
                m: urls[2],
                s: urls[3],
                xs: urls[4],
            },
        }
        return urlSet
    }


    /** Returns back the image url for a specific path and a specific size. Default size is 'm' */
    static async getImageUrlFor(path, size = "m") {
        const promises = [Storage.#getDownloadUrlPromiseFor(`${path}/${size}.jpg`)]
        const urls = await Promise.all(promises)
        const url = {
            /*webp: Storage.#getDownloadUrlPromiseFor(`${path}/${size || "m"}.webp`),*/
            jpeg: urls[0],
        }
        return url
    }


    static #getDownloadUrlPromiseFor = path => storage.ref(path).getDownloadURL().catch( () => null)
}


export default Storage
