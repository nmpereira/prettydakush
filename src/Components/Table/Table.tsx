import RowComponent from "../Row/Row";
import { ReactElement, useEffect, useState } from "react";
import axios from "axios";
import TableHeader from "../TableHeader/TableHeader";
import Pagination from "../Pagination/Pagination";
import { StyledTable } from "./Table.styles";

function Table(): ReactElement {
  // call api to get data
  const [products, setProducts] = useState<any[]>([]);
  const [limit, setLimit] = useState<number>(50);
  const [sortBy, setSortBy] = useState<string>("price");
  const [sortOrder, setSortOrder] = useState<string>("asc");
  const [page, setPage] = useState<number>(1);
  const [metadata, setMetadata] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    getData();
  }, [page]);

  const getData = async () => {
    setLoading(true);
    await axios

      .get(
        `https://data.nmpereira.com/api/products/all?limit=${limit}&page=${page}&sortBy=${sortBy}&sortOrder=${sortOrder}`
      )
      .then((response) => {
        setProducts(response.data.products);
        setMetadata(response.data.msg);
     setLoading(false)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const product_key_names = {
    // 'ID': "_id",
    "Company Name": "company_name",
    "Location ID": "location_id",
    Brandname: "brandname",
    "Variation Name": "variation_name",
    // "Display Name": "displayname",
    // "Product ID": "product_id",
    // "Variation ID": "variationid",
    "Total Size": "total_size",
    "Pack Size": "pack_size",
    Price: "price",
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
    <>
      <StyledTable className="table w-full">
        <TableHeader keyNames={...keyNames} />

        <tbody className="overflow-auto">
          {products.map((product, index) => (
            <RowComponent
              key={product._id}
              index={index + 1}
              {...product}
              keyNames={...keyNames}
              valueNames={...valueNames}
              product_key_names={product_key_names}
            />
          ))}
        </tbody>
      </StyledTable>
      <Pagination
        limit={metadata.limit}
        page={metadata.page}
        setPage={setPage}
        total_pages={metadata.total_pages}
        total_products={metadata.sizeBeforeFilter}
      />
    </>
  );
}

export default Table;
