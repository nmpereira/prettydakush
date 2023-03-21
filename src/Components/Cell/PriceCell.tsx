import { ReactElement } from "react";
import * as dayjs from "dayjs";
import * as relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

interface IPriceCellProps {
  price: number;
  date: dayjs.Dayjs;
  previous_price: number;
  previous_date: dayjs.Dayjs;
  type: string;
}

function PriceCell(props: IPriceCellProps): ReactElement {



  return (
    <td>
      <div className="price">
        <span className="price__current">${props.price}</span>
      </div>

      <div className="date">
        <span className="date__current">{dayjs(props.date).fromNow()}</span>
      </div>
      <div className="price-previous">
        <span className="price__previous">${props.previous_price}</span>
      </div>
      <div className="date-previous">
        <span className="date__previous">
          {dayjs(props.previous_date).fromNow()}
        </span>
      </div>
    </td>
  );
}

export default PriceCell;
