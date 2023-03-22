import React, { ReactElement, MouseEvent } from "react";
import SortArrow from "../Sort/SortArrow";
import { HeaderKeyWrapper, StyledTableHeader } from "./TableHeader.styles";

interface ITableHeaderProps {
  keyNames: Array<string>;
  loading: boolean;
  setSortBy: (sortBy: string) => void;
  setSortOrder: (sortOrder: string) => void;
  sortBy: string;
  sortOrder: string;
  product_key_names: Record<string, string>;
}

function TableHeader(props: ITableHeaderProps): ReactElement {
  // console.log(props);

  const handleSort = ({
    e,
    currentKey,
    sortOrder,
    sortBy,
    setSortBy,
    setSortOrder,
  }: {
    e: MouseEvent<HTMLElement>;
    currentKey: string;
    sortOrder: string;
    sortBy: string;
    setSortBy: (sortBy: string) => void;
    setSortOrder: (sortOrder: string) => void;
  }) => {
    e.preventDefault();
    if (currentKey === sortBy) {
      if (sortOrder === "asc") {
        setSortOrder("desc");
      } else {
        setSortOrder("asc");
      }
    } else {
      setSortBy(currentKey);
      setSortOrder("asc");
    }
  };

  return (
    <StyledTableHeader>
      <tr>
        <th>
          {!props.loading ? (
            "Key"
          ) : (
            <progress className="progress progress-primary w-16"></progress>
          )}
        </th>
        {props.keyNames.map((keyName, index) => {
          return props.loading ? (
            <th key={index}>
              <progress className="progress progress-primary w-16"></progress>
            </th>
          ) : (
            <th key={index}>
              <HeaderKeyWrapper
                onClick={(e) =>
                  handleSort({
                    e,
                    currentKey: props.product_key_names[keyName],
                    sortOrder: props.sortOrder,
                    sortBy: props.sortBy,
                    setSortBy: props.setSortBy,
                    setSortOrder: props.setSortOrder,
                  })
                }
              >
                {keyName}
                <SortArrow
                  order={props.sortOrder}
                  sortBy={props.sortBy}
                  currentProperty={props.product_key_names[keyName]}
                />
              </HeaderKeyWrapper>
            </th>
          );
        })}
      </tr>
    </StyledTableHeader>
  );
}

export default TableHeader;
