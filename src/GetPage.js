import {
    createPage,
    retrievePage,
    deletePage,
    updatePage
} from './actions/pages'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import PageService from './services/PageService';

const GetPage = () => {
    // const [currentPage, setCurrentPage] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [pageId, setPageId] = useState(null)
    const history = useHistory();
    const [isDisabled, setDisable] = useState(true);
    const [name, setName] = useState(null);
    const [singlePage, setSinglePage] = useState({});
    // const pages = useSelector(state => state.pages)
    const pages = useSelector(state => state.pageReducer)
    const initialPageState = {
        "name": ""
    }
    const [changePage, setChangePage] = useState(initialPageState);


    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(retrievePage());
    }, []);


    const removePage = (e) => {

        let id = e.target.id
        dispatch(deletePage(id))
            .then(() => {


            })
            .catch(e => {
                console.log(e);
            });
    };

    const editPage = (e) => {

        let id = singlePage.hash_id;
        const data = { id: id, name: name }
        dispatch(updatePage(id, data)).then(() => {

        }).catch(error => {
            console.log(e);
        })
    };


    return (
        <div style={{ marginLeft: "5%" }}>
            <table className="table table-striped" style={{ width: "90%" }}>
                <thead className="thead-dark">
                    <tr>
                        <td>Name</td>
                        <td>Time</td>
                        <td>Action</td>
                    </tr>
                </thead>
                <tbody>
                    {pages &&
                        pages.map((page, index) => (
                            <tr >

                                <td style={{ paddingTop: "3%" }}><input defaultValue={page.name} style={{ border: "none", backgroundColor: "transparent" }}


                                    onBlur={(e) => {
                                        setSinglePage(page)
                                        setName(e.target.value)
                                        setDisable(false)
                                    }}
                                /></td>
                                <td style={{ paddingTop: "3%" }}>{page.time}</td>
                                <td style={{ display: "flex", marginTop: "5%" }}>
                                    <button className=" btn btn-primary" onClick={editPage} role="button" style={{ marginRight: "5%" }} disabled={isDisabled}>Edit</button>
                                    <button className="btn btn-danger" id={page.hash_id} role="button" onClick={removePage}>Delete</button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default GetPage;

