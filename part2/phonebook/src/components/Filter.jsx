const Filter = ({ filterQuery, handleFilterChange }) => {
    return (
        <form>
            <div>
                filter shown with: <input value={filterQuery} onChange={handleFilterChange} />
            </div>
        </form>
    );
}

export default Filter;