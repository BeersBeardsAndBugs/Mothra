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
    useEffect(() => {
        responseRef.current = response
    })

    const handleError = (error) => {
        alert(
            `Error while saving changes to database. Please try again. \nError: ${error}`
        )
        setError(error)
        dispatchResponse({
            type: 'replace',
            payload: responseRef.current,
        })
    }

    const dataFetch = async (method, pathExtention = '', { headers, body }) => {
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
            const res = await fetch(storedPath + pathExtention, options)

            if (res.status !== 200) {
                handleError(res.status)
            } else {
                const json = await res.json()
                console.log('json', json)
                dispatchResponse({ type: 'replace', payload: json })
            }
        } catch (err) {
            handleError(err)
        } finally {
            setIsLoading(false)
        }
    }

    const reset = () => {
        dispatchResponse({ type: 'replace', payload: defaultResponse })
    }

    const getAll = (_headers) => {
        dataFetch('get', '', { _headers })
    }

    const login = (path, body) => {
        dataFetch('post', path, { body })
    }

    const add = (body) => {
        dispatchResponse({ type: 'add', payload: body })
        dataFetch('post', '', { body })
    }

    const getById = (id) => {
        dataFetch('get', `/${id}`)
    }

    const edit = (body) => {
        dispatchResponse({ type: 'edit', payload: body })
        dataFetch('put', `/${body.id}`, { body })
    }

    const remove = (id) => {
        dispatchResponse({ type: 'remove', payload: id })
        dataFetch('delete', `/${id}`)
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
            login,
            reset,
        },
    ]
}
