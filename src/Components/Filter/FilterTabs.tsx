function FilterTabs(props: any) {
    const { filters,setTabSelected } = props;

    
  return (
    <>
      <div className="tabs tabs-boxed">
        {/* <a className="tab">Tab 1</a>
        <a className="tab tab-active">Tab 2</a>
        <a className="tab">Tab 3</a> */}

        {Object.keys(filters).map((filter, index) => (
            <a key={index} className="tab" onClick={e=>{
                // add active class to the clicked tab
               document.querySelectorAll(".tab").forEach((tab)=>{
                     tab.classList.remove("tab-active")
                })
                e.currentTarget.classList.add("tab-active")
                setTabSelected(filter)


            }}>{filter}</a>
        ))}
      </div>
    </>
  );
}

export default FilterTabs;

