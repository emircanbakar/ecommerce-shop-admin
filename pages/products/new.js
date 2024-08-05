import Product from "../../components/Product"

export default function New() {
  return (
    <>
      <div className="flex flex-col items-start gap-4 py-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-bold text-gray-900 sm:text-xl">Create Product</p>
        </div>
      </div>
      <hr class="h-px border-0 bg-gray-300" />
      <div className="my-10">
        <Product/>
      </div>
    </>
  );
}
