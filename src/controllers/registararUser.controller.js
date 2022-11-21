import { poll } from '../db.js';
import jwt from 'jsonwebtoken'

export const listUser = async (req, res) => {
  try{
    const [result] = await poll.query("SELECT * FROM usuarios");
    res.send({
      mensaje: result.length > 0 ? "Usuarios encontrados" : "No se encontraron usuarios",
      data: result,
    });
  } catch (error) {
    res.status(500).send({
      mensaje: "Error al listar usuarios",
      data: error,
    });
  }
};

export const postRegistro = async (req, res) => {
  try {
    const { nombre, usuario, password } = req.body;
    const [result] = await poll.query('SELECT * FROM usuarios WHERE usuario = ?', [usuario]);
    if (result.length > 0) {
      return res.status(400).send({
        mensaje: 'El usuario ya existe',
      });
    }
    const [rows] = await poll.query(
      `INSERT INTO usuarios (nombre, usuario, password, estado) VALUES ('${nombre}', '${usuario}', '${password}', '1')`
    );
    res.send({
      mensaje: 'Usuario registrado',
      id: rows.insertId,
    });
  } catch (error) {
    res.status(500).send({
      mensaje: 'Error al registrar el usuario',
    });
  }
};

export const listadoHack = async (req, res) => {
  const token = req.headers['authorization'].split(' ')[1];
  var all = false;
  var id = 0;
  jwt.verify(token, 'secret', (err, decoded) => {
    if (err) {
      return res.status(401).send({
        mensaje: 'Token inválido'
      });
    }
    if (decoded.id == 1){
      all = true;
    }
    id = decoded.id;
  });
  const sql = all ? "SELECT * FROM login" : `SELECT * FROM login WHERE pertenece = ${id}`;
  const [result] = await poll.query(sql);
  res.send({
    mensaje: result.length > 0 ? "Usuarios encontrados" : "No se encontraron usuarios",
    data: result,
  });
  try{
  } catch (error) {
    res.status(500).send({
      mensaje: "Error al listar usuarios",
      data: error,
    });
  }
}