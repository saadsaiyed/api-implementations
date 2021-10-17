const express = require("express")
const data = require("./data.json")

const app = express();
const PORT = 3000

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

require("./routes/part1")(app); // This is to pass the app instance to the authRoutes.js

app.listen(PORT, () => {
    console.log("Server is listening on ", PORT);
})