import { arenaView } from "./ui/arenaView.js";
import { modalView } from "./ui/modalView.js";
import { battleController } from "./controllers/battleController.js";

arenaView.init({
  onBuscarPokemon: battleController.handleBuscarPokemon,
  onBatalhar: battleController.handleBatalhar,
});

modalView.init({
  onJogarNovamente: battleController.handleResetarDuelo,
});

battleController.init({
  onAtualizarUI: arenaView.render,
  onAbrirModal: modalView.open,
  onAtualizarBotao: arenaView.renderBotaoBatalhar,
  onToast: arenaView.toast,
});

arenaView.renderShell();
arenaView.renderBotaoBatalhar(false);
