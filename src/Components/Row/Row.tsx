import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { ReactElement, useEffect } from "react";
import LinkCell from "../Cell/LinkCell";
import PriceCell from "../Cell/PriceCell";
import { KeyRow, RowWrapper } from "./Row.styles";

dayjs.extend(relativeTime);

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
  locationName: string;
  locationAddress: string;
  linkToStore: string;
  linkToProduct: string;
}

type IRowWrapperProps = Omit<IRowProps, "promoPriceHistory" | "priceHistory">;

function RowComponent(props: IRowProps): ReactElement {
  const {
    keyNames,
    valueNames,
    index,
    priceHistory,
    promoPriceHistory,
    price,
    priceHistoryUpdatedAt,
    promoPrice,
    promoPriceHistoryUpdatedAt,
    linkToStore,
    linkToProduct,
    company_name,
    locationAddress,
    locationName,
  } = props;

  return (
    <tr>
      <KeyRow>{index}</KeyRow>
      {valueNames.map((valueName: string, index: number) => {
        if (valueName === "price" || valueName === "promoPrice") {
          const previous_price_array = Object.entries(priceHistory).length;
          const [previous_date, previous_price] =
            Object.entries(priceHistory)[
              previous_price_array - (previous_price_array === 1 ? 1 : 2)
            ];

          const previous_promo_price_array =
            Object.entries(promoPriceHistory).length;

          const [previous_date_promo, previous_price_promo] =
            Object.entries(promoPriceHistory)[
              previous_promo_price_array -
                (previous_promo_price_array === 1 ? 1 : 2)
            ];

          if (valueName === "price") {
            return (
              <PriceCell
                key={index}
                type={"price"}
                price={price}
                date={dayjs(priceHistoryUpdatedAt)}
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
                price={promoPrice}
                date={dayjs(promoPriceHistoryUpdatedAt)}
                previous_price={parseFloat(previous_price_promo)}
                previous_date={dayjs(Number(previous_date_promo))}
              />
            );
          }
        }

        if (valueName === "pack_size") {
          return (
            <RowWrapper key={index}>
              {/* if pack_size is 0, then show 1 */}

              {props[valueName as keyof IRowWrapperProps] === "0"
                ? 1
                : props[valueName as keyof IRowWrapperProps]}
            </RowWrapper>
          );
        }


        if (valueName === "location_id") {
          return (
            <>
              <LinkCell key={index} href={linkToStore} text={locationAddress} />
            </>
          );
        }
        if (valueName === "company_name") {
          return (
            <>
              <LinkCell key={index} href={linkToStore} text={`${props[valueName as keyof IRowWrapperProps]}-${locationName}`} />
            </>
          );
        }

        if (valueName === "productName" || valueName === "variation_name") {
          return (
            <>
              <LinkCell
                key={index}
                href={linkToProduct}
                text={props[valueName as keyof IRowWrapperProps]}
              />
            </>
          );
        }

        return (
          <RowWrapper key={index}>
            {props[valueName as keyof IRowWrapperProps] || "N/A"}
          </RowWrapper>
        );
      })}
    </tr>
  );
}

export default RowComponent;
