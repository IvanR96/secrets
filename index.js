import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended : true}));

let userIsAuthorised = false;

function passwordCheck(req, res, next){
    let password = req.body.password;

    if(password === "tellmesecrets"){
        userIsAuthorised = true;
    }
    next();
};

app.use(passwordCheck);

app.get("/", (req,res) =>{
    res.sendFile(__dirname + "/index.html");
});

app.post("/check", (req, res) =>{
    if(userIsAuthorised){
        res.sendFile(__dirname + "/secret.html");
    }
    else{
        res.sendFile(__dirname + "/index.html");
    }
});

app.listen(port, () =>{
    console.log(`Server is running on port ${port}...`);
}); 


//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming
