import { ReactElement } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

interface IPriceCellProps {
  price: number;
  date: dayjs.Dayjs;
  previousPrice: number;
  previousDate: dayjs.Dayjs;
  type: string;
}

function PriceCell(props: IPriceCellProps): ReactElement {

	return (
		<td>
			<div className="price">
				<span className="price__current">${props.price.toFixed(2)}</span>
			</div>

			<div className="date">
				<span className="date__current">{dayjs(props.date).fromNow()}</span>
			</div>
			{props.price !== props.previousPrice ? (
				<>
					<div className="price-previous">
						<span className="price__previous">
              ${props.previousPrice.toFixed(2)}
						</span>
					</div>
					<div className="date-previous">
						<span className="date__previous">
							{dayjs(props.previousDate).fromNow()}
						</span>
					</div>
				</>
			) : null}
		</td>
	);
}

export default PriceCell;
