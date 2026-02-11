import { arenaView } from "./ui/arenaView.js";
import { modalView } from "./ui/modalView.js";
import { battleController } from "./controllers/battleController.js";

/**
 * Entry point da aplicação.
 * Centraliza o wiring entre UI e Controller.
 */
function iniciarApp() {
  arenaView.init({
    onBuscarPokemon: battleController.handleBuscarPokemon,
  });

  modalView.init({
    onJogarNovamente: battleController.handleResetarDuelo,
    onFechar: battleController.handleFecharModal,
  });

  battleController.init({
    onAtualizarUI: arenaView.render,
    onAbrirModal: modalView.open,
    onAtualizarBotao: arenaView.renderBotaoBatalhar,
    onToast: arenaView.toast,
  });

  arenaView.renderShell();
  arenaView.renderBotaoBatalhar(false);
}

iniciarApp();
