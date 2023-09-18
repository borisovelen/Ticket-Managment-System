import React from "react";
import "./MainContent.css";

function MainContent(props){
    return(
        <div className="mainContent">
            {props.children}
        </div>
    )
}
export default MainContent;