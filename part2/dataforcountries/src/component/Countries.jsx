const Countries = ({ countries, handleShowClick }) => {
    return (
        <div>
            {countries.map(country => (
                <div key={country.name.common}>
                    {country.name.common}
                    <button onClick={() => handleShowClick(country.name.common)}>Show</button>
                </div>
            ))}
        </div>
    );
};

export default Countries;