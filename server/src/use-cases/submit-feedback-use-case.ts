import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbaksRepository } from "../repositories/feedbacks-repository";

interface SubmitFeedbackUseCaseRequest {
    type: string;
    comment: string;
    screenshot?: string;
}

export class SubmitFeedbackUseCase {
    constructor(
        private feedbaksRepository: FeedbaksRepository,
        private mailAdapter: MailAdapter,
    ){}

    async execute(request: SubmitFeedbackUseCaseRequest) {
        const { type, comment, screenshot } = request;

        await this.feedbaksRepository.create({
            type,
            comment,
            screenshot,
        })

        await this.mailAdapter.sendMail({
           subject: 'Novo feedback',
           body: [
            `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
            `<p>Tipo do feedback: ${type}</p>`,
            `<p>Comentário: ${comment}</p>`,
            screenshot ? `<img src="${screenshot}"` : ` `,
            `</div>`
           ].join('\n')
        })  
    }
}