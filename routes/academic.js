import express from 'express';
import pool from '../db.js';

const router = express.Router();

// CREATE
router.post('/', async (req, res) => {
const { id_catequizando, anocursa_catequizando } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO infoacademicacatequizando (id_catequizando, anocursa_catequizando ) VALUES ($1, $2) RETURNING *',
      [id_catequizando, anocursa_catequizando ]
    );
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error al guardar datos médicos:', error);
    res.status(500).json({ error: 'Error al guardar datos médicos' });
  }
});


// READ
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM infoacademicacatequizando');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener datos' });
  }
});
/*
// UPDATE
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, correo } = req.body;
  const result = await pool.query('UPDATE catequizando SET nombre = $1, correo = $2 WHERE id = $3 RETURNING *', [nombre, correo, id]);
  res.json(result.rows[0]);
});

// DELETE
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM catequizando WHERE id = $1', [id]);
  res.json({ mensaje: 'Catequista eliminado' });
});*/

export default router;