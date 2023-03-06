// Iniciando o express
const express = require('express')
const app = express()

// Banco de dados fake
let tarefas = []

// API entende que está lidando com JSON
app.use(express.json())

// Criar as tarefas do todoList
app.post('/tarefas', (req, res) => {
    const { codigo, descricao, status } = req.body
    const tarefa = { codigo, descricao, status }
    tarefas.push(tarefa)

    // 201 - Criado
    return res.status(201).json(tarefa)
} )

// Listar todas as tarefas do todoList
app.get('/tarefas', (req, res) => {
    const todasTarefas = tarefas
    return res.status(200).json(todasTarefas)
} )

// Listar uma tarefa em específico
app.get('/tarefas/:tarefa_codigo', (req,res) => {
    const { tarefa_codigo }  = req.params
    const tarefa = tarefas.find((tarefa)  => tarefa.codigo === tarefa_codigo)

    return res.status(200).json(tarefa)
} )

// Deletar tarefa
app.delete('/tarefas/:tarefa_codigo', (req, res) => {
    const { tarefa_codigo }  = req.params
    const tarefaFilter = tarefas.filter((tarefa) => tarefa.codigo !== tarefa_codigo )
    tarefas = tarefaFilter

    return res.status(204).json("Deletado")

} )


// Atualizar tarefa
app.patch('/tarefas/:tarefa_codigo', (req, res)  => {
    const { descricao, status } = req.body
    const { tarefa_codigo }  = req.params
    const tarefa = tarefas.find(tarefa => tarefa.codigo === tarefa_codigo)
    tarefa.id = tarefa.id
    tarefa.descricao = descricao ? descricao : tarefa.descricao
    tarefa.status = status ? status : tarefa.status

    return res.status(200).json(tarefa)
} )

// Servidor
app.listen(3333, () => console.log('Servidor Rodando'))




