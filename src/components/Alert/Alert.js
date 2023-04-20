import { Icon } from "@iconify/react";
import "./Alert.css";

export const Alert = ({status, message}) => {
    return(
        <div className={`alert ${status === "success" ? "success" : "error"}`}>
            <Icon icon={status === "success" ? "mdi:checkbox-marked-circle" : "ic:baseline-error"} width={20} className="mr" /> 
            {message}
        </div>
    )
}