import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

// Initialize the web app
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Main Route
app.get('/', (_: any, res: any) => {
  res.send("Welcome to the Mercury Public API!");
});

// Export the app
export default app;