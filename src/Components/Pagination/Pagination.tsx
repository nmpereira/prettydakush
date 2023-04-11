import { ReactElement, useState, MouseEvent } from "react";
import { Page } from "./Pagination.styles";
import ReactPaginate from "react-paginate";
import { IRowProps } from "../Row/Row";

interface IPaginationProps {
	limit: number;
	page: number;
	setPage: (page: number) => void;
	total_pages: number;
	totalProducts: number;
	loading: boolean;
}

function Pagination(props: IPaginationProps): ReactElement {
	const { loading, limit, totalProducts, setPage } = props;
	const pageLimit = Number(limit);
	const totalCount = Number(totalProducts);

	const [itemOffset, setItemOffset] = useState(0);

	const endOffset = itemOffset + pageLimit;

	const pageCount = Math.ceil(totalCount / pageLimit) || 0;

	const handlePageClick = (event: { selected: number }) => {
		setPage(event.selected + 1);
	};

	return (
		<>
			<ReactPaginate
				breakLabel=". . . . ."
				nextLabel="next >"
				containerClassName={"btn-group"}
				// activeClassName={"btn-active"}
				activeLinkClassName={"btn-active link-primary"}
				pageLinkClassName={"btn"}
				onPageChange={handlePageClick}
				pageRangeDisplayed={4}
				pageCount={pageCount}
				previousLabel="< previous"
				previousClassName={"btn"}
				nextClassName={"btn"}
				breakClassName={"btn-disabled"}
				breakLinkClassName={"btn-disabled items-center flex"}
				// initialPage={0}
			/>
		</>
	);
}

export default Pagination;
