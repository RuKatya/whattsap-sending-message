require('dotenv').config()
const express = require("express")
const app = express()
const PORT = process.env.PORT || 8787;

const { messageText, whatsapp } = require("./whatsapp");

app.use(express.json())

app.post("/send-message", async (req, res) => {
    try {
        const info = req.body

        const data = messageText(info)
        whatsapp.write(data);

        whatsapp.on('error', (e) => {
            console.error(e);
        });

        whatsapp.end();
        res.send("done")
    } catch (error) {
        console.log(error)
    }
})

app.listen(PORT, () => {
    console.log(`listen on http://localhost:${PORT}`)
})