import express from "express";
import pg from "pg";
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const db = new pg.Client({
  connectionString: process.env.DATABASE_URL || "postgresql://technomedia_user:H8OfhJCryXZ3PpL9HnFyNxjKgRVuAdvF@dpg-d1u0gkqdbo4c73e33sfg-a/technomedia",
  ssl: { rejectUnauthorized: false }
});


db.connect();

app.get("/",(req,res)=>{
    res.status(200).send("the server is running")
});

app.post("/userRegister", async(req,res)=>{
    try {
        const { email, password, fname, lname } = req.body;

        const dbEmail = await db.query("SELECT email FROM users WHERE email = $1",[email]);

        if(dbEmail.rows.length === 0){

            await db.query(
            "INSERT INTO users (email, password, fname, lname) VALUES ($1,$2,$3,$4)",
            [email, password, fname, lname]
            )
            //return page 
            return res.status(201).json({ message: "The account has been saved." });
        }else{
            //redirect to registerpage
            return res.status(409).json({ message: "The account already exists." });
        }
        
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);    
    }
});

app.post('/login', async(req,res)=>{
    try {
        const {email , password} = req.body;
        const dbEmail = await db.query("SELECT email FROM users WHERE email = $1",[email]);
        if(dbEmail.rows.length === 0){
            //redirect to register 
            return res.status(404).json({ message: 'Account does not exist, please register first.' });
        }else{
            const dbPassword = await db.query("SELECT password FROM users WHERE email = $1",[email]);
            if(dbPassword.rows[0].password === password){
                //render the page (users)
                return res.status(200).json({ message: "Welcome!" });
            }else{
                return res.status(401).json({ message: "Invalid password." });
            }
        }

    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);    
    }
})
app.listen(port,()=>{
    console.log("server is running at http://localhost:3000");
});