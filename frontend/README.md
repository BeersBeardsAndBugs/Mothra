This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

## Custom Hooks

### useFetch

#### Description

_function_ useFetch(path, initialValue)

useFetch is used to manage state that:

-   originates in the database
-   must remain in sync with the database
-   and can have CRUD operations performed on by the user

Properties

-   response
    -   _object_, holds the data in state from the fetch response
    -   Example:
        ```jsx
        {
            moths.response.map((moth) => <li>{moth.name}</li>)
        }
        // <li>Mothra</li>
        // <li>Venomoth</li>
        ```
-   error
    -   _string_, fetch error message
    -   Example:
        ```jsx
        <>{moths.error}</>
        // net::ERR_CONNECTION_TIMED_OUT
        ```
-   isLoading
    -   _boolean_, is fetch promise pending
-   getAll(\__headers_)

    -   _function_, uses get reqeust to fetch data from the path specified in the useFetch(_path_, _initialValue_) initialization

-   getById(_id_)
    -   _function_, get request that adds id parameter to api path
-   add(_body_)
    -   _function_, post request for creating new data
    -   optimisticly updates UI, reverts to previous state if fetch fails
-   edit(_body_)
    -   _function_, put request for updating existing data
    -   optimisticly updates UI, reverts to previous state if fetch fails
-   remove(_id_)
    -   _function_, delete request for deleting existing data
    -   optimisticly updates UI, reverts to previous state if fetch fails
-   special(_path_, _body_)
    -   _function_, post request that accepts custom path
-   reset()
    -   _function_, restores response state to initialValue provided at useFetch(_path_, _initialValue_) initialization

#### Code Examples

1.  Initialize

    ```jsx
    // when data is an array
    const [moths] = useFetch(PATH.MOTH, []) // PATH.MOTH = "/moth"

    // when data is an object/string
    const [moth] = useFetch(PATH.MOTH, null)
    // or
    const [moth] = useFetch(PATH.MOTH, {})
    ```

2.  Get Initial Data

    ```jsx
    // when data is an array or always a single object/string
    useEffect(() => {
        moths.getAll()
    },[])

    // when data is an object/string and id needs to be specified
    <button onClick={() => moth.getById(id)}Search by Id</button>
    ```

3.  Component with CRUD

    -   Create

        ```jsx
        import React, { useState } from 'react'

        export const NewMoth = ({ moths }) => {
            const [newMoth, setNewMoth] = useState({ name: '' })

            return (
                <li>
                    <input
                        value={newMoth}
                        onChange={(e) => setNewMoth((prev => {...prev, name: e.target.value})}
                    />
                    <button onClick={() => moths.add(newMoth)}>Add</button>
                </li>
            )
        }
        ```

    -   Read

        ```jsx
        import React, { useState, useEffect } from 'react'
        import { useFetch } from '../hooks'
        import { PATH } from '../constants'

        export const Moths = () => {
            const [moths] = useFetch(PATH.MOTH, [])

            useEffect(() => {
                moths.getAll()
            }, [])

            return (
                <ol>
                    {moths.response.map((moth) => (
                        <li>{moth.name}</li>
                    ))}
                </ol>
            )
        }
        ```

    -   Update

        ```jsx
        import React, { useEffect } from 'react'
        import { useFetch } from '../hooks'
        import { PATH } from '../constants'
        import { MothEdit } from './editMoth'

        export const MothContainer = () => {
            const [moths] = useFetch(PATH.MOTH, [])

            useEffect(() => {
                moths.getAll()
            }, [])

            const inputSchema = [
                    [MOTH.NAME]: {
                    value: moths.response[MOTH.NAME],
                    error: '',
                    name: MOTH.NAME,
                    required: true,
                }
            ]

            const onSubmit = (editedMoth) => {
                moths.edit(editedMoth)
            }

            const mothForm = useForm(inputsSchema,onSubmit)

            return <MothEdit {...{mothForm}}/>
        ```

        ```jsx
        import React from 'react'
        import { MOTH } from '../constants'

        export const MothEdit = ({ mothForm }) => {
            return (
                <li>
                    <input
                        name={MOTH.NAME}
                        value={mothForm.inputs[MOTH.NAME].value}
                        onChange={mothForm.handleOnChange}
                    />
                    <button onClick={mothForm.handleSubmit}>
                        Save Changes
                    </button>
                </li>
            )
        }
        ```

    -   Delete

        ```jsx
        import React from 'react'

        export const DeleteMoth = ({ moths }) => {
            return (
                <ol>
                    {moths.response.map((moth) => (
                        <li>
                            {moth.name}
                            <button onClick={() => moths.remove(moth.id)}>
                                Remove
                            </button>
                        </li>
                    ))}
                </ol>
            )
        }
        ```

#### Special Use

```jsx
const [moths] = useFetch('', null)

const mothToBeVerified = moths.isLoading || moths.response[0]

const VerifyBtn = <button onClick={() => moths.special(PATH.VERIFY_AND_RETURN, mothToBeVerified)}>
```

### useForm

### useMenu
