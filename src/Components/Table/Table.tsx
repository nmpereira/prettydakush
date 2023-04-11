import RowComponent from "../Row/Row";
import { ReactElement, useEffect, useState } from "react";
import axios from "axios";
import TableHeader from "../TableHeader/TableHeader";
import Pagination from "../Pagination/Pagination";
import {
	SearchArea,
	StyledTable,
	TablePageWrapper,
	TableTopSpacer,
	TableWrapper,
} from "./Table.styles";
import { DebounceInput } from "react-debounce-input";
import Filter, { IFilterKeys } from "../Filter/Filter";

function Table(): ReactElement {
	const [products, setProducts] = useState<any[]>([]);
	const [limit, setLimit] = useState<number>(50);
	const [sortBy, setSortBy] = useState<string>("price");
	const [sortOrder, setSortOrder] = useState<string>("desc");
	const [page, setPage] = useState<number>(1);
	const [metadata, setMetadata] = useState<any>({});
	const [loading, setLoading] = useState<boolean>(false);
	const [search, setSearch] = useState("");

	const [filters, setFilters] = useState<IFilterKeys>({
		brandname: [],
		companyName: [],
		locationAddress: [],
		locationName: [],
		locationId: [],
		packSize: [],
		price: [],
		promoPrice: [],
		quantityStatus: [],
		totalSize: [],
	});

	const [filtersApplied, setFiltersApplied] = useState<IFilterKeys>({
		brandname: [],
		companyName: [],
		locationAddress: [],
		locationName: [],
		locationId: [],
		packSize: [],
		price: [],
		promoPrice: [],
		quantityStatus: [],

		totalSize: [],
	});

	useEffect(() => {
		getData();
	}, [page, limit, sortBy, sortOrder, search]);

	const filterApply = () => {
		getData();
	};

	const getData = async () => {
		setLoading(true);
		await axios

			.get(
				`https://data.nmpereira.com/api/products/all?limit=${limit}&page=${page}&sortBy=${sortBy}&sortOrder=${sortOrder}${
					search === "" ? "" : `&search=${search}`
				}`,
				{
					params: {
						filter: filtersApplied,
					},
				}
			)
			.then((response) => {
				setProducts(response.data.products);
				setMetadata(response.data.msg);
				setLoading(false);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	console.log(products);

	const productKeyNames = {
		// 'ID': "_id",
		"Company Name": "company_name",
		"Location ID": "location_id",
		Brandname: "brandname",
		"Variation Name": "variation_name",
		// "Display Name": "displayname",
		// "Product ID": "product_id",
		// "Variation ID": "variationid",
		"Total Size": "total_size",
		"Pack Size": "pack_size",
		Price: "price",
		// "Quantity Status": "quantityStatus",
		"Promo Price": "promoPrice",
		"Product Name": "productName",
		// "Price Last Updated": "priceHistoryUpdatedAt",
		// "Promo Price Last Updated": "promoPriceHistoryUpdatedAt",
		// "Document Last Updated": "updatedAt",
		// "Document Created At": "createdAt",
	};

	const keyNames = Object.keys(productKeyNames);
	const valueNames = Object.values(productKeyNames);

	return (
		<TablePageWrapper>
			<TableTopSpacer>
				<Pagination
					limit={metadata.limit}
					page={metadata.page}
					setPage={setPage}
					total_pages={metadata.total_pages}
					totalProducts={metadata.sizeBeforeFilter}
					loading={loading}
				/>
			</TableTopSpacer>
			<SearchArea>
				<div>
					<label className="label">
						<button className="btn btn-disabled mr-2">Limit</button>
						<select
							className="select select-primary w-25 max-w-xs mr-2"
							value={limit}
							onChange={(e) => {
								setLimit(parseInt(e.target.value));
								setPage(1);
							}}
						>
							<option value={5}>5</option>
							<option value={10}>10</option>
							<option value={25}>25</option>
							<option value={50}>50</option>
							<option value={100}>100</option>
							<option value={250}>250</option>
						</select>
					</label>
				</div>
				<DebounceInput
					minLength={2}
					className="input input-bordered input-primary w-full max-w-xs m-2"
					placeholder="Search..."
					debounceTimeout={800}
					onChange={(e) => {
						setSearch(e.target.value);
						setSortBy("score");
						setSortOrder("desc");
					}}
					value={search}
				/>
				<button
					className={`btn btn-active ${!search ? "btn-ghost" : "btn-primary"}`}
					onClick={(e) => setSearch("")}
				>
					{`${!search ? "search" : "clear"}`}
				</button>
				<div>
					<Filter
						filters={filters}
						setFilters={setFilters}
						filtersApplied={filtersApplied}
						setFiltersApplied={setFiltersApplied}
						limit={limit}
						page={page}
						sortBy={sortBy}
						sortOrder={sortOrder}
						search={search}
						name="brandname"
						filterApply={filterApply}
					/>
				</div>
			</SearchArea>
			<TableWrapper>
				<StyledTable className="table w-full">
					<TableHeader
						keyNames={keyNames}
						loading={loading}
						setSortBy={setSortBy}
						setSortOrder={setSortOrder}
						sortBy={sortBy}
						sortOrder={sortOrder}
						productKeyNames={productKeyNames}
						limit={limit}
						search={search}
						page={page}
					/>

					<tbody className="overflow-auto">
						{loading ? (
							<tr className="h-20">
								<td colSpan={keyNames.length} className="text-center">
									<progress className="progress progress-primary w-56"></progress>
								</td>
							</tr>
						) : (
							<>
								{products.map((product, index) => (
									<RowComponent
										key={product._id}
										index={index + 1}
										{...product}
										keyNames={keyNames}
										valueNames={valueNames}
										productKeyNames={productKeyNames}
										loading={loading}
									/>
								))}
							</>
						)}
					</tbody>
				</StyledTable>
			</TableWrapper>
		</TablePageWrapper>
	);
}

export default Table;
