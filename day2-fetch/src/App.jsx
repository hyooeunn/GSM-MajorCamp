import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const listRes = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=50",
        );
        const listData = await listRes.json();

        const pokemonDetails = await Promise.all(
          listData.results.map((pokemon) =>
            fetch(pokemon.url).then((res) => res.json()),
          ),
        );

        setPokemons(pokemonDetails);
      } catch (error) {
        console.error("포켓몬 정보를 불러오지 못했습니다.", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="app-shell">
      <header className="app-header">
        <p className="eyebrow">PokeDex</p>
        <h1>포켓몬 도감</h1>
        <p className="subtitle">귀여운 포켓몬 친구들을 한눈에 만나보세요.</p>
      </header>

      <div className="search-box">
        <label className="search-label" htmlFor="pokemon-search">
          포켓몬 이름 검색
        </label>
        <input
          id="pokemon-search"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="예: pikachu"
        />
      </div>

      {loading ? (
        <p className="status">포켓몬 정보를 불러오는 중...</p>
      ) : filteredPokemons.length === 0 ? (
        <p className="status">검색 결과가 없어요.</p>
      ) : (
        <section className="pokemon-grid">
          {filteredPokemons.map((pokemon) => {
            const imageUrl =
              pokemon.sprites.other?.["official-artwork"]?.front_default ||
              pokemon.sprites.front_default;
            const type = pokemon.types[0]?.type.name || "unknown";
            const displayName =
              pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

            return (
              <article key={pokemon.id} className="pokemon-card">
                <span className={`badge ${type}`}>{type}</span>
                <img src={imageUrl} alt={displayName} />
                <h2>{displayName}</h2>
                <p>#{String(pokemon.id).padStart(3, "0")}</p>
              </article>
            );
          })}
        </section>
      )}
    </div>
  );
}

export default App;
