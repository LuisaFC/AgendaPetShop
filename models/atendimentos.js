const moment = require('moment');
const conexao = require('../infraestrutura/conexao');


class Atendimento {
    adiciona(atendimento, res) {
        const dataCriacao = moment().format('YYYY-MM-DD hh:mm:ss');
        //manipulação da data
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD hh:mm:ss');

        const dataEhValida = moment(data).isSameOrAfter(dataCriacao);
        const clienteEhValido = atendimento.cliente.length >= 5;

        const validacoes = [
            {
                nome: 'data',
                valido: dataEhValida,
                mensagem: 'Data deve ser maior ou igual a data atual'
            },
            {
                nome: 'cliente',
                valido: clienteEhValido,
                mensagem: 'Cliente de ter pelo menos 5 caracteres'
            }
        ]

        const erros = validacoes.filter(campo => !campo.valido);
        const existemErros = erros.length;

        if (existemErros) {
            res.status(400).json(erros)
        } else {
            const atendimentoDatado = { ...atendimento, dataCriacao, data }
            const sql = 'INSERT INTO atendimento SET ?'

            conexao.query(sql, atendimentoDatado, (erro, resultados) => {
                if (erro) {
                    res.status(400).json(erro);

                } else {
                    res.status(201).json(resultados);

                }
            })
        }

    }

    lista(res){
        const sql = 'SELECT * FROM atendimento'

        conexao.query(sql, (erro, resultados) => {
            if(erro){
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados);
            }
        })
    }

    buscarPorId(id, res){
        const sql = `SELECT * FROM atendimento where id=${id}`

        conexao.query(sql, (erro, resultados)=>{
            const atendimento = resultados[0]
            if(erro){
                res.status(400).json(erro)
            }else{
                res.status(200).json(atendimento)
            }
        })
    }

    altera(id, valores, res){
        if(valores.data){
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD hh:mm:ss');
        }
        const sql = 'UPDATE atendimento SET ? WHERE id=?'

        conexao.query(sql, [valores, id], (erro, resultados)=>{
            if (erro){
                res.status(400).json(erro)
            }else{
                res.status(200).json(resultados)
            }
            }
        )
    }
}

module.exports = new Atendimento;