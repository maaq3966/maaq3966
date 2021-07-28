import http from '../http-common'


// lets create the crud for the pages section
const getAll =()=>{
    return http.get('/get-pages');
}

const get = id => {
    return http.get(`/pages/${id}`)
}

const create = data =>{
    return http.post('/create-pages',data)
}

const update = (id, data) =>{
    return http.put(`/pages/${id}`,data)
}

const remove = id =>{
    return http.get(`/pages/delete/${id}`)
}

const PageService = {
    getAll,
    get,
    create,
    update,
    remove
}


export default PageService;