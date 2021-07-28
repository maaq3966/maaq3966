import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import swal from "sweetalert";

const ShowContent = (props) => {
    const [content, setContent] = useState([{}]);
    const [hash_id, setHashId] = useState('');

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/show-contents').then(response => {
            let value = response.data
            // console.log(value.data)
            setContent(value)
            console.log('content', content)
        })


    }, [])

    const Delete = (e) => {
        let item = new FormData()
       
        setHashId(e.target.id);

        let index = content.map((item)=> item.hash_id).indexOf(hash_id)
        console.log(index) 
        console.log(hash_id)
        console.log(content)
        content.splice(index, 1);
        console.log(content)
        // item.append('hash_id', hash_id)
        // swal({
        //     title: "Are you sure?",
        //     text: "Once deleted, you will not be able to recovevr Content",
        //     icon: "warning",
        //     buttons: true,
        //     dangerMode: true,
        // }).then((willDelete) => {
        //     if (willDelete) {

        //         axios({
        //             "method": "POST",
        //             "url": 'http://127.0.0.1:8000/api/delete-contents',
        //             "data": item,
        //             "headers": {
        //                 "Content-Type": "multipart/form-data",
        //                 "Accept": "application/json"
        //             },
        //         }).then(function (response) {
        //             console.log(response)
        //             swal("Content has been deleted", {
        //                 icon: "success",
        //             });
        //         }).catch(function (response) {
        //             swal({ text: "Content not deleted", buttons: false, timer: 1000 });
        //         })




        //     }
        // });

    }



    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-12" style={{ "margin-bottom": "3%" }}>

                </div>
            </div>
            <div className="container-fluid " style={{ width: "90%", "align-content": "center" }}>
                <div className="one">
                    <h1 style={{ 'padding-bottom': '2%' }}>View Content </h1>
                </div>
                <table className="table table-striped">
                    <thead className="thead-dark">
                        <tr>
                            <th>Content</th>
                            <th>Page</th>
                            <th>action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            content.map(row => <tr>
                                <td style={{ paddingTop: "3%" }}>{row.content}</td>
                                <td style={{ paddingTop: "3%" }}>{row.type}</td>
                                <td> <a class=" btn btn-primary" role="button" style={{ margin: "5%" }}>Edit</a>
                                    <a onClick={Delete} id={row.hash_id} class="btn btn-danger" role="button">Delete</a></td>

                            </tr>)
                        }




                    </tbody>
                </table>
            </div>
        </div>
    )

}




export default ShowContent;