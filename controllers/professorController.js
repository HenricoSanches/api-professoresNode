// ===============================
// Controller de Professores
// ===============================

let professores = [
  {
    id: "1",
    nome: "Prof. Carlos",
    idade: 40,
    departamento: "Matemática",
    turmas: [
      { codigo: "9A", disciplina: "MAT101", alunos: ["João", "Maria", "Pedro"] },
      { codigo: "10A", disciplina: "MAT201", alunos: ["Ana", "Luiz"] }
    ]
  },
  {
    id: "2",
    nome: "Prof. Ana",
    idade: 35,
    departamento: "História",
    turmas: [
      { codigo: "9A", disciplina: "HIS101", alunos: ["João", "Pedro"] },
      { codigo: "10B", disciplina: "HIS201", alunos: ["Maria", "Carlos", "Luiza"] }
    ]
  },
  {
    id: "3",
    nome: "Prof. João",
    idade: 50,
    departamento: "Ciências",
    turmas: [
      { codigo: "9A", disciplina: "CIE101", alunos: ["João", "Maria"] },
      { codigo: "9B", disciplina: "CIE101", alunos: ["Pedro", "Luiz"] }
    ]
  }
];

// Listar todos
exports.listarProfessores = (req, res) => {
  res.json(professores);
};

// Buscar por ID
exports.buscarPorId = (req, res) => {
  const prof = professores.find(p => p.id === req.params.id);
  if (!prof) return res.status(404).json({ error: 'Id não existente' });
  res.json(prof);
};

// Listar turmas de um professor
exports.listarTurmas = (req, res) => {
  const prof = professores.find(p => p.id === req.params.id);
  if (!prof) return res.status(404).json({ error: 'Id não existente' });
  res.json(prof.turmas);
};

// Atualizar professor
exports.atualizarProfessor = (req, res) => {
  const { nome, idade, departamento } = req.body;
  const idx = professores.findIndex(p => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Id não existente' });

  if (nome) professores[idx].nome = nome;
  if (idade) professores[idx].idade = idade;
  if (departamento) professores[idx].departamento = departamento;

  res.json(professores[idx]);
};

// Adicionar turma
exports.adicionarTurma = (req, res) => {
  const { codigo, disciplina, alunos } = req.body;
  const prof = professores.find(p => p.id === req.params.id);
  if (!prof) return res.status(404).json({ error: 'Id não existente' });

  if (!codigo || !disciplina || !Array.isArray(alunos)) {
    return res.status(400).json({ error: 'Corpo inválido. Esperado { codigo, disciplina, alunos[] }' });
  }

  const existe = prof.turmas.some(t => t.codigo === codigo);
  if (existe) return res.status(409).json({ error: 'Turma com este código já existe' });

  const novaTurma = { codigo, disciplina, alunos };
  prof.turmas.push(novaTurma);
  res.status(201).json(novaTurma);
};

// Buscar por departamento (corrigido com acentos)
exports.buscarPorDepartamento = (req, res) => {
  const normalize = (str) =>
    str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

  const depParam = normalize(req.params.departamento);
  const list = professores.filter(p => normalize(p.departamento) === depParam);
  res.json(list);
};

// Deletar professor
exports.deletarProfessor = (req, res) => {
  const idx = professores.findIndex(p => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Id não existente' });

  const removido = professores.splice(idx, 1)[0];
  res.json({ message: 'Professor removido com sucesso', professor: removido });
};
