const products = [
  { id: 1, name: "Wireless Headphone", price: 2500 },
  { id: 2, name: "Smart Watch", price: 4500 },
  { id: 3, name: "Gaming Mouse", price: 1500 },
  { id: 4, name: "Laptop Backpack", price: 3200 },
];

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      
      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-8 text-center">
        🛒 Our Shop
      </h1>

      {/* Product Grid */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition p-6 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-lg font-semibold">
                {product.name}
              </h2>
              <p className="text-indigo-600 font-bold mt-2">
                ৳ {product.price}
              </p>
            </div>

            <button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition">
              Add to Cart
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}
