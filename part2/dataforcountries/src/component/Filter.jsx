const Filter = ({ filterQuery, handleFilterChange }) => {
    return (
        <form>
            <div>
                Find countries: <input value={filterQuery} onChange={handleFilterChange} />
            </div>
        </form>

    );
};

export default Filter;
