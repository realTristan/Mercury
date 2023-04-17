// Import the app and environment
import { environment } from './environments/environment.ts';
import app from './handlers/app.ts';
// Start the server
// Command: npm start
const PORT = environment.port;
app.listen(PORT, () => {
    console.log(`Listening on: http://localhost:${PORT}`);
});
