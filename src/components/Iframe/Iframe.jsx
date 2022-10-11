import React from "react";
import style from "./IframeStyle.module.css";

function Iframe(props){
    return (
        <div className={`${style.mainContainer}`} >
            <iframe 
                // key={i}
                width="100%" 
                height="450" 
                src={`https://datastudio.google.com/embed/u/0/reporting/430242fa-4162-4950-a984-824b3b355b3c/page/dQMwC?params=%7B%22ds2.name2%22:%22${props.item.fields.Name}%22%7D`}
                frameBorder="0" 
                style={{border: "none"}}
                allowFullScreen
            ></iframe>

            {
                props.home &&
                <button className={`btn ${style.bookmarkBtn}`} onClick={()=>{props.onAddToBookmark?.call(this, props.item);}} >
                    <i className="fa-regular fa-bookmark"></i>
                </button>
            }

            {
                props.home &&
                <button className={`btn ${style.removeBtn}`} onClick={()=>{props.onRemove?.call(this, props.item);}} >
                    <i className="fa-solid fa-trash"></i>
                </button>
            }

            {
                props.bookmark &&
                <button className={`btn ${style.bookmarkBtn}`} onClick={()=>{props.onRemoveBookmark?.call(this, props.item);}}>
                    <i className="fa-solid fa-bookmark"></i>
                </button>
            }

        </div>
    )
}

export default Iframe;