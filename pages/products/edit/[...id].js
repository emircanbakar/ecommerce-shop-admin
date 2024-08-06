import Product from "@/components/Product";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

export default function EditProduct() {
    const router = useRouter()
    const { id } = router.query;
    const [productInfo, setProductInfo] = useState(null)
    useEffect(() =>{
        if(!id){
            return
        }else{
            axios.get('/api/products?id=' +id )
            .then(response => setProductInfo(response.data))
        }
    }, [id])


    return (
    <>
      <div className="flex flex-col items-start gap-4 py-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-bold text-gray-900 sm:text-xl">Editing {productInfo?.title} </p>
        </div>
      </div>
      <hr class="h-px border-0 bg-gray-300" />
      <div className="my-10">
        {
            productInfo && (
                <Product {...productInfo} />
            )
        }
      </div>
    </>
  );
}
