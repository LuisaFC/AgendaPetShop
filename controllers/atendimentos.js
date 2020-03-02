
module.exports = app => {
    app.get('/atendimentos', (req, res)=>{
        return res.send('Você está na rota de atendimentos tipo GET');
    });

    app.post('/atendimentos', (req, res)=>{
        console.log(req.body);
        

        return res.send('Rota de atendimentos de tipo POST')
    })
}