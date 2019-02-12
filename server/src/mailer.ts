import User from 'models/User.js';
import nodemailer from 'nodemailer';
import nunjucks from 'nunjucks';
import path from 'path';
import strip from 'string-strip-html';
import { getRepository } from 'typeorm';
import EmailRecord from './models/EmailRecord';
import config from './server.config.json';

const EmailRecords = getRepository(EmailRecord);

const mailConfig = config.mail;

let transporter;

if (mailConfig.useSendmail) {
  transporter = nodemailer.createTransport({
    sendmail: true,
  });
} else {
  const { smtp } = mailConfig;
  let auth;

  if (!smtp.username) {
    auth = false;
  } else {
    auth = {
      user: smtp.username,
      pass: smtp.password,
    };
  }

  transporter = nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port,
    auth,
  });
}

const nenv = nunjucks.configure(path.join(__dirname, '..', 'views', 'emails'), {
  noCache: process.env.NODE_ENV == 'dev',
  autoescape: true,
});

nenv.addGlobal('site', {
  host: config.host,
  origin: config.origin,
  contactEmail: 'no-reply@' + config.host,
});

nenv.addGlobal('NODE_ENV', process.env.NODE_ENV);

interface MailMessage {
  replyTo?: string;
}

const render = function(
  templateName: string,
  context?: object,
): Promise<string> {
  return new Promise((res, rej) => {
    nenv.render(templateName, context, (err: Error, result: string) => {
      if (err) rej(err);
      else res(result);
    });
  });
};

const mailer = {
  async send(message: Partial<MailMessage>): Promise<MailerResponse> {
    if (!message.from) message.from = config.mail.replyTo;

    if (message.template) {
      message.html = await render(message.template, message.vars);
      message.text = strip(message.html);
    }

    await EmailRecords.save({
      to: message.to && String(message.to),
      cc: message.cc && String(message.cc),
      bcc: message.bcc && String(message.bcc),
      from: message.from && String(message.from),
      replyTo: message.replyTo && String(message.replyTo),
      subject: message.subject,
    });

    return transporter.sendMail(message);
  },
  async sendUserRegistration(
    user: User,
    opts: { isNewAccount?: boolean; newPass?: string } = {},
  ) {
    return mailer.send({
      to: user.email,
      subject: 'Verify your email address',
      template: 'user-registration.njk',
      vars: { user, isNewAccount: opts.isNewAccount, newPass: opts.newPass },
    });
  },
  async sendPasswordReset({ user }: { user: User }) {
    return mailer.send({
      to: user.email,
      subject: 'Password reset requested',
      template: 'password-reset.njk',
      vars: { user },
    });
  },
  async sendPasswordChanged({ user }: { user: User }) {
    return mailer.send({
      to: user.email,
      subject: 'Password changed',
      template: 'password-changed.njk',
      vars: { user },
    });
  },
};

interface MailMessage {
  from: string;
  to: string | string[];
  cc: string | string[];
  bcc: string | string[];
  subject: string;
  text: string;
  html: string;
  attachments: any[];
  template: string;
  vars: object;
}

interface MailerResponse {
  info: {
    messageId: any;
    envelope: any;
    accepted: string[];
    rejected: string[];
    pending: string[];
    response: any;
  };
}

export default mailer;
