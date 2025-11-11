const express = require('express');
const app = express();
app.use(express.json());

const professorRoutes = require('./routes/professorRoutes');
app.use('/professores', professorRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ API de Professores rodando em http://localhost:${PORT}`);
});
