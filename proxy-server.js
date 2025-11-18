import express from "express";
import cors from "cors";
import fetch from "node-fetch";
const app = express();
app.use(cors());
app.get("/no",async (req,res)=>{
    try {
        const response = await fetch("https://naas.isalman.dev/no");
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error("Error Fetching From NAAS: ", error);
        res.status(500).json({error: "Failed to fetch from NAAS"});
    }
});
app.listen(5000,()=>console.log("proxy running on port 5000"));
// Obsolete code now