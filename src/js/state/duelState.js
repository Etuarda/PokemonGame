/**
 * Fonte única da verdade.
 * A UI lê e renderiza; não mantém estado paralelo.
 */
const STATUS = Object.freeze({
  IDLE: "idle",
  READY: "ready",
  BATTLING: "battling",
  FINISHED: "finished",
});

const SLOTS = Object.freeze(["player1", "player2", "player3", "player4"]);

const buildSlotsObj = (valor) =>
  SLOTS.reduce((acc, slot) => {
    acc[slot] = valor;
    return acc;
  }, {});

const estadoInicial = () => ({
  players: buildSlotsObj(null),
  status: STATUS.IDLE,
  erros: buildSlotsObj(null),
  carregando: buildSlotsObj(false),
  resultado: null,
});

let estado = estadoInicial();

function getEstado() {
  return JSON.parse(JSON.stringify(estado));
}

function setStatus(novoStatus) {
  estado.status = novoStatus;
}

function setCarregando(slot, valor) {
  estado.carregando[slot] = Boolean(valor);
}

function setErro(slot, mensagem) {
  estado.erros[slot] = mensagem || null;
}

function setPokemon(slot, pokemonNormalizado) {
  estado.players[slot] = pokemonNormalizado;
}

function setResultado(resultado) {
  estado.resultado = resultado;
}

function limparResultado() {
  estado.resultado = null;
}

function resetar() {
  estado = estadoInicial();
}

function podeBatalhar() {
  return SLOTS.every((slot) => Boolean(estado.players[slot]));
}

export const duelState = {
  STATUS,
  getEstado,
  setStatus,
  setCarregando,
  setErro,
  setPokemon,
  setResultado,
  limparResultado,
  resetar,
  podeBatalhar,
};
