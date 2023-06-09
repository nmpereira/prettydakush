import { useEffect, useState } from "react";

function CheckBox(props: any) {
  const {
    inputRef,
    updateFilterCounters,
    filter,
    filterChange,
    name,
    filtersApplied,
    clearFilters,
  } = props;

  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (filtersApplied[name].includes(filter)) {
      setChecked(true);
    } else {
      setChecked(false);
    }
    
  }, [checked, filterChange, clearFilters]);

  useEffect(() => {updateFilterCounters()}, [checked]);

  return (
    <div className="form-control" >
      <label className="cursor-pointer label">
        <input
          type="checkbox"
          className="checkbox"
          checked={checked}
          id={name}
          ref={inputRef}
          onChange={(e) => {
            filterChange(e.target.checked, filter);
            
          }}
        />
        <span className="checkbox-mark"></span>
        <span className="label-text">{filter}</span>
      </label>
    </div>
  );
}

export default CheckBox;
