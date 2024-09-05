function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}


fetch('aparicoes.json')
    .then(response => response.json())
    .then(data => {
        const id = getQueryParam('id');
        const aparicao = data.Aparicoes.find(a => a.id == id);
        if (aparicao) {
            const detalhesAparicao = document.getElementById('detalhesAparicao');
            detalhesAparicao.innerHTML = `
          <h4>${aparicao.Cidade}, ${aparicao.Pais}</h4>
          <h5>Ano: ${aparicao.Ano}</h5>
          <p>${aparicao.Descricao}</p>
          <p><b>Detalhes:</b> ${aparicao.Detalhes}</p>
          <img src='${aparicao.Imagem_aparicao}' width='300px' height='400px'">
        `;
        }
    })
    .catch(error => console.error('Erro ao carregar o JSON:', error));