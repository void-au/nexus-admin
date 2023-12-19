"use client";

import { get_grouped_resources } from "@/engine/resources/resources"
import { Logo } from "./Logo"
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faHome } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

export const Sidepanel = () => {
    const router = useRouter();
    const [open, setOpen] = useState<boolean>(false);
    const [resources, setResources] = useState<any[]>([]);

    useEffect(() => {
        setResources(get_grouped_resources());
    }, []);

    return (
        <div className="side-panel">
            <div className="side-panel-logo-wrapper">
                <Logo />
            </div>

            <div className="resources">
                <div className="resource-group-wrapper">
                    <div className="resource-group" onClick={() => router.push("/dash/home")}>
                        <div className="resource-group-icon"><FontAwesomeIcon icon={faHome} /></div>
                    </div>
                </div>
                {resources.map((group, i) => <ResourceGroupButton key={i} group={group} side_panel_open={open} />)}
            </div>

            <div className="bottom-actions">
            </div>
        </div>
    )
}


export const ResourceGroupButton = ({ group, side_panel_open }: { group: any, side_panel_open: boolean }) => {
    const router = useRouter();
    const [open, setOpen] = useState<boolean>(false);

    const onClick = () => {
        if (group.resources?.length > 1) {
            setOpen(!open);
        } else {
            router.push(`/dash/resources/${group.resources[0].slug}`);
        }
    }

    return (
        <div className="resource-group-wrapper">
            <div className="resource-group" onClick={() => onClick()}>
                {group?.icon && <div className="resource-group-icon"><FontAwesomeIcon icon={open ? faChevronUp : group.icon} /></div>}
                {side_panel_open && <div className="resource-group-title">{group.name}</div>}
            </div>
            {group.resources?.length > 1 && open && <div className="resource-group-items">
                {group.resources.map((item: any, j: number) => {
                    return (
                        <div key={j} className="resource-group-item" onClick={() => router.push(`/dash/resources/${item.slug}`)}>
                            {item?.icon && <div className="resource-group-icon"><FontAwesomeIcon icon={item.icon} /></div>}
                            {side_panel_open && <div className="resource-group-item-title">{item.name}</div>}
                        </div>
                    )
                })}
            </div>}
        </div>
    )
}