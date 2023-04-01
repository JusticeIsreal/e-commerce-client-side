import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../../Firebase";

export async function getStaticPaths() {
  const colRef = collection(db, "banneritems");
  const snapshot = await getDocs(colRef);
  const paths = snapshot.docs.map((doc) => ({
    params: { bannerItemID: doc.id },
  }));

  return { paths, fallback: false };
}

export const getStaticProps = async ({ params }) => {
  const { bannerItemID } = params;
  const productDoc = doc(db, "banneritems", bannerItemID);
  const productSnapshot = await getDoc(productDoc);
  const productData = productSnapshot.data();

  // Convert timestamp to string
  productData.timestamp = productData.timestamp.toString();

  return {
    props: {
      product: productData,
    },
  };
};

function AdminProduct({ product }) {
  const router = useRouter();
  const { bannerItemID } = router.query;

  return (
    <div>
     
    </div>
  );
}

export default AdminProduct;
