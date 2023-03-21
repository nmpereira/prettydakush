import RowComponent from "../Row/Row";
import { ReactElement, useEffect, useState } from "react";
import axios from "axios";
import TableHeader from "../TableHeader/TableHeader";

function Table():ReactElement {
  // call api to get data
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    // axios get with error handling
    await axios

      .get("https://data.nmpereira.com/api/products/all?limit=50")
      .then((response) => {
        setProducts(response.data.products);
        // console.log(response.data.products);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const product_key_names = {
    // 'ID': "_id",
    "Company Name": "company_name",
    "Location ID": "location_id",
    "Brandname": "brandname",
    "Variation Name": "variation_name",
    // "Display Name": "displayname",
    // "Product ID": "product_id",
    // "Variation ID": "variationid",
    "Total Size": "total_size",
    "Pack Size": "pack_size",
    "Price": "price",
    // "Quantity Status": "quantityStatus",
    "Promo Price": "promoPrice",
    "Product Name": "productName",
    // "Price Last Updated": "priceHistoryUpdatedAt",
    // "Promo Price Last Updated": "promoPriceHistoryUpdatedAt",
    // "Document Last Updated": "updatedAt",
    // "Document Created At": "createdAt",
  };

  const keyNames = Object.keys(product_key_names);
  const valueNames = Object.values(product_key_names);



  return (
    <table className="table w-full">
      <TableHeader
            keyNames={...keyNames}

      />

      <tbody className="overflow-auto">
        {products.map((product, index) => (
          <RowComponent
            key={product._id}
            index={index+1}
            {...product}
            keyNames={...keyNames}
            valueNames={...valueNames}
            product_key_names={product_key_names}
          />
        ))}
      </tbody>
    </table>
  );
}

export default Table;
