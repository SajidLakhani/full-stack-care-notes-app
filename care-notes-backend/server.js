const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
// const connectDB = require('./config/db'); since i am  using mock data
const careNotesRoutes = require('./routes/careNotesRoutes');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api', careNotesRoutes); // API Routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
