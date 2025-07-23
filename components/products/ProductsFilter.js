const categories = [
  { id: "electronics", name: "Electronics" },
  { id: "clothing", name: "Clothing" },
  { id: "books", name: "Books" },
  { id: "home-garden", name: "Home & Garden" },
];

export default function ProductsFilter({ searchParams }) {
  return (
    <form method="GET" action="/products" className="space-y-4">
      {/* Category Filter */}
      <div>
        <label className="block font-medium mb-1">Category</label>
        <select
          name="category"
          defaultValue={searchParams?.category || ""}
          className="w-full border rounded px-2 py-1"
        >
          <option value="">All</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
      {/* Price Range */}
      <div>
        <label className="block font-medium mb-1">Price Range</label>
        <div className="flex gap-2">
          <input
            type="number"
            name="minPrice"
            placeholder="Min"
            defaultValue={searchParams?.minPrice || ""}
            className="w-1/2 border rounded px-2 py-1"
          />
          <input
            type="number"
            name="maxPrice"
            placeholder="Max"
            defaultValue={searchParams?.maxPrice || ""}
            className="w-1/2 border rounded px-2 py-1"
          />
        </div>
      </div>
      {/* Rating */}
      <div>
        <label className="block font-medium mb-1">Min Rating</label>
        <select
          name="rating"
          defaultValue={searchParams?.rating || ""}
          className="w-full border rounded px-2 py-1"
        >
          <option value="">Any</option>
          <option value="4">4+ Stars</option>
          <option value="3">3+ Stars</option>
          <option value="2">2+ Stars</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Apply Filters
      </button>
    </form>
  );
}
