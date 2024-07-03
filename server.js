require('dotenv').config()
const express = require("express")
const app = express()
const PORT = process.env.PORT || 8787;

const { messageText, whatsapp } = require("./whatsapp");
const { errorHandler } = require('./middleware/error-handler.mw');

app.use(express.json())

app.post("/send-message", async (req, res, next) => {
    try {
        const info = req.body
        console.log(info)

        const data = messageText(info)
        whatsapp.write(data);

        whatsapp.on('error', (e) => {
            console.error(e);
        });

        whatsapp.end();
        return res.send({continueWork: true, message:"ההזמנה נשלחה, נחזור עלייך בהקדם"})
    } catch (error) {
        next(error)
    }
})

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`listen on http://localhost:${PORT}`)
})