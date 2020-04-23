import { useState, useEffect } from 'react'

const useFetch = (basePath) => {
    const [storedPath] = useState(basePath)
    const [response, setResponse] = useState(null)
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [headers] = useState({
        Accept: 'application/json',
        'Content-Type': 'application/json',
    })

    const dataFetch = async (method, pathExtention = '', body) => {
        setIsLoading(true)
        try {
            const options = { method, headers }
            if (['post', 'put'].some((item) => item === method))
                options = { ...options, body: JSON.stringify(body) }

            const res = await fetch(storedPath + pathExtention, options)

            if (res.status !== 200) {
                setResponse(null)
            } else {
                const json = await res.json()
                setResponse(json)
            }
        } catch (error) {
            setError(error)
        } finally {
            setIsLoading(false)
        }
    }

    // Read all
    const getAll = () => {
        dataFetch('get')
    }

    // Create One
    const add = () => {
        dataFetch('post')
    }

    const getById = (id) => {
        dataFetch('get', `/${id}`)
    }

    const edit = (body) => {
        dataFetch('put', `/${body.id}`)
    }
    const remove = (body) => {
        dataFetch('put', `/${id}`)
    }

    return { response, error, isLoading }
}

// get all:
// @app.route("/bugs")

// create one:
// @app.route("/bugs", methods=["POST"])

// read one:
// @app.route("/bugs/<id>")

// update one:
// @app.route("/bugs/<id>", methods=["PUT"])

// delete one:
// @app.route("/bugs/<id>", methods=["DELETE"])
