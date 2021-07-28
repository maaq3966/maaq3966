import {
    CREATE_PAGE,
    RETRIEVE_PAGE,
    UPDATE_PAGE,
    DELETE_PAGE
}
    from "../actions/types";

const initialState = [];

function pageReducer(pages = [], action) {
    const { type, payload } = action;
    switch (type) {
        case CREATE_PAGE:
            return [...pages, payload]

        case RETRIEVE_PAGE:
            return payload;

        case UPDATE_PAGE:
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
        case DELETE_PAGE: {
            return pages.filter((page)=> page.hash_id !== payload.id)
        }
        default:
            return pages;
    }
}
export default pageReducer;