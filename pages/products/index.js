import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const formatPrice = (price) =>{
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios.get("/api/products").then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <header className="bg-white">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-6 lg:px-8">
          <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                All Products
              </h1>
            </div>

            <div className="flex items-center gap-4 mt-4">
              <Link
                className="inline-flex items-center justify-center gap-1.5 rounded border border-blue-200 bg-white px-5 py-3 text-blue-900 transition hover:text-blue-700 focus:outline-none focus:ring"
                href={"/products/new"}
              >
                <span className="text-sm font-medium"> Create Product</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <hr class="my-2 h-px border-0 bg-gray-300" />

      <div className="mx-auto max-w-screen-2xl px-4 py-6 sm:px-6 sm:py-12 lg:px-8">
        {products.length === 0 ? (
          <p>no products found.</p>
        ) : (
          <div className="">
            <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-4 font-medium text-gray-900"
                  >
                    State
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-medium text-gray-900"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-medium text-gray-900"
                  >
                    Description
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-medium text-gray-900"
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-medium text-gray-900"
                  ></th>
                </tr>
              </thead>
              {products.map((product, index) => (
                <tbody
                  className="divide-y divide-gray-100 border-t border-gray-100"
                  key={product._id}
                >
                  <tr>
                    <th className="px-6 py-4 font-medium text-gray-900">
                      {index + 1}
                    </th>
                    <td className="px-6 py-4">{product.title} </td>
                    <td className="px-6 py-4 max-w-xs">
                      {product.description}
                    </td>
                    <td className="px-6 py-4">{formatPrice(product.price)} </td>
                    <td className="flex justify-end gap-4 px-6 py-4 font-medium">
                      <Link href="" className=" text-red-600">
                        Delete
                      </Link>
                      <Link href={'/products/edit/' + product._id} className="text-yellow-400">
                        Edit
                      </Link>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        )}
      </div>
    </>
  );
}
