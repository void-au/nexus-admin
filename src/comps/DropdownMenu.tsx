import { useDropdown } from "@/context/DropdownContext";
import { useEffect, useState } from "react";

export interface MenuItem {
    name: string;
    onClick: () => void;
}


export interface Props {
    menu_items: MenuItem[];
    hoverable?: boolean;
}

export const DropDownMenu = (props: Props) => {
    const { register_open, current_open } = useDropdown();
    const [id, setId] = useState<string>(null!);
    const [open, setOpen] = useState<boolean>(false);

    const handle_click = (e: any) => {
        e.stopPropagation();
        setOpen(!open);
    }

    useEffect(() => {
        if (open) setId(register_open());
    }, [open]);

    useEffect(() => {
        if (current_open && id && current_open !== id) setOpen(false);
    }, [current_open]);

    useEffect(() => {
        const listener = (e: any) => {
            if (!e.target.closest(".dropdown-menu-wrapper")) {
                setOpen(false);
            }
        }
        document.addEventListener("click", listener);
        return () => {
            document.removeEventListener("click", listener);
        }
    }, []);

    return (
        <div className="dropdown-menu-wrapper"
            onMouseEnter={() => props.hoverable && setOpen(true)}
            onMouseLeave={() => props.hoverable && setOpen(false)}
            onClick={handle_click}>
            {open && <div className="dropdown-menu-helper" />}
            {open && <div className="dropdown-menu-side-helper" />}
            {open && <div className="dropdown-menu">
                {props.menu_items.map((item: MenuItem) => (
                    <div className="dropdown-menu-item" onClick={item.onClick}>
                        {item.name}
                    </div>
                ))}
            </div>}
        </div >
    )
}