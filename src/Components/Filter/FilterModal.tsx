import { useRef, useState } from "react";
import { IFilterKeys } from "./Filter";
import CheckBox from "./Checkbox";
import FilterTabs from "./FilterTabs";

interface IFilterModal {
  title: string;
  clear: string;
  apply: string;
  body: IFilterKeys;
  setFiltersApplied: (e: any) => void;
  filtersApplied: IFilterKeys;
  filterApply: () => void;
}

function FilterModal(props: IFilterModal) {
  const {
    body,
    title,
    clear,
    apply,
    setFiltersApplied,
    filtersApplied,
    filterApply,
  } = props;
  const inputRef = useRef<HTMLInputElement>(null);

  const [tabSelected, setTabSelected] =
    useState<keyof IFilterKeys>("brandname");

  const [filterCounters, setFilterCounters] = useState<{
    [key in keyof IFilterKeys]: number;
  }>(
    Object.keys(body).reduce((acc: Record<any, any>, key) => {
      acc[key] = 0;
      return acc;
    }, {}) as { [key in keyof IFilterKeys]: number }
  );

  const updateFilterCounters = () => {
    const filterCountersCopy = JSON.parse(JSON.stringify(filterCounters));

    Object.keys(filtersApplied).forEach((key) => {
      // @ts-ignore
      filterCountersCopy[key] = filtersApplied[key].length;
    });

    setFilterCounters(filterCountersCopy);
  };

  const filterUpdate = (
    value: boolean,
    filter: string,
    filtersApplied: IFilterKeys
  ) => {
    const filerCopy = JSON.parse(JSON.stringify(filtersApplied));

    if (value) {
      filerCopy[tabSelected].push(filter);
    } else {
      const index = filerCopy[tabSelected].indexOf(filter);
      if (index > -1) {
        filerCopy[tabSelected].splice(index, 1);
      }
    }

    

    return filerCopy;
  };

  const filterChange = (value: boolean, filter: string) => {
    const filterApplyUpdated = filterUpdate(value, filter, filtersApplied);
    setFiltersApplied(filterApplyUpdated);
   
  };

  const clearFilters = ({ e, all }: { e: any; all: boolean }) => {
    // e.preventDefault();

    // if all is true, clear all filters. Otherwise, clear only the selected tab
    if (all) {
      Object.keys(filtersApplied).forEach((key
        ) => {
        // @ts-ignore
        filtersApplied[key] = [];
      });

    } else {
      filtersApplied[tabSelected] = [];
    }

    // filtersApplied[tabSelected] = [];
  };

  return (
    <>
      {/* The button to open modal */}

      <div className="modal" id="filters">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{title}</h3>
          <FilterTabs
            filters={body}
            setTabSelected={setTabSelected}
            filterCounters={filterCounters}
          />

          <div className="overflow-x-auto max-h-52">
            <div className="flex items-center justify-center p-4 flex-col">
              {body &&
                body[tabSelected]?.length &&
                body[tabSelected].map((filter, index) => (
                  <CheckBox
                    inputRef={inputRef}
                    key={`filter-${index}`}
                    filter={filter}
                    filterChange={filterChange}
                    name={tabSelected}
                    filtersApplied={filtersApplied}
                    clearFilters={clearFilters}
                    updateFilterCounters={updateFilterCounters}
                  />
                ))}
            </div>
          </div>
          <div className="modal-action">
            <a
              href="#"
              className="btn"
              onClick={(e) => {
                clearFilters({ e, all: true });
                filterApply();
              }}
            >
              {"clear all"}
            </a>
            <a
              href="#"
              className="btn"
              onClick={(e) => {
                clearFilters({ e, all: false });
                filterApply();
              }}
            >
              {clear}
            </a>
            <a
              href="#"
              className="btn"
              onClick={(e) => {
                filterApply();
              }}
            >
              {apply}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default FilterModal;
