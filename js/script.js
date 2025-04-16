document.addEventListener("DOMContentLoaded", function () {
  // === GRÁFICO DE SIMILARIDADE (DOUGHNUT) ===
  const ctxSimilaridade = document.getElementById('graficoSimilaridade')?.getContext('2d');
  if (ctxSimilaridade) {
    new Chart(ctxSimilaridade, {
      type: 'doughnut',
      data: {
        labels: ['Similares', 'Não similares'],
        datasets: [{
          label: '95% Similaridade',
          data: [95, 5],
          backgroundColor: ['#123458', '#d4c9be'],
          borderWidth: 1
        }]
      },
      options: {
        cutout: '70%',
        plugins: {
          legend: { position: 'bottom' }
        }
      }
    });
  }

  // === GRÁFICO DE CASOS CONCLUÍDOS (BARRAS) ===
  const ctxCasos = document.getElementById('graficoCasos')?.getContext('2d');
  if (ctxCasos) {
    new Chart(ctxCasos, {
      type: 'bar',
      data: {
        labels: ['Concluídos', 'Não Concluídos'],
        datasets: [{
          label: 'Casos',
          data: [1, 5],
          backgroundColor: ['#4CAF50', '#FF6347'],
          borderColor: ['#388E3C', '#C62828'],
          borderWidth: 80
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          tooltip: { enabled: true }
        },
        scales: {
          x: { beginAtZero: true }
        }
      }
    });
  }

  // === DROPDOWN PERSONALIZADO ===
  window.toggleDropdown = function () {
    document.getElementById("dropdown").classList.toggle("active");
  };

  window.onclick = function (e) {
    if (!e.target.closest('.custom-dropdown')) {
      document.getElementById("dropdown").classList.remove("active");
    }
  };

  // === ADICIONAR EVIDÊNCIA (LOCAL) ===
  const inputEvidencia = document.getElementById("inputEvidencia");
  const listaEvidencias = document.getElementById("lista-evidencias");
  const mensagemDiv = document.getElementById("mensagem");
  const tabelaEvidenciasBody = document.querySelector("#tabelaEvidencias tbody");
  const evidenciasLocal = []; // Array para armazenar as evidências localmente

  inputEvidencia.addEventListener("change", function (event) {
    const files = event.target.files;
    if (files.length > 0) {
      mensagemDiv.style.display = "none"; // Esconde mensagens anteriores

      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = function(e) {
          // Adicionar informações do arquivo para exibição local
          evidenciasLocal.push({ name: file.name, dataUrl: e.target.result });

          // Atualizar a lista de evidências (dropdown)
          const link = document.createElement("a");
          link.textContent = file.name;
          listaEvidencias?.appendChild(link);
          listaEvidencias?.appendChild(document.createElement("br"));

          // Atualizar a tabela de evidências
          if (tabelaEvidenciasBody) {
            const tr = document.createElement("tr");
            const tdIndex = document.createElement("td");
            tdIndex.textContent = tabelaEvidenciasBody.rows.length + 1;
            const tdNome = document.createElement("td");
            tdNome.textContent = file.name;
            const tdLink = document.createElement("td");
            const downloadLink = document.createElement("a");
            downloadLink.href = e.target.result;
            downloadLink.download = file.name;
            downloadLink.textContent = "Download";
            tdLink.appendChild(downloadLink);
            tr.appendChild(tdIndex);
            tr.appendChild(tdNome);
            tr.appendChild(tdLink);
            tabelaEvidenciasBody.appendChild(tr);
          }
        };
        reader.readAsDataURL(file); // Ler o arquivo como Data URL

        // Exibir mensagem de sucesso (local)
        mensagemDiv.style.display = "block";
        mensagemDiv.style.color = "green";
        mensagemDiv.textContent = "Evidência adicionada localmente!";
      });

      // Resetar input
      event.target.value = '';
    }
  });

  // === SALVAR CASO (LOCAL - apenas simulação) ===
  window.salvarCaso = function () {
    alert("Caso salvo localmente" + evidenciasLocal.map(e => e.name).join(", "));
  };

  // === SALVAR DADOS DO CASO (LOCAL - simulação) ===
  document.getElementById('btn-salvar-caso').addEventListener('click', () => {
    const dados = {
      titulo: document.getElementById('titulo').value,
      codigo: document.getElementById('codigo').value,
      perito: document.getElementById('perito').value,
      status: document.getElementById('status').value,
      dataOcorrencia: document.getElementById('data-ocorrencia').value,
      dataEmissao: document.getElementById('data-emissao').value,
      local: document.getElementById('local').value,
      evidencias: evidenciasLocal.map(e => e.name) // Salvar apenas os nomes das evidências localmente
    };
    alert('Dados do caso salvos localmente:\n' + JSON.stringify(dados, null, 2));
    console.log('Dados do caso salvos localmente:', dados);
  });
});

