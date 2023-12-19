import { IconDefinition } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface Props {
    def: IconDefinition;
    onClick?: () => void;
    notifications?: number;
}

export const Icon = (props: Props) => {
    return (
        <div className="icon-con" onClick={props.onClick}>
            {props.notifications && props.notifications > 0 && <div className="icon-notifications">{props.notifications}</div>}
            <FontAwesomeIcon icon={props.def} />
        </div>
    );
}