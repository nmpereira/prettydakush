import { useRef } from "react";
import { IFilterKeys } from "./Filter";
import CheckBox from "./Checkbox";

interface IFilterModal {
  title: string;
  clear: string;
  apply: string;
  body: IFilterKeys;
  name: keyof IFilterKeys;
  setFilterApply: (e: any) => void;
  filterApply: IFilterKeys;
}

function FilterModal(props: IFilterModal) {
  const { body, name, title, clear, apply, setFilterApply, filterApply } =
    props;
  const inputRef = useRef<HTMLInputElement>(null);

  const filterUpdate = (
    value: boolean,
    filter: string,
    filterApply: IFilterKeys
  ) => {
    const filerCopy = JSON.parse(JSON.stringify(filterApply));

    if (value) {
      filerCopy[name].push(filter);
    } else {
      const index = filerCopy[name].indexOf(filter);
      if (index > -1) {
        filerCopy[name].splice(index, 1);
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
    
    filterApply[name] = [];
    
    console.log("clearFilters", filterApply[name]);
  };

  console.log("filterApply", filterApply[name]);

  return (
    <>
      {/* The button to open modal */}

      <div className="modal" id="my-modal-2">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{title}</h3>
          <div className="flex items-center justify-center p-4 flex-col overflow-x-auto max-h-64 pt-48">
            {body &&
              body[name].length &&
              body[name].map((filter, index) => (
                <CheckBox
                  inputRef={inputRef}
                  index={index}
                  filter={filter}
                  filterChange={filterChange}
                  name={name}
                  filterApply={filterApply}
                  clearFilters={clearFilters}
                />
              ))}
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
