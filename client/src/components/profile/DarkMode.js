import React, { useEffect } from "react";
import { BsSun, BsFillMoonFill } from "react-icons/bs"
import "./DarkMode.css";

function DarkMode() {

    function setDarkMode() {
        document.querySelector("body").setAttribute("theme", "dark");
        localStorage.setItem("theme", "dark");
    }
    function setLightMode() {
        document.querySelector("body").setAttribute("theme", "light");
        localStorage.setItem("theme", "light");
    }
    useEffect(() => {
        const localTheme = localStorage.getItem("theme");
        if (localTheme === "light") {
            document.getElementById("darkmode-toggle").checked = false;
            setLightMode();
        }
        else {
            document.getElementById("darkmode-toggle").checked = true;
            setDarkMode();
        }
    }, []);

    function themeChanger(e) {
        if (e.target.checked) setDarkMode();
        else setLightMode();
    }

    return (
        <div className="darkmode">
            <input type="checkbox" id="darkmode-toggle" onChange={themeChanger} />
            <label htmlFor="darkmode-toggle">
                <BsSun className="sun" />
                <BsFillMoonFill className="moon" />
            </label>
        </div>
    );
}
export default DarkMode;