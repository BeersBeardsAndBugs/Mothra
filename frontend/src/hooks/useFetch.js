import { useState, useReducer, useRef, useEffect } from 'react'

const dataReducer = (objects, { type, payload }) => {
    switch (type) {
        case 'add':
            return [...objects, payload]
        case 'remove':
            return objects.filter((object) => object.id !== payload)
        case 'edit':
            return objects.map((object) =>
                object.id === payload.id ? { ...object, ...payload } : object
            )
        case 'replace':
            return payload
        default:
            return objects
    }
}

export const useFetch = (basePath, defaultResponse = null) => {
    const [storedPath] = useState(basePath)
    const [response, dispatchResponse] = useReducer(
        dataReducer,
        defaultResponse
    )
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const responseRef = useRef()
    // useEffect(() => {

    // })

    const handleError = (error) => {
        // alert(
        //     ` An error occurred while attempting to communicate to database. Please try again. \nError: ${error}`
        // )
        console.log('this is the error of responseRef ', responseRef.current)
        setError(error)
        dispatchResponse({
            type: 'replace',
            payload: responseRef.current,
        })
    }

    const dataFetch = async (method, pathExtention = '', options) => {
        const headers = options['headers']
        const body = options['body']
        setIsLoading(true)
        try {
            let options = {
                method,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    ...headers,
                },
            }
            if (['post', 'put'].some((item) => item === method)) {
                options = { ...options, body: JSON.stringify(body) }
            }
            console.log('SENT', {
                path: storedPath + pathExtention,
                options,
            })
            const res = await fetch(storedPath + pathExtention, options)
            console.log('RESPONSE', res)
            if (res.status !== 200) {
                handleError(res.status)
            } else {
                console.log('res = ', res)
                const json = await res.json()
                console.log('DATA', json)
                if (method === 'get' || (method === 'post' && pathExtention)) {
                    dispatchResponse({ type: 'replace', payload: json })
                }
            }
        } catch (err) {
            console.log('error = ', err)
            handleError(err)
        } finally {
            setIsLoading(false)
        }
    }

    const reset = () => {
        dispatchResponse({ type: 'replace', payload: defaultResponse })
    }

    const getAll = (_headers) => {
        dataFetch('get', '', { headers: _headers })
    }

    const special = (path, body) => {
        dataFetch('post', path, { body })
    }

    const add = (body) => {
        responseRef.current = response
        dispatchResponse({ type: 'add', payload: body })
        dataFetch('post', '', { body })
    }

    const getById = (id) => {
        dataFetch('get', `/${id}`, { headers: {}, body: {} })
    }

    const edit = (body) => {
        console.log('id', body.id)
        dispatchResponse({ type: 'edit', payload: body })
        dataFetch('put', `/${body.id}`, { body })
    }

    const remove = (id) => {
        dispatchResponse({ type: 'remove', payload: id })
        dataFetch('delete', `/${id}`, {})
    }

    return [
        {
            response,
            error,
            isLoading,
            getAll,
            add,
            getById,
            edit,
            remove,
            special,
            reset,
        },
    ]
}
