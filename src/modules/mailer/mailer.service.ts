import { Injectable } from '@nestjs/common';
import nodemailer = require('nodemailer')
import Mail = require('nodemailer/lib/mailer');

@Injectable()
export class MailerService {
  private readonly transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD
    }
  })

  send({ to, subject, html }): Promise<any> {
    console.log(process.env.MAIL_USER,process.env.MAIL_PASSWORD)
    const mailOption: Mail.Options = {
      to,
      html,
      subject,
      from: `RShop <${process.env.MAIL_USER}>`
    }
    return new Promise((resolve, reject) => {
      this.transporter.sendMail(mailOption, (error, info) => {
        if (error) reject(error)
        else resolve(info)
      })
    })
  }
}
