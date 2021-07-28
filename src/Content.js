import axios from "axios";
import { useEffect, useState } from "react"
import './register-form.css'
import swal from 'sweetalert';
import { useSelector } from "react-redux";

const Content = () => {

    const [content, setContent] = useState('');
    const [type, setType] = useState('');
    const [data, setData] = useState([{}]);
    const [page_id, setPageId] = useState('');
    const [i, setI] = useState(0);
    const pages = useSelector(state => state.pageReducer)
    useEffect(() => {


        axios.get('http://127.0.0.1:8000/api/get-pages').then(response => {
            let value = response.data.page
            setData(value)
        })
        
    }, [])

    const createContent = () => {
        if (!content || !type || !page_id) {
            if (!page_id) {
                swal({ text: 'Please Select Page', buttons: false, timer: 1000 });
            }
            else if (!content) {
                swal({ text: 'Please Enter Content', buttons: false, timer: 1000 });
            }
            else {
                swal({ text: 'Please Select type', buttons: false, timer: 1000 });
            }
        }
        else {
            let item = new FormData()
            item.append('content', content)
            item.append('type', type)
            item.append('page_id', page_id)
            axios({
                "method": "post",
                "url": "http://127.0.0.1:8000/api/add-content",
                "data": item,
                "headers": { "Content-Type": "multipart/form-data" },
            }).then(function (response) {
                swal({ text: 'Content Created Successfuly', buttons: false, timer: 1000 });
            }).catch(function (response) {
                swal({ text: 'Content Created Unsuccessfuly', buttons: false, timer: 1000 });
            })
        }
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-12" style={{ "margin-bottom": "5%" }}>

                </div>
            </div>
            <div style={{ "padding": "1%", width: "60%", "marginLeft": "20%" }} className="card">
                <div className="text-center card-block  " style={{ marginTop: "" }}>
                    <div className='form-group' >
                        <div className="one">
                            <h1 style={{ 'padding-bottom': '2%' }}>Create Content </h1>
                        </div>
                        <div className="form-outline mb-4">
                            <input type="text" className="form-control" value={content} placeholder="Enter a link of an image or video" onChange={(e) => { setContent(e.target.value) }} />

                        </div>

                        {/* <input type="text" className="form-control" value={type} onChange={(e) => { setType(e.target.value) }} /> */}
                        <div className="form-outline mb-4">
                            <select class="form-control" onChange={(e) => setType(e.target.value)}>
                                <option>Select Type</option>

                                <option value="video">
                                    Video
                                </option>
                                <option value="image">
                                    Image
                                </option>

                            </select>
                        </div>
                        <div className="form-outline mb-4">
                            <select class="form-control " id="pages" onChange={(e) => setPageId(e.target.value)}>
                                <option>Select Page</option>
                                {/* {data.map(row => <option value={row.hash_id} >{row.name}</option>)} */}
                                {pages &&
                                pages.map((page, index) => (
                                    <option> {page.name}  </option>

                            ))}
                            </select>
                           
                        </div>
                        <button style={{ marginTop: "5%" }} className="btn btn-primary" onClick={createContent}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Content;