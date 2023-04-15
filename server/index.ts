// Import the app and environment
import { environment } from './environments/environment.prod';
import app from './handlers/app';

// Load the mongo database
import { connect } from './lib/mongo';
connect();

// Start the server
// Command: npm start
const PORT: number = environment.port;
app.listen(PORT, () => {
  console.log(`Listening on: http://localhost:${PORT})`);
});