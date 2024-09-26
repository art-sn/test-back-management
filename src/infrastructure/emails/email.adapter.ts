import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as process from 'process';
import { ContextArgumentsType, TemplatesMetadata } from './templates-metadata';
import * as fs from 'fs/promises';
import * as path from 'path';
import * as handlebars from 'handlebars';

@Injectable()
export class EmailAdapter {
  protected templatesDirectory = path.join(__dirname, './email-templates');
  protected transporter: nodemailer.Transporter;

  constructor() {
    const { EMAIL_HOST, EMAIL_USER, EMAIL_PASSWORD, EMAIL_PORT } = process.env;

    this.transporter = nodemailer.createTransport({
      host: EMAIL_HOST,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASSWORD,
      },
    });
  }

  async sendMail<T extends keyof typeof TemplatesMetadata>(
    to: string,
    templateTag: T,
    contextArgs: ContextArgumentsType[T],
  ) {
    const template = TemplatesMetadata[templateTag];
    const renderedTemplateContent = await this.renderTemplate(
      template.templateSrc,
      contextArgs,
    );
    this.transporter.sendMail({
      subject: template.subject,
      to,
      html: renderedTemplateContent,
    });

    return { content: renderedTemplateContent };
  }

  protected async renderTemplate(
    templateSrc: string,
    context: any,
  ): Promise<string> {
    const templatePath = path.join(this.templatesDirectory, templateSrc);

    const templateFile = await fs.readFile(templatePath, 'utf-8');
    const compiledTemplate = handlebars.compile(templateFile);
    return compiledTemplate(context);
  }
}
