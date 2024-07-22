export function sendMessageTelegram(message: string) {
    let token_bot = process.env.NEXT_PUBLIC_BOT_TELEGRAM_TOKEN || "";
    let chat_id = process.env.NEXT_PUBLIC_CHAT_ID || "";

    fetch(`https://api.telegram.org/bot${token_bot}/sendMessage?chat_id=${chat_id}&text=${message}`,
        {
            method: "POST"
        }
    )
        .then(res => {

        })
        .catch(err => {
            console.log(err);
        })
    

    console.log({token_bot, chat_id, message});
}