import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { ReactElement, useEffect } from "react";
import LinkCell from "../Cell/LinkCell";
import PriceCell from "../Cell/PriceCell";
import { KeyRow, RowWrapper } from "./Row.styles";

dayjs.extend(relativeTime);

export interface IRowProps {
	brandname: string;
	companyName: string;
	createdAt: string;
	displayname: string;
	locationId: string;
	packSize: string;
	price: number;
	priceHistory: object;
	priceHistoryUpdatedAt: string;
	productName: string;
	product_id: string;
	promoPrice: number;
	promoPriceHistory: object;
	promoPriceHistoryUpdatedAt: string;
	quantityStatus: string;
	totalSize: number;
	updatedAt: string;
	variation_name: string;
	variationid: string;
	_id: string;
	productKeyNames: Array<string>;
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

		locationAddress,
		locationName,
	} = props;

	return (
		<tr>
			<KeyRow>{index}</KeyRow>
			{valueNames.map((valueName: string, ind: number) => {
				if (valueName === "price" || valueName === "promoPrice") {
					const previousPriceArray = Object.entries(priceHistory).length;
					const [previousDate, previousPrice] =
						Object.entries(priceHistory)[previousPriceArray - (previousPriceArray === 1 ? 1 : 2)];

					const previousPromoPriceArray = Object.entries(promoPriceHistory).length;

					const [previousDatePromo, previousPricePromo] =
						Object.entries(promoPriceHistory)[
							previousPromoPriceArray - (previousPromoPriceArray === 1 ? 1 : 2)
						];

					if (valueName === "price") {
						return (
							<PriceCell
								key={ind}
								type={"price"}
								price={price}
								date={dayjs(priceHistoryUpdatedAt)}
								previousPrice={parseFloat(previousPrice)}
								previousDate={dayjs(Number(previousDate))}
							/>
						);
					}

					if (valueName === "promoPrice") {
						return (
							<PriceCell
								key={ind}
								type={"promoPrice"}
								price={promoPrice}
								date={dayjs(promoPriceHistoryUpdatedAt)}
								previousPrice={parseFloat(previousPricePromo)}
								previousDate={dayjs(Number(previousDatePromo))}
							/>
						);
					}
				}

				if (valueName === "packSize") {
					return (
						<RowWrapper key={ind}>
							{/* if packSize is 0, then show 1 */}

							{props[valueName as keyof IRowWrapperProps] === "0"
								? 1
								: props[valueName as keyof IRowWrapperProps]}
						</RowWrapper>
					);
				}

				if (valueName === "locationId") {
					return (
						<RowWrapper key={`${index}-loc_id`}>
							<LinkCell href={linkToStore} text={locationAddress} />
						</RowWrapper>
					);
				}
				if (valueName === "companyName") {
					return (
						<RowWrapper key={`${index}-comp_name`}>
							<LinkCell
								href={linkToStore}
								text={`${props[valueName as keyof IRowWrapperProps]}-${locationName}`}
							/>
						</RowWrapper>
					);
				}

				if (valueName === "productName" || valueName === "variation_name") {
					return (
						<RowWrapper key={`${index}-${valueName === "productName" ? "prod_name" : "var_name"}`}>
							<LinkCell href={linkToProduct} text={props[valueName as keyof IRowWrapperProps]} />
						</RowWrapper>
					);
				}

				return (
					<RowWrapper key={ind}>{props[valueName as keyof IRowWrapperProps] || "N/A"}</RowWrapper>
				);
			})}
		</tr>
	);
}

export default RowComponent;
