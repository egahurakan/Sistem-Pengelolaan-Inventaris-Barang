import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import userRoute from './routes/user_routes.js';
import barangRoute from './routes/barang_routes.js';
import peminjamanRoute from './routes/peminjaman_routes.js';
import pengembalianRoute from './routes/pengembalian_routes.js';
import authRoute from './routes/auth_routes.js';



const app = express();

dotenv.config();
app.use(express.json());
app.use('/api/user', userRoute);
app.use('/api/barang', barangRoute);
app.use('/api/peminjaman', peminjamanRoute);
app.use('/api/pengembalian', pengembalianRoute);
app.use('/api/auth', authRoute);

app.use(bodyParser.urlencoded({ extended: true }));

app.listen(process.env.APP_PORT, () => {
    console.log(`Running on port ${process.env.APP_PORT}`);
});
