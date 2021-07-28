import http from '../http-common'


// lets create the crud for the pages section
const getAll =()=>{
    return http.get('/get-contents');
}

const get = id => {
    return http.get(`/contents/${id}`)
}

const create = data =>{
    return http.post('/create-contents',data)
}

const update = (id, data) =>{
    return http.put(`/contents/${id}`,data)
}

const remove = id =>{
    return http.get(`/contents/delete/${id}`)
}

const ContentService = {
    getAll,
    get,
    create,
    update,
    remove
}


export default ContentService;