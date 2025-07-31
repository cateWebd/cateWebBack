import express from 'express';
import multer from 'multer';
import cloudinary from '../config/cloudinary.js';
import { Pool } from 'pg';
import fs from 'fs';

const router = express.Router();
const upload = multer({ dest: 'temp/' }); // carpeta temporal

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  //ssl: { rejectUnauthorized: false }, // útil para Railway
  ssl: false,
});

router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No se envió imagen' });
    }

    // Subir a Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'cateweb',
    });

    // Borrar archivo temporal
    fs.unlinkSync(req.file.path);

    const idCatequizando = parseInt(req.body.id_catequizando);
    if (isNaN(idCatequizando)) {
      return res.status(400).json({ message: 'ID inválido' });
    }

    // Buscar registro existente
    const { rows } = await pool.query(
      'SELECT * FROM datosimportantes_catequizando WHERE id_catequizando = $1 LIMIT 1',
      [idCatequizando]
    );

    if (rows.length === 0) {
      // Insertar nuevo registro
      const insertResult = await pool.query(
        `INSERT INTO datosimportantes_catequizando (id_catequizando, "infoImportante")
         VALUES ($1, $2) RETURNING *`,
        [idCatequizando, result.secure_url]
      );
      return res.status(201).json({ message: 'Imagen insertada', data: insertResult.rows[0] });
    } else {
      // Actualizar registro existente
      const idInfoImportante = rows[0].id_infoimportantecatequizando;
      const updateResult = await pool.query(
        `UPDATE datosimportantes_catequizando
         SET "infoImportante" = $1
         WHERE id_infoimportantecatequizando = $2
         RETURNING *`,
        [result.secure_url, idInfoImportante]
      );
      return res.status(200).json({ message: 'Imagen actualizada', data: updateResult.rows[0] });
    }
  } catch (err) {
    console.error('Error al subir imagen:', err);
    res.status(500).json({ error: 'Fallo al subir imagen' });
  }
});

export default router;
