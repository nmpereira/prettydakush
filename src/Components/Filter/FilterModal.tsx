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
}

function FilterModal(props: IFilterModal) {
  const { body, title, clear, apply, setFiltersApplied, filtersApplied } = props;
  const inputRef = useRef<HTMLInputElement>(null);

  const [tabSelected, setTabSelected] =
    useState<keyof IFilterKeys>("brandname");

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

  const clearFilters = (e: any) => {
    // e.preventDefault();

    filtersApplied[tabSelected] = [];
  };

  return (
    <>
      {/* The button to open modal */}

      <div className="modal " id="my-modal-2">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{title}</h3>
          <FilterTabs filters={body} setTabSelected={setTabSelected} />

          <div className="overflow-x-auto max-h-52">
          <div className="flex items-center justify-center p-4 flex-col">
            {body &&
              body[tabSelected]?.length &&
              body[tabSelected
              ].map((filter, index) => (
                <CheckBox
                  inputRef={inputRef}
                  key={`filter-${index}`}
                  filter={filter}
                  filterChange={filterChange}
                  name={tabSelected}
                  filtersApplied={filtersApplied}
                  clearFilters={clearFilters}
                />
              ))}
          </div>
          </div>
                    <div className="modal-action">
            <a href="#" className="btn" onClick={(e) => clearFilters(e)}>
              {clear}
            </a>
            <a href="#" className="btn">
              {apply}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default FilterModal;
