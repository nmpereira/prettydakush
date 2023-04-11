import { Link } from "./Cell.styles";

interface ILinkCellProps {
	href: string;
	text: string | number | string[];
}

function LinkCell(props: ILinkCellProps) {
	return (
		<Link href={props.href} target="_blank" rel="noreferrer">
			{props.text}
		</Link>
	);
}

export default LinkCell;
