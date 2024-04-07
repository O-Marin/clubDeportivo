import express from 'express';
import {router} from './routes/routes.js'

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/',router);
app.use('/agregar',router);
app.use('/editar',router);
app.use('/eliminar', router)

app.listen(PORT, ()=> console.log(`Servidor conectado a puerto: ${PORT}`));