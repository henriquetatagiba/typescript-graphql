import { Controller, Get, Post, BodyParams } from '@tsed/common';
import { CreateRequestInput } from './inputs/createRequest.input';
import { requestModel, Request } from './request.model';
import * as nodemailer from 'nodemailer';

@Controller('/requests')
export class RequestController {
  @Post('/')
  public async create(
    @BodyParams() input: CreateRequestInput
  ): Promise<Request> {
    const request = await requestModel.create<Request>(input);

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_SERVER,
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${request.name}" <${request.email}>`,
      to: process.env.SMTP_MAILTO,
      subject: 'Formulário de Campanha - Smart Ped',
      html: `
        <p><b>Nome:</b><br> ${request.name}</p>
        <p><b>Rede:</b><br> ${request.networkName}</p>
        <p><b>E-mail:</b><br> ${request.email}</p>
        <p><b>Telefone:</b><br> ${request.phone}</p>
      `,
    });

    return request;
  }
}
