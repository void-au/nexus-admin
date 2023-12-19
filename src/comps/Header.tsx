"use client";

import { faBell, faMoon, faSun } from "@fortawesome/free-solid-svg-icons"
import { Icon } from "./Icon"
import { useTheme } from "@/context/ThemeContext"
import { DropDownMenu } from "./DropdownMenu";

export const Header = () => {
    const { theme, switchTheme } = useTheme();
    // TODO: Grab User Context

    // TODO: Grab Page Context -> See where we are at?


    return (
        <div className="header">
            <div className="header-left">
                <div className="header-page-title">
                    Home
                </div>
            </div>

            <div className="header-right">
                <div className="header-actions">
                    <Icon def={faBell} notifications={8} />
                    <Icon def={theme === "dark" ? faSun : faMoon} onClick={() => switchTheme(theme === "dark" ? "light" : "dark")} />
                </div>
                <div className="bubble header-user-bubble">
                    <DropDownMenu hoverable menu_items={[
                        {
                            name: "Logout",
                            onClick: () => console.log("Logout")
                        }
                    ]} />
                    <div className="header-user-avatar">
                        <img src="https://via.placeholder.com/150" alt="User Avatar" />
                    </div>
                    <div className="header-user-name">
                        Matt Boan
                    </div>
                </div>
            </div>
        </div>
    )
}