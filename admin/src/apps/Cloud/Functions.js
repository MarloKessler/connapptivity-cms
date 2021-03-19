
var functions

class Functions {
    static init(firebaseObject) {
        functions = firebaseObject.app().functions("europe-west3")
    }
    
    static sendToSupport = async (data) => call("sendToSupport", data)
}

async function call(name, data) {
    const callable = functions.httpsCallable(name)
    const result = await callable(data)
    const error = result.data.error
    if (error) throw new Error(error)
    return result.success
}

export default Functions