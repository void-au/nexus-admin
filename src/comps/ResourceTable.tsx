import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format, isValid } from "date-fns";
import { faEllipsisVertical, faGripVertical, faSort, faSortDown, faSortUp } from "@fortawesome/free-solid-svg-icons";
import { Loader } from "./Loader";
import { DropDownMenu } from "./DropdownMenu";
import { useRouter } from "next/navigation";

export interface Column {
    title: string;
    key: string;
    icon?: IconDefinition;
    width?: string;
    render?: (data: any) => any;
    tooltip_render?: (data: any) => any;
}

export interface Sort {
    key: string;
    direction: "asc" | "desc";
}

interface Props {
    data: any[];
    columns: Column[];
    loading?: boolean;
    sort?: Sort;
    onClick?: (row: any) => void;
    onSort?: (sort: Sort) => void;
    show_options?: boolean;
}

export const Table = (props: Props) => {
    const handle_click = (row: any) => {
        if (props.onClick) props.onClick(row);
    }

    return (
        <div className="void-table">
            <div className="v-t-columns">
                {props.columns.map((col: Column, i: number) => <TableColumn col={col} key={i} sort={props.sort} onSort={props.onSort} />)}
                {props.show_options && <div className="v-t-col-options"></div>}
            </div>

            {props.data && !props.loading && <div className="v-t-rows">
                {props.data.map((row: any, i: number) =>
                    <div className="v-t-row" key={i} onClick={() => handle_click(row)} style={{
                        cursor: props.onClick ? "pointer" : "default"
                    }}>
                        {props.columns.map((col: Column, i: number) => <TableRowItem row={row} column={col} key={i} />)}
                        {props.show_options && <div className="v-t-row-options">
                            <div className="v-t-row-options-item">
                                <DropDownMenu menu_items={[
                                    {
                                        name: "View/Edit",
                                        onClick: () => handle_click(row)
                                    },
                                    {
                                        name: "Delete",
                                        onClick: () => { }
                                    }
                                ]} />
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </div>
                        </div>}
                    </div>
                )}
            </div>}


            {props.loading && <div className="v-t-loading"><Loader /></div>}
        </div >
    )
}

export const TableColumn = ({ col, sort, onSort }: { col: Column, sort?: Sort, onSort?: (sort: Sort) => void }) => {
    const handle_sort = () => {
        if (onSort) onSort({
            key: col.key,
            direction: sort?.direction === "asc" ? "desc" : "asc"
        })
    }

    const render_sort_icon = () => {
        if (!sort) return (<FontAwesomeIcon icon={faSort} />)
        if (sort.key !== col.key) return <FontAwesomeIcon icon={faSort} />
        if (sort.key === col.key && sort.direction === "asc") return <FontAwesomeIcon icon={faSortUp} />
        if (sort.key === col.key && sort.direction === "desc") return <FontAwesomeIcon icon={faSortDown} />
    }

    return (
        <div className="v-t-col" style={{
            flex: col?.width || "1",
            cursor: onSort ? "pointer" : "default"
        }}
            onClick={handle_sort}
        >
            <div className="v-t-col-inner"
            >
                {col.icon && <FontAwesomeIcon icon={col.icon} />}
                <label>{col.title}</label>
                {sort && <div className="sort">
                    {render_sort_icon()}
                </div>}
            </div>
        </div>
    )
}


export const TableRowItem = ({ row, column }: { row: any, column: Column }) => {
    const data = row?.[column.key] || "";

    return (
        <div className="v-t-row-item" style={{
            flex: column?.width || "1",
        }}>
            <div className="v-t-row-item-inner">
                {column.render ? column.render(data) : <p id="no-render">{row?.[column.key] || ""}</p>}
            </div>
        </div >
    )
}

// This is all the Table Render options
export const TableText = (data: string) => <div className="v-t-text">{data}</div>
export const TableDate = (data: string) => {
    const formattedDate = isValid(new Date(data)) ? format(new Date(data), "dd/MM/yyyy") : "N/A";
    return (<div className="v-t-date">{formattedDate}</div>)

}
export const TableDateTooltipRender = (data: string) => {
    return isValid(new Date(data)) ? format(new Date(data), "dd/MM/yyyy") : "N/A";
}