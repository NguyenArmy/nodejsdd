
import express from "express";
import 'dotenv/config';
import webRouter from "routes/web";
import initDatabase from "config/seed";



const app = express();
const PORT = process.env.PORT || 8080;
//config view engine
app.set(`view engine`, `ejs`);
app.set(`views`, `src/views`);
//config request.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//config static files
app.use(express.static('public')

);


//config routes
webRouter(app);

//seeding data
initDatabase()


app.listen(PORT, () => {
    console.log(`Server is running on port 8080: ${PORT}`);

})



