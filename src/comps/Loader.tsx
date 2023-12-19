import { SyncLoader } from "react-spinners";

export interface Props {
    dark?: boolean;
    size?: string;
}

export const Loader = (props: Props) => {

    return (
        <div className="loader">
            <SyncLoader />
        </div>
    );
}