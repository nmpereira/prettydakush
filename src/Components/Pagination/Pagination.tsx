import { ReactElement, useState, MouseEvent } from "react";
import { Page } from "./Pagination.styles";
import ReactPaginate from "react-paginate";
import { IRowProps } from "../Row/Row";

interface IPaginationProps {
  limit: number;
  page: number;
  setPage: (page: number) => void;
  total_pages: number;
  total_products: number;
}

function Pagination(props: IPaginationProps): ReactElement {
  const page_limit = Number(props.limit);
  const total_count = Number(props.total_products);

  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + page_limit;

  const pageCount = Math.ceil(total_count / page_limit)||0;

  const handlePageClick = (event: { selected: number }) => {
    props.setPage(event.selected + 1);
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
