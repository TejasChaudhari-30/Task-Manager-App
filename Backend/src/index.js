import express from "express";
import router from "./routes/authroutes.js";
import router1 from "./routes/taskroutes.js";
import { corsmiddleware } from "./middleware/corsmiddleware.js";
import db from "./database/data.js";
import cron from "node-cron";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { limiter, apiLimiter } from "./util/limiter.js";



db.connect();
dotenv.config();

console.log(process.env.Admin_email);
const transporter = nodemailer.createTransport({
    service: "gmail",

    auth: {
        user: process.env.Admin_email,
        pass: process.env.passkey
    }
}
);

const port = process.env.PORT || 3000;
const app = express();


app.use(express.json());
app.use(express.urlencoded({extended:true})); // we can use nested object
// app.use(limiter);

app.use(corsmiddleware);
app.use("/api/auth", limiter, router)
app.use("/api/task", apiLimiter, router1)

cron.schedule("59 23 * * *", async () => { //minute hour, day month like structure
    console.log("Running due date check...");

    try {
        const today = new Date().toISOString().split("T")[0];
        console.log(today);
        const result = await db.query(
            `SELECT 
    t.id,
    t.title,
    t.due_date,
    u.name,
    u.email
FROM tasks t
JOIN users u ON t.user_id = u.id
WHERE t.status = 'Pending'
AND t.due_date = $1`, [today]
        );


        const tasks = result.rows;
        console.log(tasks);
        if (tasks.length > 0) {
            for (let task of tasks) {
                console.log(task.email)
                await transporter.sendMail({

                    from: process.env.Admin_email,
                    to: task.email,
                    subject: "Task Due Today 🚨",
                    text: `Reminder:Dear ${task.name} Your task "${task.title}" is due today.`
                });

                console.log("Reminder sent to:", task.email);
            }
        }
        else {
            console.log("No task due")
        }

    } catch (err) {
        console.log("Error:", err.message);
    }
});


app.listen(port, () => {
    console.log("Server is listening on port ", port);

})  