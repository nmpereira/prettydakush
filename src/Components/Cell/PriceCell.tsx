import { ReactElement } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

interface IPriceCellProps {
  price: number;
  date: dayjs.Dayjs;
  previous_price: number;
  previous_date: dayjs.Dayjs;
  type: string;
}

function PriceCell(props: IPriceCellProps): ReactElement {
  if (props.price !== props.previous_price) {
    console.log("price changed", props.type, props.price, props.previous_price);
  }
  return (
    <td>
      <div className="price">
        <span className="price__current">${props.price.toFixed(2)}</span>
      </div>

      <div className="date">
        <span className="date__current">{dayjs(props.date).fromNow()}</span>
      </div>
      {props.price !== props.previous_price ? (
        <>
          <div className="price-previous">
            <span className="price__previous">
              ${props.previous_price.toFixed(2)}
            </span>
          </div>
          <div className="date-previous">
            <span className="date__previous">
              {dayjs(props.previous_date).fromNow()}
            </span>
          </div>
        </>
      ) : null}
    </td>
  );
}

export default PriceCell;
