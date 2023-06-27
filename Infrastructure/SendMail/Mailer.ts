import IMailer from "Domain/Interfaces/IMailer";
import Response from "Domain/Model/Response";
import nodemailer from "nodemailer";

export default class Mailer implements IMailer {

    private readonly Host: string;
    private readonly Port: number;
    private readonly Username: string;
    private readonly Password: string;
    private readonly Transporter: any;

    constructor(configuration: any) {

        this.Host = configuration.Host;
        this.Port = configuration.Port;
        this.Username = configuration.Username;
        this.Password = configuration.Password;

        this.Transporter = nodemailer.createTransport({
            host: configuration.Host,
            port: configuration.Port,
            secure: true, // true for 465, false for other ports
            auth: {
                user: configuration.Username,
                pass: configuration.Password
            },
        });

    }

    async send(from: string, to: string, subject: string, body: string): Promise<Response> {
        //todo: implement sender logic

        let mailDetails = {
            from: from,
            to: to,
            subject: subject,
            text: body
        };

        let result = await this.Transporter.sendMail(mailDetails);

        console.log(result);

        return Response.Succeded("sent");

        // throw new Error("Method not implemented.");
    }

}