import sortDisabled from "../../assets/sort-disabled.png";
import sortUp from "../../assets/sort-up.png";
import sortDown from "../../assets/sort-down.png";
import { SortArrowWrapper } from "./SortArrow.styles";

interface ISortArrowProps {
  order: string;
  sortBy: string;
  currentProperty: string;
}

function SortArrow(props: ISortArrowProps) {

	return (
		<SortArrowWrapper>
			{props.sortBy === props.currentProperty ? (
				props.order === "asc" ? (
					<img src={sortUp} alt="sort up" />
				) : (
					<img src={sortDown} alt="sort down" />
				)
			) : (
				<img src={sortDisabled} alt="sort disabled" />
			)}
		</SortArrowWrapper>
	);
}

export default SortArrow;
