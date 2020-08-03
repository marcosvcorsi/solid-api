import nodemailer from 'nodemailer';
import IMailProvider, { IMessage } from '../IMailProvider';
import Mail from 'nodemailer/lib/mailer';

export class MailtrapMailProvider implements IMailProvider {
  private transporter: Mail;

  constructor() {}

  async sendMail(message: IMessage): Promise<void> {
    if (this.transporter) {
      this.transporter.sendMail({
        to: {
          name: message.to.name,
          address: message.to.email,
        },
        from: {
          name: message.from.name,
          address: message.from.email,
        },
        subject: message.subject,
        html: message.body,
      });
    }
  }
}
