import cors from "cors";

export const corsmiddleware= cors({
    origin: [
      "http://localhost:5173",       // dev
      "https://task-manager-app-lemon-five.vercel.app/",            // prod
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })



