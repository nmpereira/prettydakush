import React, { ReactElement, MouseEvent } from "react";
import SortArrow from "../Sort/SortArrow";
import { HeaderKeyWrapper, StyledTableHeader } from "./TableHeader.styles";
import Filter from "../Filter/Filter";

interface ITableHeaderProps {
  keyNames: Array<string>;
  loading: boolean;
  setSortBy: (sortBy: string) => void;
  setSortOrder: (sortOrder: string) => void;
  sortBy: string;
  sortOrder: string;
  product_key_names: Record<string, string>;
  limit: number;
  page: number;
  search: string;

}

function TableHeader(props: ITableHeaderProps): ReactElement {
  const handleSort = ({
    e,
    currentKey,
    sortOrder,
    sortBy,
  }: {
    e: MouseEvent<HTMLElement>;
    currentKey: string;
    sortOrder: string;
    sortBy: string;
  }) => {
    e.preventDefault();

    if (currentKey === sortBy) {
      props.setSortBy(currentKey);

      if (sortOrder === "asc") {
        props.setSortOrder("desc");
      } else {
        props.setSortOrder("asc");
      }
    } else {
      props.setSortBy(currentKey);
      props.setSortOrder("asc");
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
              {keyName === "Price" || keyName === "Promo Price" ? (
                <>
                  {keyName === "Price" ? (
                    <>

                      <HeaderKeyWrapper
                        onClick={(e) =>
                          handleSort({
                            e,
                            currentKey: props.product_key_names[keyName],
                            sortOrder: props.sortOrder,
                            sortBy: props.sortBy,
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

                      <HeaderKeyWrapper
                        onClick={(e) =>
                          handleSort({
                            e,
                            currentKey: "priceHistoryUpdatedAt",
                            sortOrder: props.sortOrder,
                            sortBy: "priceHistoryUpdatedAt",
                            // setSortBy: props.setSortBy,
                            // setSortOrder: props.setSortOrder,
                          })
                        }
                      >
                        {"Last updated"}
                        <SortArrow
                          order={props.sortOrder}
                          sortBy={props.sortBy}
                          currentProperty={"priceHistoryUpdatedAt"}
                        />
                      </HeaderKeyWrapper>
                    </>
                  ) : (
                    <>

                      <HeaderKeyWrapper
                        onClick={(e) =>
                          handleSort({
                            e,
                            currentKey: props.product_key_names[keyName],
                            sortOrder: props.sortOrder,
                            sortBy: props.sortBy,
                            // setSortBy: props.setSortBy,
                            // setSortOrder: props.setSortOrder,
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
                      <HeaderKeyWrapper
                        onClick={(e) =>
                          handleSort({
                            e,
                            currentKey: "promoPriceHistoryUpdatedAt",
                            sortOrder: props.sortOrder,
                            sortBy: "promoPriceHistoryUpdatedAt",
                          })
                        }
                      >
                        {"Last updated"}
                        <SortArrow
                          order={props.sortOrder}
                          sortBy={props.sortBy}
                          currentProperty={"promoPriceHistoryUpdatedAt"}
                        />
                      </HeaderKeyWrapper>
                    </>
                  )}
                </>
              ) : (
                <>


     

                  <HeaderKeyWrapper
                    onClick={(e) =>
                      handleSort({
                        e,
                        currentKey: props.product_key_names[keyName],
                        sortOrder: props.sortOrder,
                        sortBy: props.sortBy,
                        // setSortBy: props.setSortBy,
                        // setSortOrder: props.setSortOrder,
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
                </>
              )}
            </th>
          );
        })}
      </tr>
    </StyledTableHeader>
  );
}

export default TableHeader;
