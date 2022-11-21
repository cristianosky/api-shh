import Express from "express";
import loginRoutes from './routes/login.routes.js';
import postRoutes from './routes/register.routes.js';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import { PORT } from './config.js';


const app = Express();
app.use(Express.json());
app.use(cors());

app.use(loginRoutes)
app.use(postRoutes)

app.use((req, res, next) => {
  res.send({
    mensaje: "No se encontró la ruta",
    status: 404,
  });
});

app.use(function (req, res, next) {

  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();

});

export function validateToken(req, res, next) {
  const tokenHeder = req.headers['authorization'];
  const token = tokenHeder.split(' ')[1];
  if (!token) {
    return res.status(401).send({
      mensaje: 'No se encontró el token'
    });
  }
  try {
    jwt.verify(token, 'secret', (err, decoded) => {
      if (err) {
        return res.status(401).send({
          mensaje: 'Token inválido'
        });
      }
      next();
    });
  } catch (error) {
    return res.status(401).send({
      mensaje: 'Token inválido'
    });
  }
}

app.listen(PORT);
console.log("Server is running on port 3000");