import { useRef, useState } from "react";
import { IFilterKeys } from "./Filter";
import CheckBox from "./Checkbox";
import FilterTabs from "./FilterTabs";

interface IFilterModal {
  title: string;
  clear: string;
  apply: string;
  body: IFilterKeys;
  setFilterApply: (e: any) => void;
  filterApply: IFilterKeys;
}

function FilterModal(props: IFilterModal) {
  const { body, title, clear, apply, setFilterApply, filterApply } = props;
  const inputRef = useRef<HTMLInputElement>(null);

  const [tabSelected, setTabSelected] =
    useState<keyof IFilterKeys>("brandname");

  const filterUpdate = (
    value: boolean,
    filter: string,
    filterApply: IFilterKeys
  ) => {
    const filerCopy = JSON.parse(JSON.stringify(filterApply));

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
    const filterApplyUpdated = filterUpdate(value, filter, filterApply);

    setFilterApply(filterApplyUpdated);
  };

  const clearFilters = (e: any) => {
    // e.preventDefault();

    filterApply[tabSelected] = [];
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
                  filterApply={filterApply}
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
