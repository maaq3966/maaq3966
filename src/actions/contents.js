import {
    RETRIEVE_CONTENT,
    CREATE_CONTENT,
    UPDATE_CONTENT,
    DELETE_CONTENT
}
    from './types'

import PageService from '../services/PageService'

export const createPage = (names) => async (dispatch) => {
    try {
        const res = await PageService.create({ names });

        const payload = res.data.page

        dispatch({
            type: CREATE_CONTENT,
            payload: payload
        });
        return Promise.resolve(res.data)
    }

    catch (err) {
        return Promise.reject(err);
    }
}

export const retrievePage = () => async (dispatch) => {
    try {
        const res = await PageService.getAll()

        dispatch({
            type: RETRIEVE_CONTENT,
            payload: res.data.page
        })
    }
    catch (err) {
        console.log(err)
    }
}

export const updatePage = (id, data) => async (dispatch) => {
    try {
        const res = await PageService.update(id, data)
        dispatch({
            type: UPDATE_CONTENT,
            payload: data
        })
        return Promise.resolve(res.data)
    }
    catch (err) {
        return Promise.reject(err)
    }
}

export const deletePage = (id) => async (dispatch) => {
    try {

        const res = await PageService.remove(id)
        dispatch({
            type: DELETE_CONTENT,
            payload: { id }
        })
    }
    catch (err) {
        console.log(err)
    }
}