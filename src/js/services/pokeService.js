const BASE_URL = "https://pokeapi.co/api/v2/pokemon";

async function getPokemon(consulta) {
  const termo = String(consulta || "").trim().toLowerCase();
  if (!termo) throw new Error("Digite o nome ou o ID do Pokémon.");

  const res = await fetch(`${BASE_URL}/${encodeURIComponent(termo)}`);
  if (res.status === 404) throw new Error("Pokémon não encontrado.");
  if (!res.ok) throw new Error("Erro ao buscar Pokémon.");

  return res.json();
}

export const pokeService = { getPokemon };
