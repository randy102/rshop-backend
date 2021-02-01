import {Injectable} from '@nestjs/common';
import nodemailer = require('nodemailer')
import os = require('os')
import Mail = require('nodemailer/lib/mailer');

export interface MailParam {
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
    console.log(process.env.MAIL_USER, process.env.MAIL_PASSWORD)
    return new Promise((resolve) => {
      this.transporter.sendMail(mailOption, (error, info) => {
        if (error) {
          console.log(error)
          resolve(false)
        } else resolve(true)
      })
    })
  }

  sendComfirmEmail({ to, token }): Promise<boolean> {
    const host = process.env.HOSTNAME || 'http://localhost:3000'
    const confirmURL = host + '/register/create/' + token
    const subject = 'Xác thực tài khoản RShop'
    const style = `
      padding: 5px 70px;
      background: #229ac9;
      color: white;
      text-decoration: none;
      font-size: 20px;
    `
    const html = `
      <p>
        Vui lòng bấm vào nút bên dưới để xác thực tài khoản:
      </p>
      <a href="${confirmURL}" style="${style}">
        Xác nhận
      </a>
    `
    return this.send({ to, subject, html })
  }
}
