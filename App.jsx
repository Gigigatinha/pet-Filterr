
import { useState, useEffect } from "react";
import api from "./services/api";
import PetCard from "./components/PetCard";
import "./App.css";

function App() {
    const [pets, setPets] = useState([]);
    const [busca, setBusca] = useState("");
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");

    useEffect(() => {
        async function buscarPets() {
            try {
                const resposta = await api.get("/images/search", {
                    params: {
                        limit: 12,
                        has_breeds: 1
                    }
                });

                setPets(resposta.data);
            } catch (error) {
                console.log(error);
                setErro("Não foi possível carregar os pets.");
            } finally {
                setCarregando(false);
            }
        }

        buscarPets();
    }, []);

   const petsFiltrados = pets.filter((pet) => {
    const nome = pet.breeds?.[0]?.name || "";
    return nome.toLowerCase().includes(busca.toLowerCase());
});

    return (
        <div className="container">

            <header>
                <h1>Pet<span>Finder.</span></h1>
                <p>Encontre seu novo melhor amigo!</p>
            </header>

            <section className="banner">
                <h2>Um novo amigo está esperando por você.</h2>
                <p>Conheça diferentes raças de cães!</p>

                <input
                    type="text"
                    placeholder="Pesquisar por raça..."
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                />
            </section>

            <h2 className="titulo">Conheça nossos pets</h2>

            {carregando && <p>Carregando pets...</p>}

            {erro && <p className="erro">{erro}</p>}

            {!carregando && !erro && (
                <div className="pet-list">
                    {petsFiltrados.map((pet) => (
                        <PetCard key={pet.id} pet={pet} />
                    ))}

                    {petsFiltrados.length === 0 && (
                        <p>Nenhum pet encontrado.</p>
                    )}
                </div>
            )}

        </div>
    );
}

export default App;
