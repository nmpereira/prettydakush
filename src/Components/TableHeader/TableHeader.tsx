import React, { ReactElement } from "react";
import { StyledTableHeader } from "./TableHeader.styles";


interface ITableHeaderProps {
  keyNames: Array<string>;



}

function TableHeader(props:ITableHeaderProps):ReactElement {
  // console.log(props);
  return (
    <StyledTableHeader>
      <tr>
        <th>Key</th>
        {props.keyNames.map((keyName, index) => {
          return <th key={index}>{keyName} 
          </th>;
        })}
      </tr>
    </StyledTableHeader>
  );
}

export default TableHeader;
