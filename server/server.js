import express from 'express';
import dotenv from 'dotenv';
import path from 'path';

import auth from './src/routes/Auth';
import redFlags from './src/routes/RedFlags';


dotenv.config();

const app = express();

app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => res.status(200).json({ msg: 'it\'s works' }));

app.use('/api/v1/auth', auth);
app.use('/api/v1/red-flags', redFlags);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
