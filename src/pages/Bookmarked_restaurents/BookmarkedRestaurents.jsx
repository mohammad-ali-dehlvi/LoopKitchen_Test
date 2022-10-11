import { connect, useDispatch } from "react-redux"
import Iframe from "../../components/Iframe/Iframe";
import { addHomeItem, removeBookmarkItem } from "../../utils/redux/actionCreator";

function BookmarkedRestaurents(props){

    const dispatch = useDispatch();

    const removeBookmark = (item, i)=>{
        dispatch(addHomeItem(item));
        dispatch(removeBookmarkItem(i));
    }

    return (
        <div>
            {/* map list */}
            <div className="row" >
                <div className="col-12 pt-2" >
                    {
                        props.bookmarkList.length == 0 &&
                        <p className="text-center text-danger display-6" >Bookmark List is Empty</p>
                    }
                    {
                        props.bookmarkList.map((v, i)=>(
                            <Iframe 
                                key={JSON.stringify(v)} 
                                bookmark 
                                item={v}
                                onRemoveBookmark={()=>{removeBookmark(v, i);}}
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
        bookmarkList: state.bookmarkList
    }
}

export default connect(mapStateToProps)(BookmarkedRestaurents);