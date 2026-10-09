function SearchBar({ value, onChange }) {
  return (
    <div className="input-group mb-4">
      <span className="input-group-text">
        🔍
      </span>

      <input
        type="text"
        className="form-control"
        placeholder="Search company or symbol..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;