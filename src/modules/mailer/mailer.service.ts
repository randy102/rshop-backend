import { Injectable } from '@nestjs/common';
import nodemailer = require('nodemailer')
import os = require('os')
import Mail = require('nodemailer/lib/mailer');

export interface MailParam{
  to: string
  subject: string
  html: string
}

@Injectable()
export class MailerService {
  private readonly transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD
    }
  })

  send({ to, subject, html }: MailParam): Promise<boolean> {
    const mailOption: Mail.Options = {
      to,
      html,
      subject,
      from: `RShop <${process.env.MAIL_USER}>`
    }
    return new Promise((resolve) => {
      this.transporter.sendMail(mailOption, (error, info) => {
        if (error) {
          console.log(error)
          resolve(false)
        }
        else resolve(true)
      })
    })
  }

  sendComfirmEmail({ to, token }): Promise<boolean>{
    const host = process.env.HOSTNAME || 'localhost'
    const confirmURL = host + '/confirmemail/' + token
    const subject = 'Confirm your email!'
    const style = `
      padding: 5px 70px;
      background: #229ac9;
      color: white;
      text-decoration: none;
      font-size: 20px;
    `
    const html = `
      <p>
        Please click this button below to confirm your email:
      </p>
      <a
        style="${style}"
        href=${confirmURL}
      >
        Confirm Email
      </a>
    `
    return this.send({to,subject,html})
  }
}
