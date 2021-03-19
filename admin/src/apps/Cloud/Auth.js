
var auth


class Auth {
    static init(firebaseObject) {
        auth = firebaseObject.auth()
    }


    static currentAuthor = { id: "1", full_name: "Arthur Miller" }
}

export default Auth