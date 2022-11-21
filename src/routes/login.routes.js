import { Router } from 'express';
import { poll } from "../db.js";
import jwt from 'jsonwebtoken';

const router = Router();

router.post("/login", async (req, res) => {
  const { usuario, password } = req.body;
  try{
    const [result] = await poll.query("SELECT * FROM usuarios WHERE usuario = ? AND password = ?", [usuario, password]);
    if (result.length > 0) {
      const token = jwt.sign({ id: result[0].id, usuario: result[0].usuario, nombre: result[0].nombre }, 'secret',);
      return res.send({
        token,
        nombre: result[0].nombre,
        usuario: result[0].usuario,
        id: result[0].id,
      });
    }else{
      return res.status(400).send({
        mensaje: 'Usuario o contraseña incorrectos',
      });
    }
  }catch (error) {
    res.status(500).send({
      mensaje: 'Error al iniciar sesión',
    });
  }
});


export default router;