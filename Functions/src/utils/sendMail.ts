import { createTransport } from "nodemailer"


export async function sendMail(subject: string, text: string, html: string) {
  const smtpServer = "smtp.gmail.com"
  const port       = 465
  const secure     = true
  const username   = "marlo.kessler@connapptivity.de"
  const password   = "qmhntetdsrwnulcz"

  const transport = createTransport({
    host: smtpServer,
    port: port,
    secure: secure,
    auth: {    
      user: username,
      pass: password
    }
  })

  const email = "marlo.kessler@connapptivity.de"
  const mailOptions = {
    from: email,
    to: email,
    subject: subject,
    text: text,
    html: html,
  }

  await transport.sendMail(mailOptions)
  .catch( (error: Error) => {
    throw new Error('Sending email failed.')
  })
}