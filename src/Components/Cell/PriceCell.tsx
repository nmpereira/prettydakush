import { ReactElement } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Tooltip as ReactTooltip } from "react-tooltip";
import ReactDOMServer from "react-dom/server";

dayjs.extend(relativeTime);

interface IPriceCellProps {
  price: number;
  date: dayjs.Dayjs;
  previous_price: number;
  previous_date: dayjs.Dayjs;
  type: string;
  ath: number;
  atl: number;
  dateAth: string|undefined;
  dateAtl: string|undefined;
}

function PriceCell(props: IPriceCellProps): ReactElement {
  const {
    price,
    date,
    previous_price,
    previous_date,
    atl,
    ath,
    dateAth,
    dateAtl,
  } = props;

  return (
    <td>
      <div className="price">
        <ReactTooltip id="my-tooltip" />
        <span
          className="price__current"
          data-tooltip-id="my-tooltip"
          data-tooltip-html={ReactDOMServer.renderToStaticMarkup(
            <>
              <span>
                ATH: ${Number(ath).toFixed(2)} (
                {dayjs(Number(dateAth)).fromNow()})
              </span>
              <br />
              <span>
                ATL: ${Number(atl).toFixed(2)} (
                {dayjs(Number(dateAtl)).fromNow()})
              </span>
            </>
          )}
        >
          ${price.toFixed(2)}
        </span>
      </div>

      <div className="date">
        <span className="date__current">{dayjs(date).fromNow()}</span>
      </div>
      {price !== previous_price ? (
        <>
          <div className="price-previous">
            <span className="price__previous">
              ${previous_price.toFixed(2)}
            </span>
          </div>
          <div className="date-previous">
            <span className="date__previous">
              {dayjs(previous_date).fromNow()}
            </span>
          </div>
        </>
      ) : null}
    </td>
  );
}

export default PriceCell;
