export const post = async (path, body, error) => {
    try {
        let res = await fetch(path, {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })
        if (res.status !== 200) {
            return null
        }
        const json = await res.json()
        return json
    } catch (e) {
        console.log('Caught Error!')
        error(e)
    }
}

export const get = async (path, error) => {
    try {
        let res = await fetch(path, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        if (res.status !== 200) {
            return null
        }
        const json = await res.json()
        return json
    } catch (e) {
        console.log('Caught Error!')
        error(e)
    }
}
