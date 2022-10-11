import React, {useState} from "react";
import { connect, useDispatch } from "react-redux";
import Iframe from "../../components/Iframe/Iframe";
import { addBookmarkItem, addHomeItem, removeHomeItem } from "../../utils/redux/actionCreator";
import style from "./style/Home.module.css";

function Home(props){

    const [showAutoCompleteList, setShowAutoCompleteList] = useState(false);
    const [value, setValue] = useState("");
    const [item, setItem] = useState(null);
    const dispatch = useDispatch();

    const onChange = async (event)=>{
        setValue(event.target.value);
    }

    const selectItem = (item)=>{
        setItem(item);
        setValue(item.fields.Name);
    }

    const addItem = () => {
        if(item == null){
            alert("please select restaurent");
            return;
        }
        let arr = props.homeList.filter((v)=> v.fields.Name == item.fields.Name )
        if(arr.length == 0){
            dispatch(addHomeItem(item));
        }
        setItem(null);
        setValue("");
    }

    const addToBookmark = (item, i) => {
        dispatch(addBookmarkItem(item));
        dispatch(removeHomeItem(i));
    }

    const removeItem = (i) => {
        dispatch(removeHomeItem(i));
    }

    return(
        <div className="container-fluid" style={{minHeight: "100%"}} >
            {/* input with autocomplete */}
            <div className="row" >
                <div className="col-12" >
                    <div className="d-flex flex-row my-2" >
                        <div className={`${style.autocompleteDiv} mx-2`} >
                            <input 
                                className="form-control" 
                                type="text" 
                                placeholder="Search restaurant name" 
                                value={value}
                                onChange={onChange}
                                onFocus={()=>{setShowAutoCompleteList(true);}}
                                onBlur={()=>{setTimeout(()=>{setShowAutoCompleteList(false);}, 250);}}
                            />
                            <div className={`${style.autocompleteOptions}`} >
                                {
                                    showAutoCompleteList && props.autoCompleteList
                                        .filter((item)=>value.length >= 0 && item.fields.Name.toLowerCase().indexOf(value.toLowerCase())>=0)
                                        .map((item, index)=>(
                                            <div key={index} className={`${style.autocompleteItem}`} onClick={()=>{selectItem(item);}} >
                                                {item.fields.Name}
                                            </div>
                                        ))
                                }
                            </div>
                        </div>
                        <button className="btn btn-primary mx-2" onClick={()=>{addItem();}} >Add</button>
                    </div>
                </div>
            </div>

            {/* map list */}
            <div className="row" >
                <div className="col-12" >
                    {
                        props.homeList.length == 0 &&
                        <p className="text-center text-danger display-6" >Home List is Empty</p>
                    }
                    {
                        props.homeList.map((v, i)=>(
                            <Iframe 
                                key={JSON.stringify(v)} 
                                home 
                                item={v} 
                                onAddToBookmark={(it)=>{addToBookmark(it, i);}}
                                onRemove={(it)=>{removeItem(i);}}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

function mapStateToProps(state){
    return {
        autoCompleteList: state.autoCompleteList,
        homeList: state.homeList,
    }
}

export default connect(mapStateToProps)(Home);