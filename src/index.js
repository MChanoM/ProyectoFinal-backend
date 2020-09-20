import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import './database';

const app = express();

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
app.use(express.urlencoded({ extended:true}));

// aqui agrego la carpeta public
app.use(express.static(path.join(__dirname, "../public")));

// Rutas
app.get('/', (req, res) => {
    res.send("hola mundo :D")
})

app.get('/usuarios', (req, res) => {
    res.send("estoy en la pagina de usuarios")
})

app.get('api/categorias', (req, res) => {
    res.send("Estoy en las categorias")
})