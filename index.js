const express = require('express');
const { json } = require('express');
const config = require('./config/envConfig');
const controller = require('./controller/routes');

const app = express();

app.listen(config.PORT || 3000,()=>{
    console.log(`Se está escuchando en el puerto ${config.PORT}`);
});
app.use(json());
app.use(express.urlencoded({extended: true}));
app.use('/api',controller);
app.get('/health', (req,res) => {
    res.status(200).json("OK")
});
module.exports = app;
