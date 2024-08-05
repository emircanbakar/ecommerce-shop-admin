import Link from "next/link";

export default function Products() {
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
    </>
  );
}
