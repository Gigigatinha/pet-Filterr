function PetCard({ pet }) {
    return (
        <div className="pet-card">
            <img src={pet.url} alt="Cachorro" />

            <h2>{pet.breeds?.[0]?.name || "Cachorro"}</h2>

            <p>
                {pet.breeds?.[0]?.temperament || "Um amigo especial!"}
            </p>
        </div>
    );
}

export default PetCard;