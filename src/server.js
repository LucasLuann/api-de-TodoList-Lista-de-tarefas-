import http from 'node:http'
import { Database } from './database.js'

const database = new Database()

const server = http.createServer((req, res) => {
  const { method, url } = req

  if (method == 'GET' && url == '/tarefa') {
    const tarefas = database.select('tarefas')


    // Early Return
    return res.end(JSON.stringify(tarefas)) 
  }

  if (method == 'POST' && url == '/tarefa') {
    const tarefa = {
      codigo: 1,
      descricao: 'Estudar',
      status: true
    }

    database.insert('tarefas', tarefa)

    return res.end('Inserção de Tarefas')
  }

  if (method == 'PUT' && url == '/tarefa') {
    return res.end('Edicao da descricao da tarefa')
  }

  if (method == 'PATCH' && url == '/tarefa') {
    return res.end(' Alterar status da tarefa')
  }

  if (method == 'DELETE' && url == '/tarefa') {
    return res.end('Excluir uma tarefa')
  }

  return res.end('Não caiu em nenhum if')
})

server.listen(3333) // localhost:3333