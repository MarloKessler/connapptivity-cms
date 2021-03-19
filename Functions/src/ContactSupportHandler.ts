import { Functions, sendMail } from "./utils"


export const ContactSupportHandler = Functions.https.onCall( async data => {
    try {
      const type = data.type
      if (type === SupportType.contactRequest) {
        const name = data.name
        const company = data.company
        const email = data.email
        const phone = data.phone
        const startTime = data.startTime
        const endTime = data.endTime
        const misc = data.misc
        
        const html = 
        `
        <p>Hallo Marlo</p>
        <p>dies ist eine automatisch generierte E-Mail deiner Website. Jemand möchte dich kontaktieren:</p>
        <br/>
        ${name && ("<p><b>Name:</b> " + name + "</p>")}
        ${company && ("<p><b>Firma:</b> " + company + "</p>")}
        ${email && ("<p><b>E-Mail:</b> " + email + "</p>")}
        ${phone && ("<p><b>Telefon:</b> " + phone + "</p>")}
        <br/>
        ${ getTimeString(startTime, endTime) }
        <br/>
        ${ misc && ("<p>Er/sie möchte Dir folgendes mitteilen:</p>")}
        ${ misc && ("<p>\"" + misc + "\"</p>")}
        <br/>
        <p>Beste Grüße</p>
        <p>Deine Website</p>
        <br/>
        <br/>
        `
  
        const text = 
        `
        Hallo Marlo,
  
        dies ist eine automatisch generierte E-Mail deiner Website. Jemand möchte dich kontaktieren:
  
        ${name && ("Name: " + name)}
        ${company && ("Firma: " + company)}
        ${email && ("E-Mail: " + email)}
        ${phone && ("Telefon: " + phone)}
  
        ${ getTimeString(startTime, endTime) }
        
        ${ misc && "Er/sie möchte Dir folgendes mitteilen:\n \"" + misc + "\""}
  
        Beste Grüße
        Deine Website
  
  
        `
        
        await sendMail("Neuer Kontaktversuch", text, html)
        return { success: "Contact request successful." } 
      } else throw new Error("Unknown type")
    } catch (error) {
      return { error: error.message }
    }
  })
  

  function getTimeString(startTime: string, endTime: string) {
    if (startTime && endTime) return "<p>Am besten kannst du ihn/sie erreichen von " + startTime  + " bis " + endTime + " Uhr</p>"
    else if (startTime) return "<p>Am besten kannst du ihn/sie erreichen ab " + startTime + " Uhr</p>"
    else if (endTime) return "<p>Am besten kannst du ihn/sie erreichen bis " + endTime + " Uhr</p>"
    else return "<p>Er/sie hat keine Präferenzen wann Du ihn/sie anrufst.</p>"
  }
  
  
  const SupportType = {
    contactRequest: "contactRequest",
  }