import express from 'express';
import pool from '../db.js';

const router = express.Router();

// CREATE
router.post('/', async (req, res) => {
  try{
  const { nombre_catequizando, apellido_1, apellido_2, fecha_nac, edad_catequizando, direccion_catequizando,nivel } = req.body;
  const result = await pool.query('INSERT INTO catequizando (nombre_catequizando, apellido_1, apellido_2, fecha_nac, edad_catequizando, direccion_catequizando,nivel)VALUES ($1, $2, $3, $4, $5, $6, $7 ) RETURNING id_catequizando', [nombre_catequizando, apellido_1, apellido_2, fecha_nac, edad_catequizando, direccion_catequizando, nivel]);

  const id_catequizando= result.rows[0].id_catequizando;
   console.log('El ID que retorna es: ' + id_catequizando);

res.status(201).json({
      message: 'Catequizando agregado',
      id_catequizando: id_catequizando
      
    });
  } catch (err) {
    console.error('Error al agregar catequizando:', err);
    res.status(500).json({ error: 'Error al guardar catequizando' });
  }



  





});







// READ
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM catequizando');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener datos médicos:', error);
    res.status(500).json({ error: 'Error al obtener datos médicos' });
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