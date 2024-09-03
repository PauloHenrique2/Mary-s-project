
document.addEventListener('DOMContentLoaded', function() {
    fetch('aparicoes.json')
      .then(response => response.json())
      .then(data => {
        const aparicoes = data.Aparicoes;
        const listaDiv = document.getElementById('aparicoesLista');
        const paises = {};

        aparicoes.forEach(aparição => {
          if (!paises[aparição.Pais]) {
            paises[aparição.Pais] = [];
          }
          paises[aparição.Pais].push(aparição);
        });

        for (const pais in paises) {
          const section = document.createElement('div');
          section.classList.add('country-section');
          section.id = pais.toLowerCase().replace(/ /g, '-');
          const title = document.createElement('p');
          title.textContent = pais;
          title.className = ('country-section-title')
          section.appendChild(title);

          paises[pais].forEach(aparição => {
            const card = document.createElement('a');
            card.href = `detalhes.html?id=${aparição.id}`;
            card.classList.add('card');
            card.innerHTML = `
              <div class="card-body">
              <div class="paiTitle">
                <div class="center-center">
                      <h5 class="card-title">${aparição.Cidade}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${aparição.Ano}</h6>
                </div>
              </div>
                <p class="card-text">${aparição.Descricao}</p>
              </div>
            `;
            section.appendChild(card);
          });

          listaDiv.appendChild(section);
        }
      })
      .catch(error => console.error('Erro ao carregar dados:', error));
  });