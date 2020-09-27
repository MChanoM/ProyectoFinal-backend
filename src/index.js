import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import './database';
import noticiaRouter from './routes/noticia.routes';
import categoriaRouter from './routes/categoria.routes';
import loginRouter from './routes/login.routes';
import initialSetups from './libs/initialSetup';
// import verifyToken from './controllers/verifytoken';
const app = express();

// creacion inicial de roles
initialSetups.createRoles();
// creacion inicial de usuario admin
initialSetups.createAdmin();

// crear una variable port
app.set('port', process.env.PORT || 4000 )

app.listen(app.get('port'), () => {
    console.log(path.join(__dirname, "../public"))
    console.log("server on port " + app.get('port'));
})

// Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended:true }));


// app.use(verifyToken);

// aqui agrego la carpeta public
app.use(express.static(path.join(__dirname, "../public")));

// Rutas

app.use('/api/noticias', noticiaRouter);

app.use('/api/categorias', categoriaRouter);

app.use('/api/users', loginRouter);