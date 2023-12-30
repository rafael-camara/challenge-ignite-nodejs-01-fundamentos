import fs from 'node:fs';
import { parse } from 'csv-parse';

const tasksPath = new URL('../tasks.csv', import.meta.url);

const stream = fs.createReadStream(tasksPath);

// Realizar o import dos dados do arquivo tasks.csv para a tabela "tasks" utilizando o parse do pacote csv-parse.
// Pular a primeira linha do arquivo (cabeçalho).

const linesParse = stream.pipe(parse({ from_line: 2, skip_empty_lines: true }));

for await (const line of linesParse) {
  const [title, description] = line;
  
  await fetch('http://localhost:3333/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title,
      description,
    }),
  });

  await new Promise(resolve => setTimeout(resolve, 1000));
}