import { ReactElement, useEffect } from "react";
import PriceCell from "../Cell/PriceCell";
import { RowWrapper } from "./Row.styles";
import dayjs from 'dayjs'
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime)

export interface IRowProps {
  brandname: string;
  company_name: string;
  createdAt: string;
  displayname: string;
  location_id: string;
  pack_size: string;
  price: number;
  priceHistory: object;
  priceHistoryUpdatedAt: string;
  productName: string;
  product_id: string;
  promoPrice: number;
  promoPriceHistory: object;
  promoPriceHistoryUpdatedAt: string;
  quantityStatus: string;
  total_size: number;
  updatedAt: string;
  variation_name: string;
  variationid: string;
  _id: string;
  product_key_names: Array<string>;
  keyNames: Array<string>;
  valueNames: Array<string>;
  index: number;
}

type IRowWrapperProps = Omit<IRowProps, "promoPriceHistory" | "priceHistory">;

function RowComponent(props: IRowProps): ReactElement {
  const { keyNames, valueNames } = props;


  return (
    <tr>
      <RowWrapper>{props.index}</RowWrapper>
      {
        // display the value of the prop that matches the key name
        props.valueNames.map((valueName: string, index: number) => {
          // get the latest price history from the price history object where the key is the date and value is the price. Get the price and the date
          if (valueName === "price" || valueName === "promoPrice") {
            const [previous_date, previous_price] = Object.entries(
              props.priceHistory
            )[Object.entries(props.priceHistory).length - 1];

            const [previous_date_promo, previous_price_promo] = Object.entries(
              props.promoPriceHistory
            )[Object.entries(props.promoPriceHistory).length - 1];

 

            if (valueName === "price") {
              return (
                <PriceCell
                  key={index}
                  type={"price"}
                  price={props.price}
                  date={dayjs(props.priceHistoryUpdatedAt)}
                  previous_price={parseFloat(previous_price)}
                  previous_date={dayjs(Number(previous_date))}
                />
              );
            }

            if (valueName === "promoPrice") {
              return (
                <PriceCell
                  key={index}
                  type={"promoPrice"}
                  price={props.promoPrice}
                  date={dayjs(props.promoPriceHistoryUpdatedAt)}
                  previous_price={parseFloat(previous_price_promo)}
                  previous_date={dayjs(Number(previous_date_promo))}
                />
              );
            }
          }

          if(valueName==="pack_size"){
            return (
              <RowWrapper key={index}>
                {/* if pack_size is 0, then show 1 */}

                
                {props[valueName as keyof IRowWrapperProps]==='0'?1:props[valueName as keyof IRowWrapperProps]}
              </RowWrapper>
            );
          }

          return (
            <RowWrapper key={index}>
              {props[valueName as keyof IRowWrapperProps] || "N/A"}
            </RowWrapper>
          );
        })
      }
    </tr>
  );
}

export default RowComponent;
