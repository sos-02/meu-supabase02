require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const { SUPABASE_URL, SUPABASE_ANON_KEY } = process.env;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error('Configure SUPABASE_URL e SUPABASE_ANON_KEY no .env');
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function inserirCurso(nome) {
  const { data, error } = await supabase
    .from('cursos')
    .insert([{ nome }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

async function listarCursos() {
  const { data, error } = await supabase
    .from('cursos')
    .select('id, nome, alunos(count)')
    .order('nome', { ascending: true });

  if (error) throw error;

  return data.map((curso) => ({
    id: curso.id,
    nome: curso.nome,
    total_alunos: curso.alunos[0]?.count ?? 0,
  }));
}

async function excluirCurso(id) {
  const { data, error } = await supabase
    .from('cursos')
    .delete()
    .eq('id', id)
    .select();

  if (error) throw error;
  return data;
}

async function listarAlunos() {
  const { data, error } = await supabase
    .from('alunos')
    .select('id, nome, ra, curso_id, curso:cursos(id, nome)')
    .order('nome', { ascending: true });

  if (error) throw error;
  return data;
}

module.exports = {
  supabase,
  inserirCurso,
  listarCursos,
  excluirCurso,
  listarAlunos,
};
