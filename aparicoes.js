document.addEventListener('DOMContentLoaded', function() {
    let aparicoes = []; // Armazena os dados das aparições
    let paises = {}; // Armazena as aparições organizadas por país

    fetch('aparicoes.json')
      .then(response => response.json())
      .then(data => {
        aparicoes = data.Aparicoes;
        organizarPaises();
        exibirAparicoes(); // Exibe todas as aparições inicialmente
      })
      .catch(error => console.error('Erro ao carregar dados:', error));

    // Organiza as aparições por país
    function organizarPaises() {
        paises = {};
        aparicoes.forEach(aparição => {
            if (!paises[aparição.Pais]) {
                paises[aparição.Pais] = [];
            }
            paises[aparição.Pais].push(aparição);
        });
    }

    // Exibe as aparições na página
    function exibirAparicoes() {
        const listaDiv = document.getElementById('aparicoesLista');
        listaDiv.innerHTML = ''; // Limpa o conteúdo atual

        for (const pais in paises) {
            const section = document.createElement('div');
            section.classList.add('country-section');
            section.id = pais.toLowerCase().replace(/ /g, '-');
            const title = document.createElement('p');
            title.textContent = pais;
            title.className = 'country-section-title';
            section.appendChild(title);

            paises[pais].forEach(aparição => {
                const card = document.createElement('a');
                card.href = `detalhes.html?id=${aparição.id}`;
                card.classList.add('card');
                card.innerHTML = `
                  <div class="card-body">
                    <div class="card-body-left">
                      <div>
                        <p class="nomeAparicao">${aparição.Nome}</p>
                        <img src='${aparição.Imagem_aparicao}' class="imgPrincipalCards">
                      </div>
                    </div>
                    <div class="card-body-right">
                      <div class="paiTitle">
                        <div class="center-center" style="flex-direction: column!important; gap: 1.4vh">
                            <h5 class="card-title">${aparição.Cidade}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">${aparição.Ano}</h6>
                        </div>
                      </div>
                      <p class="card-text">${aparição.Descricao}</p>
                    </div>
                  </div>
                `;
                section.appendChild(card);
            });

            listaDiv.appendChild(section);
        }
    }

    // Filtra as aparições pelo nome
    function filtrarApariçãoPorNome(digitado) {
        digitado = digitado.toLowerCase(); // Normaliza a pesquisa
        const aparicoesFiltradas = aparicoes.filter(aparição => 
            aparição.Nome.toLowerCase().includes(digitado)
        );

        // Atualiza o conteúdo da página com base na pesquisa
        const listaDiv = document.getElementById('aparicoesLista');
        listaDiv.innerHTML = ''; // Limpa o conteúdo atual

        const paisesFiltrados = {};

        aparicoesFiltradas.forEach(aparição => {
            if (!paisesFiltrados[aparição.Pais]) {
                paisesFiltrados[aparição.Pais] = [];
            }
            paisesFiltrados[aparição.Pais].push(aparição);
        });

        for (const pais in paisesFiltrados) {
            const section = document.createElement('div');
            section.classList.add('country-section');
            section.id = pais.toLowerCase().replace(/ /g, '-');
            const title = document.createElement('p');
            title.textContent = pais;
            title.className = 'country-section-title';
            section.appendChild(title);

            paisesFiltrados[pais].forEach(aparição => {
                const card = document.createElement('a');
                card.href = `detalhes.html?id=${aparição.id}`;
                card.classList.add('card');
                card.innerHTML = `
                  <div class="card-body">
                    <div class="card-body-left">
                      <div>
                        <p class="nomeAparicao">${aparição.Nome}</p>
                        <img src='${aparição.Imagem_aparicao}' class="imgPrincipalCards">
                      </div>
                    </div>
                    <div class="card-body-right">
                      <div class="paiTitle">
                        <div class="center-center" style="flex-direction: column!important; gap: 1.4vh">
                            <h5 class="card-title">${aparição.Cidade}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">${aparição.Ano}</h6>
                        </div>
                      </div>
                      <p class="card-text">${aparição.Descricao}</p>
                    </div>
                  </div>
                `;
                section.appendChild(card);
            });

            listaDiv.appendChild(section);
        }
    }

    // Configura o evento de entrada no campo de pesquisa
    let timer;
    document.getElementById('search-input').addEventListener('input', (e) => {
        const digitado = e.target.value;
        clearTimeout(timer);
        timer = setTimeout(() => {
            filtrarApariçãoPorNome(digitado);
        }, 500);
    });
});
