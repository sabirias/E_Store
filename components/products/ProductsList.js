import dbConnect from "../../lib/db/connect";
import Product from "../../lib/db/models/Product";
import ProductCard from "./ProductCard";

function buildQuery(searchParams) {
  const query = {};
  if (searchParams?.category) query.category = searchParams.category;
  if (searchParams?.minPrice || searchParams?.maxPrice) {
    query.price = {};
    if (searchParams.minPrice) query.price.$gte = Number(searchParams.minPrice);
    if (searchParams.maxPrice) query.price.$lte = Number(searchParams.maxPrice);
  }
  if (searchParams?.rating) {
    query["rating.average"] = { $gte: Number(searchParams.rating) };
  }
  return query;
}

export default async function ProductsList({ searchParams }) {
  await dbConnect();
  const query = buildQuery(searchParams);
  const products = await Product.find(query).lean();

  if (!products.length) {
    return (
      <div className="text-center text-gray-500 py-8">
        No products found for the selected filters.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}
