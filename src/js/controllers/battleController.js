import { duelState } from "../state/duelState.js";
import { pokeService } from "../services/pokeService.js";

let ui = {};

/**
 * Controller orquestra state → services → UI.
 * Não renderiza HTML e não mantém estado paralelo.
 */
function init(deps) {
  ui = deps;
  syncUI();
}

async function handleBuscarPokemon({ slot, consulta }) {
  duelState.setCarregando(slot, true);
  duelState.setErro(slot, null);
  duelState.limparResultado();
  syncUI();

  try {
    duelState.setPokemon(slot, await pokeService.getPokemon(consulta));
  } catch (e) {
    duelState.setPokemon(slot, null);
    const msg = e?.message || "Erro inesperado.";
    duelState.setErro(slot, msg);
    ui.onToast?.({ mensagem: msg, tipo: "erro" });
  } finally {
    duelState.setCarregando(slot, false);
    duelState.setStatus(duelState.podeBatalhar() ? duelState.STATUS.READY : duelState.STATUS.IDLE);
    syncUI();
  }
}

function handleBatalhar() {
  if (!duelState.podeBatalhar()) return;

  const { players } = duelState.getEstado();
  const p1 = (players.player1?.stats?.total ?? 0) + (players.player2?.stats?.total ?? 0);
  const p2 = (players.player3?.stats?.total ?? 0) + (players.player4?.stats?.total ?? 0);

  duelState.setResultado({
    vencedor: p1 === p2 ? "empate" : p1 > p2 ? "jogador1" : "jogador2",
    pontos: { jogador1: p1, jogador2: p2 },
  });
  duelState.setStatus(duelState.STATUS.FINISHED);

  syncUI();
  ui.onAbrirModal?.(duelState.getEstado().resultado);
}

function handleResetarDuelo() {
  duelState.resetar();
  syncUI();
}

function syncUI() {
  const estado = duelState.getEstado();
  ui.onAtualizarUI?.(estado);
  ui.onAtualizarBotao?.(duelState.podeBatalhar());
}

export const battleController = {
  init,
  handleBuscarPokemon,
  handleBatalhar,
  handleResetarDuelo,
};
