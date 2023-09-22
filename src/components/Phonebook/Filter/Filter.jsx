export const Filter = ({ filterForm, filter }) => {
  return (
    <div>
      <input type="text" name="filter" value={filter} onChange={filterForm} />
    </div>
  );
};
