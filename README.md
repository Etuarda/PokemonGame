````md
# 🎴 Pokémon Card Battle

Um jogo web inspirado nos **duelos de cartas colecionáveis dos anos 2000**, onde cada jogador seleciona cartas Pokémon e disputa uma batalha baseada em atributos extraídos da **PokéAPI**.

O objetivo do projeto é demonstrar **integração com API externa**, **arquitetura modular em JavaScript** e **organização do frontend em camadas**, simulando a estrutura utilizada em aplicações profissionais.

O sistema consome dados reais da API Pokémon, transforma esses dados em atributos de batalha e executa um **motor de comparação** para determinar o vencedor.

---

# 🎮 Demonstração

### Fluxo do jogo

1. O usuário seleciona dois Pokémon  
2. Cada Pokémon representa uma carta de batalha  
3. Os atributos são carregados da API  
4. O motor de batalha compara os valores  
5. O sistema determina o vencedor da rodada  

A lógica foi pensada para reproduzir a sensação dos **duelos de cartas clássicos**, onde cada carta possui atributos que determinam o resultado da disputa.

---

# 🎯 Objetivos do Projeto

Este projeto foi desenvolvido com foco em:

- Consumo de **API REST externa**
- Separação de responsabilidades no frontend
- Organização de código em **camadas**
- Estrutura escalável para aplicações JavaScript
- Simulação de lógica de **regra de negócio**
- Experiência interativa baseada em **dados dinâmicos**

Também foi pensado como um exercício de **arquitetura frontend profissional**, separando claramente:

- Interface
- Lógica de controle
- Serviços externos

---

# 🧱 Arquitetura Adotada

O projeto utiliza **arquitetura em camadas no frontend**, com separação explícita de responsabilidades, garantindo:

- Manutenibilidade
- Previsibilidade
- Organização profissional do código

## Camadas

### UI
Responsável por:

- Renderização
- Manipulação do DOM
- Eventos da interface

### Services
Responsável por:

- Comunicação com a **PokéAPI**
- Normalização dos dados recebidos

### Domain (Controller)
Responsável por:

- Regras de negócio
- Orquestração do fluxo de batalha

### State
Responsável por:

- Fonte única da verdade da aplicação

### Utils
Responsável por:

- Funções puras reutilizáveis
- Sem dependência de DOM

---

# 📁 Estrutura do Projeto

```txt
index.html

src/
 ├── css/
 │   ├── base.css
 │   ├── layout.css
 │   ├── components.css
 │   └── responsive.css
 │
 └── js/
     ├── controllers/
     │   └── battleController.js
     │
     ├── services/
     │   ├── pokeService.js
     │   └── typeService.js
     │
     ├── state/
     │   └── duelState.js
     │
     ├── ui/
     │   ├── arenaView.js
     │   └── modalView.js
     │
     └── main.js
````

---

# ⚖️ Regras de Arquitetura

Para manter o sistema previsível, algumas regras foram definidas:

1. **UI nunca importa services diretamente**
2. **Services nunca manipulam DOM**
3. **State não conhece a UI**

Essas regras evitam **acoplamento entre camadas**.

---

# 📦 Contrato Oficial de Dados

Nenhuma camada fora de `services/` pode consumir o retorno bruto da API.

Isso evita dependência direta do formato da API externa.

## Objeto Pokémon Normalizado

```json
{
  "id": number,
  "name": string,
  "sprite": string | null,
  "types": ["string"],
  "stats": {
    "total": number
  }
}
```

---

# 🧠 Estrutura do Estado

O **duelState** é a única fonte de verdade da aplicação.

```javascript
{
  players: {
    player1: Pokemon | null,
    player2: Pokemon | null,
    player3: Pokemon | null,
    player4: Pokemon | null
  },
  status: 'idle' | 'ready' | 'battling' | 'finished'
}
```

A interface apenas **reflete o estado atual**.

---

# 🧩 Divisão dos Mini-MVPs

| MVP | Responsável | Entrega            | Critério                   |
| --- | ----------- | ------------------ | -------------------------- |
| A   | Cael        | Arena + Layout     | Shell responsivo funcional |
| B   | Maxine      | Slot UI            | Estados idle/loading/error |
| C   | Samuel      | Integração PokéAPI | Dados normalizados         |
| D   | Jeferson    | Battle Engine      | Cálculo de score           |
| E   | Thayane     | Modal + Reset      | Reinício do estado         |

**Eduarda**

* Boilerplate do projeto
* Revisão técnica



# ✅ Definition of Done

O projeto é considerado completo quando:

* Fluxo completo funcional
  `4 Pokémon → batalha → reset`

* Código limpo sem logs

* Responsivo entre **360px e 1024px**

* Acessibilidade aplicada

  * Navegação por teclado
  * ARIA
  * VLibras

---

# 🚀 Como Executar

### 1️⃣ Clonar o repositório

```bash
git clone https://github.com/seu-usuario/pokemon-card-battle.git
```

### 2️⃣ Entrar na pasta

```bash
cd pokemon-card-battle
```

### 3️⃣ Instalar dependências

```bash
npm install
```

### 4️⃣ Executar servidor

```bash
node server.js
```

ou utilize **Live Server** no VSCode.

### 5️⃣ Abrir no navegador

```
http://localhost:3000
```

---

# 🔮 Melhorias Futuras

Possíveis evoluções do projeto:

* Sistema de pontuação por rodada
* Ranking de jogadores
* Animações de batalha
* Sistema de decks
* Persistência de partidas
* Multiplayer

---

# 📚 Aprendizados Técnicos

Durante o desenvolvimento foram praticados conceitos como:

* Consumo de **APIs REST**
* **Modularização em JavaScript**
* **Arquitetura em camadas**
* **Separação de responsabilidades**
* **Manipulação dinâmica do DOM**
* **Organização de estado da aplicação**

---

# 📌 Nota

Este projeto foi desenvolvido para **fins educacionais e demonstrativos**, com foco em boas práticas de arquitetura frontend.

```
```
