const { listarAlunos } = require('./supabase');

listarAlunos()
  .then((alunos) => console.log('alunos:', alunos))
  .catch((erro) => console.log('erro:', erro));