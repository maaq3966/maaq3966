import {
    RETRIEVE_CONTENT,
    CREATE_CONTENT,
    UPDATE_CONTENT,
    DELETE_CONTENT
}
from "../actions/types";



const initialState = [];


function contentReducer(pages = [], action) {
    const { type, payload } = action;
    switch (type) {
        case CREATE_CONTENT:
            return [...pages, payload]

        case RETRIEVE_CONTENT:
            return payload;

        case UPDATE_CONTENT:
            return pages.map((page) => {
                if (page.hash_id == payload.id) {
                    return {
                        ...page,
                        name: payload.name  
                    }
                }
                else {
                    return page;
                }
            });
        case DELETE_CONTENT: {
            return pages.filter((page)=> page.hash_id !== payload.id)
        }
        default:
            return pages;
    }
}
export default contentReducer;