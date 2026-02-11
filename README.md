# Pokémon Game

Base pronta para o time desenvolver os **Mini‑MVPs** (HTML/CSS/JS) em paralelo, com arquitetura em camadas.

## Rodar local
- Abra `src/index.html` no navegador **ou**
- Use um servidor local (recomendado):
  - VS Code: Live Server
  - `python -m http.server` na raiz do projeto

## Camadas (contrato)
- `ui/`: DOM + render + eventos
- `services/`: PokeAPI + normalização (contrato obrigatório)
- `controllers/`: orquestra fluxos
- `state/`: fonte única da verdade
- `utils/`: funções puras

## Regras rápidas
- Nenhuma camada fora de `services/` consome retorno bruto da API.
- UI não mantém estado paralelo.
- PRs pequenos: 1 Mini‑MVP por PR.
- Acessibilidade + VLibras serão integrados por Eduarda ao final.

## Contribuição individual (até 400 caracteres)
- **Cael:** _[preencher]_
- **Maxine:** _[preencher]_
- **Samuel:** _[preencher]_
- **Jeferson:** _[preencher]_
- **Thayane:** _[preencher]_
- **Eduarda:** _[preencher]_
