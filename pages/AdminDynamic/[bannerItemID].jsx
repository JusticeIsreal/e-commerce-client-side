import React from "react";
import { useRouter } from "next/router";
function AdminProduct() {
  const router = useRouter();
  const { bannerItemID } = router.query;
  return (
    <div>
      <h1>banner Details - {bannerItemID}</h1>
    </div>
  );
}

export default AdminProduct;
