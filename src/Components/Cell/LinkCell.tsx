import { RowWrapper } from "../Row/Row.styles";
import { Link } from "./Cell.styles";

interface ILinkCellProps {
    key: number;
    href: string;
    text: string | number | string[];

}

function LinkCell(props:ILinkCellProps) {

 
    return (

       <RowWrapper>
        <Link href={props.href} target="_blank" rel="noreferrer">
        {props.text}
        </Link>
       </RowWrapper>
      );
}

export default LinkCell;