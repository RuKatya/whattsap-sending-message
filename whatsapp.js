// Post link: 
// https://developer.vonage.com/en/blog/send-a-whatsapp-message-with-node-dr

// To Create Your Own Profile Follow Link: 
// https://ui.idp.vonage.com/ui/auth/registration?adobe_mc=MCMID%3D86860332144848792100695958649111594333%7CMCORGID%3DA8833BC75245AF9E0A490D4D%2540AdobeOrg%7CTS%3D1716983839
const https = require('https');

// const user = process.env.USER;
// const password = process.env.PASS;
// const from_number = process.env.FROM_NUMBER;
// const to_number = process.env.TO_NUMBER;

// const VONAGE_API_KEY = process.env.VONAGE_API_KEY;
const VONAGE_API_KEY = "f8012f05";
const VONAGE_API_SECRET = "QrhqIQAcjkg260pl";
const VONAGE_APPLICATION_ID = "235acdf9-8a81-4fb2-af3c-c419cf9332c7";
const fs = require('fs');
const key = fs.readFileSync('./private.key', 'utf8');

const VONAGE_PRIVATE_KEY =  Buffer.from(key, 'base64')

const TO_NUMBER = process.env.TO_NUMBER;
const WHATSAPP_NUMBER = "972526299431";

const { Vonage } = require('@vonage/server-sdk');
const { WhatsAppText } = require('@vonage/messages');


const vonage = new Vonage({
    apiKey: VONAGE_API_KEY,
    apiSecret: VONAGE_API_SECRET,
    applicationId: VONAGE_APPLICATION_ID,
    privateKey:VONAGE_PRIVATE_KEY,
    
});



// const options = {
//     hostname: 'messages-sandbox.nexmo.com',
//     messaging_product: 'whatsapp',
//     port: 443,
//     path: '/v0.1/messages',
//     method: 'POST',
//     authorization: {
//         username: user,
//         password: password
//     },
//     headers: {
//         'Authorization': 'Basic ' + btoa(`${user}:${password}`),
//         'Content-Type': 'application/json'
//     }
// };

exports.messageText = (userinfo) => {
    // const listofcandles = userinfo.candles.map(item => (`\n\nשם נר: ${item.name}\nצבע: ${item.color}\nריח: ${item.fragrance}\nכמות: ${item.quantity}\nמחיר: ${item.price} ₪\nסה"כ לתשלום:${item.price * item.quantity} ₪`))
    // const totalpricecandles = userinfo.candles.reduce((acc, cur) => (acc.quantity * acc.price) + (cur.quantity * cur.price), 0)

    // console.log(userinfo.candles[0].quantity)
    // console.log(userinfo.candles[0].price)
    // console.log(typeof totalpricecandles)
    // console.log(totalpricecandles)

    // const text =
    //     `היי 🎉,\nיש לנו הזמנה חדשה מ *${userinfo.name}* !\nמספר טלפון לחזרה: ${userinfo.telNumber}\n\n*ההזמנה כולל*:${listofcandles}\n\n*תשלום סה"כ על כל ההזמנה*: ${totalpricecandles} ₪`

    // return JSON.stringify({
    //     "from": { "type": "whatsapp", "number": from_number },
    //     "to": { "type": "whatsapp", "number": to_number },
    //     "message": {
    //         "content": {
    //             "type": "text",
    //             "text": text
    //         }
    //     }
    // });

    vonage.messages.send(
        new WhatsAppText({
            text: "This is a WhatsApp Message text message sent using the Messages API",
            to: TO_NUMBER,
            from: WHATSAPP_NUMBER,
        }),
    )
        .then(resp => console.log(resp.messageUUID))
        .catch(err => console.error(err));
}

// exports.whatsapp = https.request(options, (res) => {
//     console.log(`statusCode: ${res.statusCode}`)

//     res.on('data', (d) => {
//         process.stdout.write(d)
//     })
// });