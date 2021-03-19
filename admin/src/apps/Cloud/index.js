import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/storage"
import "firebase/functions"
import "firebase/auth"

import Database from "./Database"
import Storage from "./Storage"
import Functions from "./Functions"
import Auth from "./Auth"

class Cloud {
    static init() {
        const firebaseConfig = {
            apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
            authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
            projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
            storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
            messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
            appId: process.env.REACT_APP_FIREBASE_APP_ID,
            measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
        }

        firebase.initializeApp(firebaseConfig)

        Database.init(firebase)
        Storage.init(firebase)
        Functions.init(firebase)
        Auth.init(firebase)        
    }

    static database  = () => Database
    static storage   = () => Storage
    static functions = () => Functions
    static auth      = () => Auth
}

export default Cloud