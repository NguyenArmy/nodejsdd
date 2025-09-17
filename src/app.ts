
import express from "express";
import 'dotenv/config';
import webRouter from "./routes/web";

const app = express();
const PORT = process.env.PORT || 8080;
//config view engine
app.set(`view engine`, `ejs`);
app.set(`views`, `src/views`);


//config static files
app.use(express.static('public')

)
//config routes
webRouter(app);



app.listen(PORT, () => {
    console.log(`Server is running on port 8080: ${PORT}`);

}) 