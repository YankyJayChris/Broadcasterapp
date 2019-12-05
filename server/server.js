import express from 'express';
import dotenv from 'dotenv';
import path from 'path';

import auth from './v1/routes/Auth';
import redFlags from './v1/routes/RedFlags';
import authV2 from './v2/routes/Auth';
import redFlagsV2 from './v2/routes/RedFlags';

import userModel from './v2/models/User';
import redflagModel from './v2/models/RedFlag';


dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/public', express.static(path.join(__dirname, 'public')));

userModel.createTable();
redflagModel.createTable();

app.get('/', (req, res) => res.status(200).json({ message: 'welcom to Broadcaster', documentation: 'https://documenter.getpostman.com/view/6306223/SWDzdfo3?version=latest' }));

app.use('/api/v1/auth', auth);
app.use('/api/v1/red-flags', redFlags);
app.use('/api/v2/auth', authV2);
app.use('/api/v2/red-flags', redFlagsV2);
app.use('*', (req, res) => {
  res.status(404).json({ error: 'endpoint not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;
