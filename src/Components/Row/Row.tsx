interface IRowProps {
  brandname?: string;
  company_name?: string;
  createdAt?: string;
  displayname?: string;
  location_id?: string;
  pack_size?: string;
  price?: number;
  priceHistory?: object;
  priceHistoryUpdatedAt?: string;
  productName?: string;
  product_id?: string;
  promoPrice?: number;
  promoPriceHistory?: object;
  promoPriceHistoryUpdatedAt?: string;
  quantityStatus?: string;
  total_size?: number;
  updatedAt?: string;
  variation_name?: string;
  variationid?: string;
  _id?: string;
}

function RowComponent(props: IRowProps) {
  return (
    <tr>
      <td className="px-4 py-2">{props.variation_name}</td>
      <td className="px-4 py-2">{props.brandname}</td>

      <td className="px-4 py-2">{props.company_name}</td>
      <td className="px-4 py-2">
        {props.priceHistoryUpdatedAt
          ? props.priceHistoryUpdatedAt
          : "No Price History"}
      </td>
      <td className="px-4 py-2">{props.price}</td>
      <td className="px-4 py-2">{props.location_id}</td>
      <td className="px-4 py-2">{props.displayname}</td>
      <td className="px-4 py-2">{props.promoPrice}</td>
      <td className="px-4 py-2">{props.promoPriceHistoryUpdatedAt}</td>

      <td className="px-4 py-2">{props.quantityStatus}</td>
    </tr>
  );
}

export default RowComponent;
