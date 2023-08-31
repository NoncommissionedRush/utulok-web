import { Injectable } from '@nestjs/common';
import nodemailer, { SendMailOptions, Transporter } from 'nodemailer'
import { AdoptDogDto } from '../dtos/adopt-dog.dto';

@Injectable()
export class MailingService {
    private transporter: Transporter
    private SOURCE_ADDRESS = '' // TODO

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: "smtp.forwardemail.net",
            port: 465,
            secure: true,
            auth: {
              // TODO: replace `user` and `pass` values from <https://forwardemail.net>
              user: 'REPLACE-WITH-YOUR-ALIAS@YOURDOMAIN.COM',
              pass: 'REPLACE-WITH-YOUR-GENERATED-PASSWORD'
            }
          }); 
    }

    async send(options: SendMailOptions){
        try {
            return await this.transporter.sendMail(options);
        } catch (error) {
            console.log(error)
            throw new Error('Error sending email')
        }
    }

    async confirmAdoption(adopterEmail: string){
        return await this.send({
            to: adopterEmail,
            from: this.SOURCE_ADDRESS,
            subject: 'Adoption processed',
            text: 'Congratulations!'
        })
    }

    async sendNewAdoptionRequestNotification(dto: AdoptDogDto){
        return await this.send({
            to: this.SOURCE_ADDRESS,
            from: this.SOURCE_ADDRESS,
            subject: "NEW ADOPTION REQUEST",
            text: `New adoption request. 
            Dog ID: ${dto.dogId}, 
            Adopter Email: ${dto.email}
            Message: ${dto.message}
            `
        })
    }
}
