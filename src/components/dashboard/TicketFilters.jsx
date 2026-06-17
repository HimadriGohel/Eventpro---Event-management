export default function TicketFilters({
  search,
  setSearch,
}) {
  return (
    <div
      style={{
        display: 'flex',
        gap: 16,
        marginBottom: 24,
      }}
    >
      <input
        placeholder="Search ticket..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        style={{
          flex: 1,
          height: 50,
          border: '1px solid #CBD5E1',
          borderRadius: 14,
          paddingInline: 16,
        }}
      />

      <select
        style={{
          width: 180,
          borderRadius: 14,
          border: '1px solid #CBD5E1',
        }}
      >
        <option>All Events</option>
      </select>
    </div>
  );
}