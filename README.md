
<p align="center">
  <img alt="Logo Node.JS" src="https://www.vectorlogo.zone/logos/nodejs/nodejs-icon.svg" width="100px" />
</p>

<p align="center">
  <a href="LICENSE"><img  src="https://img.shields.io/static/v1?label=License&message=MIT&color=8cc84b&labelColor=202024" alt="License"></a>
</p>

# 💻 API CRUD of Tasks

Este projeto é o desafio 01 do 1º módulo da trilha de Node.js do Ignite ministrado pela [Rocketseat](https://github.com/rocketseat) com o educador [Diego Fernandes](https://github.com/diego3g).

## 📌 Objetivo

API que realiza o CRUD (Create, Read, Update, Delete) de tarefas e realiza o import de tarefas por um arquivo CSV.
Funcionalidades:

- [x]  Criação de uma task
- [x]  Listagem de todas as tasks
- [x]  Atualização de uma task pelo `id`
- [x]  Remover uma task pelo `id`
- [x]  Marcar pelo `id` uma task como completa
- [x]  **DESAFIO**: Importação de tasks em massa por um arquivo CSV

### Rotas e regras de negócio

Estrutura (propriedades) da task:

- `id` - Identificador único de cada task
- `title` - Título da task
- `description` - Descrição detalhada da task
- `completed_at` - Data de quando a task foi concluída. O valor inicial deve ser `null`
- `created_at` - Data de quando a task foi criada.
- `updated_at` - Deve ser sempre alterado para a data de quando a task foi atualizada.

Rotas:

- `POST - /tasks`
- `GET - /tasks`
- `PUT - /tasks/:id`
- `DELETE - /tasks/:id`
- `PATCH - /tasks/:id/complete`



### ➙｢｣ Import

O import é realizado utilizando a lib [csv-parse](https://csv.js.org/)

## Screenshots

![Screenshot](https://raw.githubusercontent.com/rafael-camara/challenge-ignite-nodejs-01-fundamentos/main/.github/images/screenshot.png)

## 📝 Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---