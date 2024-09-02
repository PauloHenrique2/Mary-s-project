{
  "Aparicoes"[
    {"País":"Portugal", "Cidade":"Fátima","Ano":"1917","Descrição":"Em Fátima, Nossa Senhora aparece a três pastorinhos durante 5 meses no dia 13 de cada mês."}
  ]
  
  let text = '"{Aparicoes"[' +
    '{"Pais":"Portugal", "Cidade":"Fátima","Ano":"1917","Descricao":"Em Fátima, Nossa Senhora aparece a três pastorinhos durante 5 meses no dia 13 de cada mês."}'+
  ']}';
  
  const obj = JSON.parse(text)
}