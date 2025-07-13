import express from "express";
import connectToDatabase from "./connection/connect";
const app = express();

import userRoutes from "./routes/user.routes";
app.use(express.json());
app.use("/user", userRoutes);

const PORT = 7878;
async function startServer() {
  await connectToDatabase();
  setTimeout(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  }, 3000);
}

startServer();
