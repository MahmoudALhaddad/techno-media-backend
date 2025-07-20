import express from "express";
import pg from "pg";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = process.env.PORT || 10000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "..", "frontend")));

const db = new pg.Client({
  connectionString: process.env.DATABASE_URL || 
  "postgresql://technomedia_user:H8OfhJCryXZ3PpL9HnFyNxjKgRVuAdvF@dpg-d1u0gkqdbo4c73e33sfg-a/technomedia",
  ssl: { rejectUnauthorized: false }
});


db.connect(err => {
  if (err) {
    console.error('Database connection error:', err.stack);
  } else {
    console.log('Database connected');
  }
});



app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "pages", "index.html"));
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