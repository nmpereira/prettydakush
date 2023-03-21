import styled from "styled-components";

export const StyledTableHeader = styled.thead`
    th {
        position: sticky;
        top: 0;
    }
    th:first-child {
        z-index: 12;

    }
`;
