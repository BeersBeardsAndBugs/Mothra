import { useState, useReducer, useRef, useEffect } from 'react'

const dataReducer = (objects, { type, payload }) => {
    switch (type) {
        case 'add':
            return [...objects, payload]
        case 'remove':
            return objects.filter((object) => object.id !== payload)
        case 'edit':
            return objects.map((object) =>
                object['id'] === payload['id']
                    ? { ...object, ...payload }
                    : object
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

    const handleError = (error) => {
        setError(error)
        dispatchResponse({
            type: 'replace',
            payload: responseRef.current,
        })
    }

    const dataFetch = async (method, pathExtention = '', options) => {
        const headers = options['headers']
        const body = options['body']
        const type = options['type']
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
                const json = await res.json()
                console.log('DATA', json)
                if (type) {
                    dispatchResponse({ type, payload: json })
                }
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
        dataFetch('get', '', { headers: _headers, type: 'replace' })
    }

    const special = (path, body) => {
        dataFetch('post', path, { body, type: 'replace' })
    }

    const add = (body) => {
        responseRef.current = response
        // dispatchResponse({ type: 'add', payload: body }) // removed optimistic update for add
        dataFetch('post', '', { body, type: 'add' })
    }

    const getById = (id) => {
        dataFetch('get', `/${id}`, { type: 'replace' })
    }

    const edit = (body) => {
        responseRef.current = response
        dispatchResponse({ type: 'edit', payload: body })
        dataFetch('put', `/${body.id}`, { body })
    }

    const remove = (id) => {
        responseRef.current = response
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
