function exibirReceitasNaTabela(receitas) {
  // Recupere a referência à tabela no seu HTML (substitua "tabela" pelo ID correto)
  const tabela = document.getElementById("tabela").getElementsByTagName("tbody")[0];

  // Limpe a tabela
  tabela.innerHTML = '';

  // Divida as receitas em linhas
  const linhasReceitas = receitas.split('\n');

  // Para cada linha de receita, adicione uma nova linha à tabela
  linhasReceitas.forEach(receitaComCalorias => {
    const tr = document.createElement("tr");

    // Divida a linha em dois elementos: nome da receita e calorias
    const [receita, calorias] = receitaComCalorias.split("-"); 

    // Crie uma coluna para o nome da receita
    const tdReceita = document.createElement("td");
    tdReceita.textContent = receita;
    tr.appendChild(tdReceita);

    // Crie uma coluna para as calorias
    const tdCalorias = document.createElement("td");
    tdCalorias.textContent = calorias;
    tr.appendChild(tdCalorias);

    // Adicione a linha à tabela
    tabela.appendChild(tr);
  });
}

// Função para gerar receitas
function gerarReceitas(entrada) {
  const apiKey = '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';
  const endpoint = 'https://api.openai.com/v1/chat/completions';

  // Defina o prompt que você deseja enviar
  const prompt = `fala no maximo 5 nomes de receitas que necessitem não muito mais que esses ingredientes (apenas o nome da receita) ${entrada}, (as receitas deven ser separadas por quebra de linha) e (logo na frentedo do nome suas calorias semarado por "-") a contagem de calorias deve ser para cada 100 gramas`;

  // Configuração da solicitação
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }]
    })
  };

  // Faça a solicitação POST para o endpoint
  fetch(endpoint, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      // A resposta do ChatGPT 'data.choices[0].message.content'
      const receitaGerada = data.choices[0].message.content;
      console.log('Resposta do ChatGPT:\n', data);

      // Chame a função exibirReceitasNaTabela 
      exibirReceitasNaTabela(receitaGerada);
    })
    .catch((error) => {
      console.error('Erro na solicitação:', error);
    });
}

// Event listener for the button click
const btnEntrada = document.getElementById("btnEntrada");
if (btnEntrada) {
  btnEntrada.addEventListener("click", function () {
    const entrada = document.getElementById("txtEntrada").value;
    console.log("Clique no botão");
    console.log("Entrada: " + entrada);
    // Call the function to generate recipes with the provided ingredients
    gerarReceitas(entrada);
  });
}
