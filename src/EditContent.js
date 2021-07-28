
const EditContent = () =>{
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
                        <h1 style={{ 'padding-bottom': '2%' }}>Edit Content </h1>
                    </div>
                    <div className="form-outline mb-4">
                        <input type="text" className="form-control"   placeholder="Enter a link of an image or video"  />

                    </div>

                    {/* <input type="text" className="form-control" value={type} onChange={(e) => { setType(e.target.value) }} /> */}
                    <div className="form-outline mb-4">
                        <select class="form-control" >
                            <option>Select Video</option>

                            <option value="video">
                                Video
                            </option>
                            <option value="image">
                                Image
                            </option>

                        </select>
                    </div>
                    <div className="form-outline mb-4">
                        <select class="form-control " id="pages"  >
                            <option>Select Page</option>
                            
                        </select>
                    </div>
                    <button style={{ marginTop: "5%" }} className="btn btn-primary"  >Submit</button>
                </div>
            </div>
        </div>
    </div>
    )
}
export default EditContent ;