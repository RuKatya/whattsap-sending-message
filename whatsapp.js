// Post link: 
// https://developer.vonage.com/en/blog/send-a-whatsapp-message-with-node-dr

// To Create Your Own Profile Follow Link: 
// https://ui.idp.vonage.com/ui/auth/registration?adobe_mc=MCMID%3D86860332144848792100695958649111594333%7CMCORGID%3DA8833BC75245AF9E0A490D4D%2540AdobeOrg%7CTS%3D1716983839
const https = require('https');

const user = process.env.USER;
const password = process.env.PASS;
const from_number = process.env.FROM_NUMBER;
const to_number = process.env.TO_NUMBER;

const options = {
    hostname: 'messages-sandbox.nexmo.com',
    messaging_product: 'whatsapp',
    port: 443,
    path: '/v0.1/messages',
    method: 'POST',
    authorization: {
        username: user,
        password: password
    },
    headers: {
        'Authorization': 'Basic ' + btoa(`${user}:${password}`),
        'Content-Type': 'application/json'
    }
};

exports.messageText = (userinfo) => {
    const listofcandles = userinfo.candleItem.map(item => (`\n\nשם נר: ${item.candleName}\nצבע: ${item.color}\nריח: ${item.smell}\nכמות: ${item.quantity}\nמחיר: ${item.price}₪\nסה"כ לתשלום:${item.price * item.quantity}₪`))
    const totalpricecandles = userinfo.candleItem.reduce((acc, cur) => (acc.quantity * acc.price) + (cur.quantity * cur.price))
    const text =
        `היי 🎉,\nיש לנו הזמנה חדשה מ *${userinfo.customerName}*!\nמספר טלפון לחזרה: ${userinfo.phoneNo}\n\n*ההזמנה כולל*:${listofcandles}\n\n*תשלום סה"כ על כל ההזמנה*: ${totalpricecandles}₪`

    return JSON.stringify({
        "from": { "type": "whatsapp", "number": from_number },
        "to": { "type": "whatsapp", "number": to_number },
        "message": {
            "content": {
                "type": "text",
                "text": text
            }
        }
    });
}

exports.whatsapp = https.request(options, (res) => {
    console.log(`statusCode: ${res.statusCode}`)

    res.on('data', (d) => {
        process.stdout.write(d)
    })
});