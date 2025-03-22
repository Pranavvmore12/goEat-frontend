const { app } = require(".");
const connectToDB = require("./config/db");
// const { connectToDB } = require("./config/db");

const PORT=5454;
app.listen(PORT,async ()=>{
    await connectToDB()
    console.log("food ordering server running on port ",PORT)
})

