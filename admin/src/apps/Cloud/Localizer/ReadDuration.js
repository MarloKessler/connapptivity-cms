import { Duration as LXDuration } from "luxon"

class ReadDuration {

    constructor(minutes) {
        this.minutes = minutes
    }

    static fromISO(durationString) {
        const minutes = LXDuration.fromISO(durationString).as("minutes")
        return new ReadDuration(minutes)
    }
    
    toMinutesString(locale) {
        if (!locale) return this.toMinutesString("en")

        switch(true) {
            case (locale.toLowerCase().startsWith("en")): return this.minutes + " min read"
            case (locale.toLowerCase().startsWith("de")): return this.minutes + " Min"
            default: return this.toMinutesString("en")
        }
    }
}

export { ReadDuration }