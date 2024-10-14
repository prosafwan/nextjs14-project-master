import React from 'react'
import { getProductData, getAllProductIds } from '../../../../../utils/api'
import Image from 'next/image';

// interface productType{
//    "id":number, 
//   "title": string,
//   "description" : string,
//   "price" : string,
//   "image":string
// }

export async function generateStaticParams() {
    const productIds = await getAllProductIds();  // Fetch product IDs from API
    return productIds;
  
    // return productIds.map((product:productType) => ({ id: product.id }));
}

const ProductPage = async ({params}:{params:{id:number}}) => {
  
  const product = await getProductData(params.id);

  // If no product is found, return a 404 page
  if (!product) {
    return <h1>404 - Product Not Found</h1>;
  }

    console.log(product)  
  return (
    <article>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <Image src={product.image} width={200} height={200} priority={true}  alt={product.title} />
    </article>
  )
}

export default ProductPage
