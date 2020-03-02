const Atendimento = require('../models/atendimentos');
module.exports = app => {
    app.get('/atendimentos', (req, res)=>{
        return res.send('Você está na rota de atendimentos tipo GET');
    });

    app.post('/atendimentos', (req, res)=>{
        const atendimento = req.body;
        Atendimento.adiciona(atendimento, res)
        
    })
}