import { Duration as LXDuration } from "luxon"


class ReadDuration {

    constructor(minutes) {
        this.minutes = minutes
    }
    

    toMinutesString(locale) {
        if (!locale) return this.toMinutesString("en")

        switch(true) {
            case (locale.toLowerCase().startsWith("en")): return this.minutes + " min read"
            case (locale.toLowerCase().startsWith("de")): return this.minutes + " Min"
            default: return this.toMinutesString("en")
        }
    }


    static fromISO(durationString) {
        const minutes = LXDuration.fromISO(durationString).as("minutes")
        return new ReadDuration(minutes)
    }


    static fromSlateContent = content => {
        var words = 0
        content.forEach( element => {
            const type = element.type
            if (!readableElements.includes(type)) return
            words += getNumberOfWordsIn(element)
        })
        const duration = words / 250
        return new ReadDuration(duration)
    }
}


export default ReadDuration


const readableElements = ["h1", "h2", "h3", "h4", "h5", "h6", "p", "quote"]


function getNumberOfWordsIn(node) {
    const children = node.children
    const text = node.text
    var words = 0
    if (children) {
        children.forEach(child => words += getNumberOfWordsIn(child))
        return words
    } else if (text) return text.split(" ").length
    else return 0    
}