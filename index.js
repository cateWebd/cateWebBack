import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import catewebRoutes from './routes/cateweb.js';
import datamedicaRoutes from './routes/datamedica.js';
import academicRoutes from './routes/academic.js';
import familyRoutes from './routes/family.js';
import emergencyRoutes from './routes/emergency.js';
import uploadRoutes from './routes/upload.js';

dotenv.config();

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

app.use('/api/cateweb', catewebRoutes);
app.use('/api/datamedica', datamedicaRoutes);
app.use('/api/academic', academicRoutes);
app.use('/api/family', familyRoutes);
app.use('/api/emergency', emergencyRoutes);
app.use('/api/upload', uploadRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
