import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function send(email:string , msg_plain:string , msg_html:string , subject:string) {
    try {
        const send_mail = await resend.emails.send({
            from: 'Pure Pressure Hawaii <onboarding@resend.dev>',
            to: email,
            subject: subject,
            html: msg_html,
            text: msg_plain,
        });

        if (send_mail.error) {
            throw new Error('Email sending failed.');
        }
        
        return send_mail;
    } catch (error) {
        throw new Error('Email sending failed.');
    }
}