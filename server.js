require('dotenv').config()
const express = require("express")
const app = express()
const PORT = process.env.PORT || 8787;
const cors = require("cors")

const { messageText, whatsapp } = require("./whatsapp");
const { errorHandler } = require('./middleware/error-handler.mw');

app.use(express.json())
const allowedOrigins = [corsOrigin, corsDev];
app.use(cors<Request>({
    origin: 
    function (origin, callback) {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    //process.env.NODE_ENV === 'production' ? corsOrigin : corsDev,
    methods: ["POST", "GET", "DELETE", "PATCH"],
}));

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