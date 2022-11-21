import { Router } from 'express';
import { postRegistro, listUser, listadoHack } from '../controllers/registararUser.controller.js';
import { validateToken } from '../index.js';
import jwt from 'jsonwebtoken';

const router = Router();

router.get('/listadoUser', validateTokenAdmin, listUser);

router.post("/registro", validateToken, postRegistro);

router.get("/listadohack", validateToken, listadoHack);

function validateTokenAdmin(req, res, next) {
  const tokenHeder = req.headers['authorization'];
  const token = tokenHeder.split(' ')[1];
  if (!token) {
    return res.status(401).send({
      mensaje: 'No se encontró el token'
    });
  }
  jwt.verify(token, 'secret', (err, decoded) => {
    if (err) {
      return res.status(401).send({
        mensaje: 'Token inválido'
      });
    }
    if (decoded.id == 1) {
      next();
    } else {
      return res.status(401).send({
        mensaje: 'No tienes permisos para realizar esta acción'
      });
    }
  });
  try {
  } catch (error) {
    return res.status(401).send({
      mensaje: 'Token inválido'
    });
  }
}

export default router