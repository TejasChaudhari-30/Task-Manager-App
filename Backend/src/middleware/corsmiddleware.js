import cors from "cors";

export const corsmiddleware= cors({
    origin: [
      "http://localhost:5173",       // dev
      "https://myapp.com",            // prod
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })



