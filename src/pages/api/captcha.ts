const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;

export async function verifyCaptcha(captcha: string) {
    const response = await fetch(
        `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${captcha}`,
        {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
        },
        method: "POST",
        }
    );

    return response.json();
}