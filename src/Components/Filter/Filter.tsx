import { useEffect, useState } from "react";
import FilterModal from "./FilterModal";
import axios from "axios";

export interface IFilterKeys {
  brandname: Array<string>;
  company_name: Array<string>;
  locationAddress: Array<string>;
  locationName: Array<string>;
  location_id: Array<string>;
  pack_size: Array<string>;
  price: Array<string>;
  promoPrice: Array<string>;
  quantityStatus: Array<string>;
  total_size: Array<string>;
}

function Filter(props: any) {
  const {
    limit,
    page,
    sortBy,
    sortOrder,
    search,
    filters,
    setFilters,
    setFiltersApplied,
    filtersApplied,
    filterApply,
  } = props;

 

  const getFilters = async () => {
    const res = await axios.get(
      `https://data.nmpereira.com/api/products/filters?limit=${limit}&page=${page}&sortBy=${sortBy}&sortOrder=${sortOrder}${
        search === "" ? "" : `&search=${search}`
      }`
    );
    const { filters: filter_response } = await res.data;

    setFilters(filter_response);
  };

  const filterClick = async (e: any) => {
    // e.preventDefault();
 

    await getFilters();
  };

  return (
    <>
  
        <FilterModal
          title={"Filters"}
          body={filters}
          apply={"apply"}
          clear={"clear"}
          setFiltersApplied={setFiltersApplied}
          filtersApplied={filtersApplied}
          filterApply={filterApply}
        />


      <a
        href="#filters"
        onClick={async (e) => {
          filterClick(e);
        }}
      >
        Filter
      </a>
    </>
  );
}

export default Filter;
