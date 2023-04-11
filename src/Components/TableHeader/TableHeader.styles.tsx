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

export const HeaderKeyWrapper = styled.div`
	display: flex;
	align-items: center;
`;
