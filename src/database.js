import mongoose from 'mongoose';

const url = 'mongodb://localhost:27017/newspro'

mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true
})

const connection = mongoose.connection;

connection.once('open', () => {
    console.log("DB conectada")
})