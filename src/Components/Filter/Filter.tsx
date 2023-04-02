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
  promo_price: Array<string>;
  quantityStatus: Array<string>;
  total_size: Array<string>;
}

function Filter(props: any) {
  const { limit, page, sortBy, sortOrder, search } = props;

  const [filters, setFilters] = useState<IFilterKeys>({
    brandname: [],
    company_name: [],
    locationAddress: [],
    locationName: [],
    location_id: [],
    pack_size: [],
    price: [],
    promo_price: [],
    quantityStatus: [],
    total_size: [],
  });

  const [filterApply, setFilterApply] = useState<IFilterKeys>({
    brandname: [],
    company_name: [],
    locationAddress: [],
    locationName: [],
    location_id: [],
    pack_size: [],
    price: [],
    promo_price: [],
    quantityStatus: [],
    total_size: [],
  });

  const getFilters = async () => {
    console.log("getFilters");
    const res = await axios.get(
      `https://data.nmpereira.com/api/products/filters?limit=${limit}&page=${page}&sortBy=${sortBy}&sortOrder=${sortOrder}${
        search === "" ? "" : `&search=${search}`
      }`
    );
    const { filters } = await res.data;

    setFilters(filters);
  };

  const filterClick = () => {
    getFilters();
  };

  return (
    <>
      <a
        href="#my-modal-2"
        onClick={async (e) => {
          filterClick();
        }}
      >
        Filter
      </a>
      <FilterModal
        title={`${props.name} Filter`}
        body={filters}
        name={props.name.toLowerCase()}
        apply={"apply"}
        clear={"clear"}
        setFilterApply={setFilterApply}
        filterApply={filterApply}
      />
    </>
  );
}

export default Filter;
