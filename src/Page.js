import React, { useState } from "react";
import { useDispatch } from "react-redux";
import swal from "sweetalert";
import { createPage } from "./actions/pages";
const AddPage = () => {
    const initialPageState = {
        name: "",
        ip: "",
        time: ""
    };
    const [page, setPage] = useState(initialPageState);
    const [submitted, setSubmitted] = useState(false)
    const disptach = useDispatch();

    const handleInputChange = event => {
        const { name, value } = event.target;
        setPage({ ...page, [name]: value })
    }
    const savePage = () => {
        const { name } = page;

        disptach(createPage(name))
            .then(data => {
                setPage({
                    name: data.name,
                })
                setPage(initialPageState);
                swal({ text: 'Page Created Successfuly', buttons: false, timer: 1000 });


            }).catch(err => {
                console.log(err)
            });


    }

    return (

        <div className="container-fluid">

            <div>
                <div className="row">
                    <div className="col-lg-12" style={{ "margin-bottom": "5%" }}>

                    </div>
                </div>
                <div style={{ "padding": "1%", width: "60%", "marginLeft": "20%" }} className="card">
                    <div className="text-center card-block  " style={{ marginTop: "" }}>
                        <div className='form-group' >
                            <div className="one">
                                <h1 style={{ 'padding-bottom': '2%' }}>Create Page </h1>
                            </div>
                            <div className="form-outline mb-4">
                                <input type="text" className="form-control" placeholder="Enter Page Name"
                                    required
                                    id="name"
                                    value={page.name}
                                    onChange={handleInputChange}
                                    name="name"
                                />

                            </div>

                            {/* <input type="text" className="form-control" value={type} onChange={(e) => { setType(e.target.value) }} /> */}
                           

                            <button onClick={savePage} style={{ marginTop: "5%" }} className="btn btn-primary">Submit</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default AddPage;