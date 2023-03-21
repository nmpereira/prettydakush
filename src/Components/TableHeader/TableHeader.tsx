import React, { ReactElement } from "react";
import { StyledTableHeader } from "./TableHeader.styles";

interface ITableHeaderProps {
  keyNames: Array<string>;
  loading: boolean;
}

function TableHeader(props: ITableHeaderProps): ReactElement {
  // console.log(props);
  return (
    <StyledTableHeader>
      <tr>
        <th>{!props.loading?'Key':<progress className="progress progress-primary w-16"></progress>}</th>
        {props.keyNames.map((keyName, index) => {
          return props.loading ? <th key={index}><progress className="progress progress-primary w-16"></progress></th> :
           <th key={index}>{keyName}</th>;
        })}
      </tr>
    </StyledTableHeader>
  );
}

export default TableHeader;
