import RowComponent from "../Row/Row";
import { useEffect, useState } from "react";
import axios from "axios";

function Table() {
  // call api to get data
  const [products, setProducts] = useState<any[]>([])

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    // axios get with error handling
     await axios

      .get("https://data.nmpereira.com/api/products/all?limit=1000")
      .then((response) => {
        setProducts(response.data.products);
        // console.log(response.data.products);
      })
      .catch((error) => {
        console.log(error);
      });

  
  };

  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Variation Name</th>
            <th className="border px-4 py-2">Brand Name</th>
            <th className="border px-4 py-2">Company</th>
            <th className="border px-4 py-2">Price last updated at</th>
            <th className="border px-4 py-2">Price</th>
            <th className="border px-4 py-2">Store #</th>
            <th className="border px-4 py-2">Display Name</th>
            <th className="border px-4 py-2">Promo Price</th>
            <th className="border px-4 py-2">Promo Price last updated at</th>
            <th className="border px-4 py-2">Quantity Status</th>
          </tr>
        </thead>


        <tbody>
            {products.map((product) => 
            <RowComponent
                key={product._id}
                {...product}/>   
            )}

     
        </tbody>
      </table>
    </div>
  );
}

export default Table;
