import express from "express";
import dotenv from "dotenv";

import dados from "./src/data/dados.js";
const { bruxos, varinhas, animais, pocoes } = dados;

const app = express();
app.use(express.json());

dotenv.config();
const serverPort = process.env.PORT || 3001;

app.get("/", (req, res) => {
    res.send("🚀 Servidor funcionando...");
});

app.get('/bruxos', (req, res) => {
    const { casa, ano, especialidade, nome } = req.query;
    let resultado = bruxos;
  
    if (casa) {
      resultado = resultado.filter(b => b.casa.toLowerCase() === casa.toLowerCase());
    }
  
    if (ano) {
      resultado = resultado.filter(b => b.ano == ano);
    }
  
    if (especialidade) {
      resultado = resultado.filter(b => b.especialidade.toLowerCase().includes(especialidade.toLowerCase()));
    }
  
    if (nome) {
      resultado = resultado.filter(b => b.nome.toLowerCase().includes(nome.toLowerCase()));
    }
  
    res.status(200).json({
      total: resultado.length,
      data: resultado
    });
});

app.post('/bruxos', (req, res) => {
    const { nome, casa, ano, varinha, mascote, patrono, especialidade, vivo } = req.body;

    if (!nome || !casa) {
        return res.status(400).json({
            success: false,
            message: "Nome e casa são obrigatórios para um bruxo!"
        });
}

 const novoBruxo = {
        id: bruxos.length + 1,
        nome,
        casa: casa,
        ano: parseInt(ano),
        varinha: varinha || "Em desenvolvimento",
        mascote: mascote || "Em desenvolvimento",
        patrono: patrono || "Em desenvolvimento",
        especialidade: especialidade || "Em desenvolvimento",
        vivo: vivo
    };

    bruxos.push(novoBruxo);
    
    res.status(201).json({
        success: true,
        message: "Novo bruxo adicionado a Hogwarts!",
        data: novoBruxo
    }); 
});

app.get('/varinhas', (req, res) => {
  const { material, nucleo } = req.query;
    let resultado = bruxos;
  
    if (material) {
      resultado = resultado.filter(b => b.material.toLowerCase() === material.toLowerCase());
    }
  
    if (nucleo) {
      resultado = resultado.filter(b => b.nucleo == nucleo);
    }
  
    res.status(200).json({
      total: resultado.length,
      data: resultado
    });
});

app.post('/varinhas', (req, res) => {
  const { material, nucleo } = req.body;
  

  if (!material || !nucleo) {
      return res.status(400).json({
          success: false,
          message: "Material e nucleo são obrigatórios para uma varinha!"
      });
}

const novaVarinha = {
      id: varinhas.length + 1,
      material,
      nucleo,
      comprimento
  };

  bruxos.push(novaVarinha);
  res.status(201).json({
      success: true,
      message: "Nova varinha adicionada ao arsenal!",
      data: novaVarinha
  }); 
});

app.get('/pocoes', (req, res) => {
  const { nome, efeito } = req.query;
    let resultado = pocoes;
  
    if (nome) {
      resultado = resultado.filter(b => b.nome.toLowerCase() === nome.toLowerCase());
    }
  
    if (efeito) {
      resultado = resultado.filter(b => b.efeito == efeito);
    }
  
    res.status(200).json({
      total: resultado.length,
      data: resultado
    });
});

app.post('/pocoes', (req, res) => {
  const { nome, efeito } = req.body;
  

  if (!nome || !efeito) {
      return res.status(400).json({
          success: false,
          message: "Nome e efeito são obrigatórios para uma poção!"
      });
}

const novaPocao = {
      id: pocoes.length + 1,
      nome,
      efeito
  };

  bruxos.push(novaPocao);
  res.status(201).json({
      success: true,
      message: "Nova poção adicionada ao arsenal!",
      data: novaPocao
  }); 
});

app.get('/animais', (req, res) => {
  const { nome, tipo } = req.query;
    let resultado = pocoes;
  
    if (nome) {
      resultado = resultado.filter(b => b.nome.toLowerCase() === nome.toLowerCase());
    }
  
    if (tipo) {
      resultado = resultado.filter(b => b.efeito == efeito);
    }
  
    res.status(200).json({
      total: resultado.length,
      data: resultado
    });
});

app.post('/animais', (req, res) => {
  const { nome, tipo } = req.body;
  

  if (!nome || !tipo) {
      return res.status(400).json({
          success: false,
          message: "Nome e tipo são obrigatórios para um animal!"
      });
}

const novoAnimal = {
      id: animais.length + 1,
      nome,
      tipo
  };

  bruxos.push(novoAnimal);
  res.status(201).json({
      success: true,
      message: "Novo animal adicionada ao zoológico!",
      data: novoAnimal
  }); 
});

// Iniciar servidor escutando na porta definida
app.listen(serverPort, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${serverPort} 🚀`);
});