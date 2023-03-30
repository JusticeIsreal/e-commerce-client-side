import React from "react";
import { useRouter } from "next/router";
function Details() {
  const router = useRouter();
  const { productID } = router.query;
  console.log(router);
  return (
    <div>
      <h1>Product Details - {productID}</h1>
      client
    </div>
  );
}

export default Details;
