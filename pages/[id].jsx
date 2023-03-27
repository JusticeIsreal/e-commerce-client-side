import React from "react";
import { useRouter } from "next/router";
function Details() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div>
      <h1>Product Details - {id}</h1>
    </div>
  );
}

export default Details;
