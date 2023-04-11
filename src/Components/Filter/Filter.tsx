import { useEffect, useState } from "react";
import FilterModal from "./FilterModal";
import axios from "axios";

export interface IFilterKeys {
	brandname: Array<string>;
	companyName: Array<string>;
	locationAddress: Array<string>;
	locationName: Array<string>;
	locationId: Array<string>;
	packSize: Array<string>;
	price: Array<string>;
	promoPrice: Array<string>;
	quantityStatus: Array<string>;
	totalSize: Array<string>;
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

	const [tabSelected, setTabSelected] = useState<keyof IFilterKeys>("brandname");

	const [filtersLoading, setFiltersLoading] = useState(false);

	useEffect(() => {
		getFilters();
	}, [tabSelected]);

	const getFilters = async () => {
		setFiltersLoading(true);
		const res = await axios.get(
			`https://data.nmpereira.com/api/products/filters?limit=${limit}&page=${page}&sortBy=${sortBy}&sortOrder=${sortOrder}${
				search === "" ? "" : `&search=${search}`
			}`,
			{
				params: {
					filter: filtersApplied,
				},
			}
		);
		const { filters: filterResponse } = await res.data;

		setFilters(filterResponse);
		setFiltersLoading(false);
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
				tabSelected={tabSelected}
				setTabSelected={setTabSelected}
				filtersLoading={filtersLoading}
			/>

			<a
				href="#filters"
				onClick={async (e) => {
					filterClick(e);
				}}
				// padding left 5 px
				className="btn btn-primary ml-2"
			>
				{"Filters"}
			</a>
		</>
	);
}

export default Filter;
