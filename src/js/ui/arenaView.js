let onBuscarPokemon = null;
let onBatalhar = null;

function init(cb) {
  onBuscarPokemon = cb?.onBuscarPokemon || null;
  onBatalhar = cb?.onBatalhar || null;

  document.querySelector("#btn-batalhar")?.addEventListener("click", () => onBatalhar?.());
}

function renderShell() {
  const root = document.querySelector("#arena-root");
  if (!root) return;

  root.innerHTML = `
    ${zone("Treinador 1", ["player1", "player2"])}
    ${zone("Treinador 2", ["player3", "player4"])}
  `;

  root.addEventListener("submit", (e) => {
    e.preventDefault();

    const formEl = e.target;
    if (!(formEl instanceof HTMLFormElement)) return;

    const slot = formEl.getAttribute("data-slot");
    const consulta = (formEl.querySelector("input")?.value || "").trim();

    if (!slot || !consulta) return;
    onBuscarPokemon?.({ slot, consulta });
  });
}

function render(estado) {
  ["player1", "player2", "player3", "player4"].forEach((slot) => {
    const el = document.querySelector(`[data-slot-container="${slot}"]`);
    if (!el) return;

    const pokemon = estado?.players?.[slot];
    const erro = estado?.erros?.[slot];
    const carregando = estado?.carregando?.[slot];

    if (carregando) el.innerHTML = `<p>Carregando...</p>`;
    else if (erro) el.innerHTML = `<p class="slot-error">${erro}</p>`;
    else if (pokemon) el.innerHTML = card(pokemon);
    else el.innerHTML = form(slot);
  });
}

function renderBotaoBatalhar(ativo) {
  const btn = document.querySelector("#btn-batalhar");
  const hint = document.querySelector("#hint-batalha");
  if (!btn || !hint) return;

  btn.disabled = !ativo;
  btn.classList.toggle("is-visible", ativo);
  hint.textContent = ativo ? "Pronto. Clique em BATALHAR." : "Preencha os 4 slots para liberar a batalha.";
}

function toast({ mensagem, tipo }) {
  const el = document.querySelector("#toast");
  if (!el) return;

  el.classList.add("is-open");
  el.classList.toggle("toast--error", tipo === "erro");
  el.textContent = mensagem;

  clearTimeout(el.__t);
  el.__t = setTimeout(() => {
    el.classList.remove("is-open");
    el.classList.remove("toast--error");
    el.textContent = "";
  }, 2500);
}

function zone(nome, slots) {
  return `
    <section class="battle-zone" aria-label="${nome}">
      <h2 class="trainer-name">${nome}</h2>
      <div class="cards-container">
        ${slots.map((s) => `<div class="slot-wrapper" data-slot-container="${s}">${form(s)}</div>`).join("")}
      </div>
    </section>
  `;
}

function form(slot) {
  return `
    <form class="input-group" data-slot="${slot}">
      <input placeholder="pikachu / 25" aria-label="Buscar Pokémon" />
      <button class="btn-ui btn-ui--ok" type="submit">OK</button>
    </form>
  `;
}

function card(pokemon) {
  const nome = pokemon?.name || "desconhecido";
  const total = pokemon?.stats?.total ?? 0;

  return `
    <article class="card-final" aria-label="Pokémon selecionado">
      <h3>${nome}</h3>
      <img src="${pokemon?.sprite || ""}" alt="Sprite do Pokémon ${nome}" />
      <p>TOTAL ${total}</p>
    </article>
  `;
}

export const arenaView = { init, renderShell, render, renderBotaoBatalhar, toast };
