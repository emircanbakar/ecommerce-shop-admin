import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";
import Spinner from "./Spinner";
import { ReactSortable } from "react-sortablejs";

export default function Product({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
  images: existingImages,
}) {
  const [redirect, setRedirect] = useState(false);
  const router = useRouter();

  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [price, setPrice] = useState(existingPrice || "");
  const [images, setImages] = useState(existingImages || []);
  const [isUploading, setIsUploading] = useState(false);

  const uploadImageQueue = [];
  async function createProduct(e) {
    e.preventDefault();

    if (isUploading) {
      await Promise.all(uploadImageQueue);
    }

    const data = { title, description, price, images };
    if (_id) {
      await axios.put("/api/products", { ...data, _id });
    } else {
      await axios.post("/api/products", data);
    }

    setRedirect(true);
  }

  async function uploadImages(e) {
    const files = e.target.files;
    if (files.length > 0) {
      setIsUploading(true);
      for (const file of files) {
        const data = new FormData();
        data.append("file", file);

        uploadImageQueue.push(
          axios.post("/api/upload", data).then((res) => {
            setImages((oldImages) => [...oldImages, ...res.data.links]);
          })
        );
      }

      await Promise.all(uploadImageQueue);
      setIsUploading(false);
    } else {
      return "An error ocurred";
    }
  }

  if (redirect) {
    router.push("/products");
    return null;
  }

  function updateImagesOrder(Images) {
    setImages(Images);
  }

  function handleDeleteImage(index) {
    const updateImages = [...images];
    updateImages.splice(index, 1);
    setImages(updateImages);
  }

  return (
    <form onSubmit={createProduct} className="mx-auto max-w-screen-sm">
      <div className="mx-auto p-4">
        <div>
          <label
            for="example1"
            className="mb-1 block text-md font-medium text-gray-700 py-2  "
          >
            Title
          </label>
          <input
            type="text"
            id="example1"
            className="block w-full p-2  rounded-md border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
            placeholder="Product title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
      </div>
      <div className="mx-auto p-4">
        <div>
          <label
            for="example1"
            className="mb-1 block text-md font-medium text-gray-700 py-2"
          >
            Category
          </label>
          <select className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500">
            <option value="">No category selected</option>
            <option value="">Option02</option>
            <option value="">Option03</option>
          </select>
        </div>
      </div>

      <div className="mx-auto p-4">
        <div className="mx-auto">
          <label className="mb-1 block text-md font-medium text-gray-700 py-2">
            Images
          </label>
          <label class="flex w-full cursor-pointer appearance-none items-center justify-center rounded-md border-2 border-dashed border-gray-200 p-6 transition-all hover:border-primary-300">
            <div class="space-y-1 text-center">
              <div class="mx-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="h-6 w-6 text-gray-500"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                  />
                </svg>
              </div>
              <div className="text-gray-600">
                <a
                  href="#"
                  className="font-medium text-primary-500 hover:text-primary-700"
                >
                  Click to upload
                </a>{" "}
                or drag and drop
              </div>
              <p className="text-sm text-gray-500">
                SVG, PNG, JPG or GIF (max. 800x400px)
              </p>
            </div>
            <input type="file" className="sr-only" onChange={uploadImages} />
          </label>
        </div>

        <div className="grid grid-cols-2 items-center rounded">
          {isUploading && (
            <Spinner className="p-4 absolute top-1/2 left-1/2 transform-translate-x-1/2 -translate-y-1/2" />
          )}
        </div>

        {!isUploading && (
          <div className="grid grid-cols-2 gap-4">
            <ReactSortable
              list={Array.isArray(images) ? images : []}
              setList={updateImagesOrder}
              animation={200}
              className="grid grid-cols-2 gap-4"
            >
              {Array.isArray(images) &&
                images.map((link, index) => (
                  <div key={link} className="relative group">
                    <img
                      src={link}
                      alt="image"
                      className="object-cover h-32 w-44 p-2 rounded-md"
                    />
                    <div className="absolute top-2 right-2 cursor-pointer transition-opacity group-hover:opacity-100 opacity-0">
                      <button
                        onClick={() => handleDeleteImage(index)}
                        className="p-2 text-center bg-transparent font-bold"
                      >
                        X
                      </button>
                    </div>
                  </div>
                ))}
            </ReactSortable>
          </div>
        )}
      </div>

      <div className="mx-auto p-4">
        <div>
          <label className="mb-1 block text-md font-medium text-gray-700 py-2">
            Description
          </label>
          <textarea
            type="text"
            rows={4}
            className="block w-full p-2  rounded-md border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
            placeholder="Product description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>
      <div class="mx-auto p-4">
        <div>
          <label className="mb-1 block text-md font-medium text-gray-700 py-2">
            Price
          </label>
          <input
            type="number"
            className="block w-full p-2  rounded-md border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
            placeholder="Product price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
      </div>

      <div className="mx-auto p-4 flex justify-center">
        <button
          className="inline-block rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
          type="submit"
        >
          Save Product
        </button>
      </div>
    </form>
  );
}
