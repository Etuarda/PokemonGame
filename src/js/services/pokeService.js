const BASE_URL = "https://pokeapi.co/api/v2/pokemon";

async function getPokemon(consulta) {
  const termo = String(consulta || "").trim().toLowerCase();
  if (!termo) throw new Error("Digite o nome ou o ID do Pokémon.");

  const res = await fetch(`${BASE_URL}/${encodeURIComponent(termo)}`);
  if (res.status === 404) throw new Error("Pokémon não encontrado.");
  if (!res.ok) throw new Error("Erro ao buscar Pokémon.");

  return mapPokemon(await res.json());
}

function mapPokemon(dados) {
  const stats = Array.isArray(dados?.stats) ? dados.stats : [];
  const total = stats.reduce((acc, s) => acc + (s?.base_stat ?? 0), 0);

  const types = Array.isArray(dados?.types)
    ? dados.types.map((t) => t?.type?.name).filter(Boolean)
    : [];

  return {
    id: dados?.id ?? 0,
    name: dados?.name ?? "desconhecido",
    sprite: dados?.sprites?.front_default ?? null,
    types,
    stats: { total },
  };
}

export const pokeService = { getPokemon };
