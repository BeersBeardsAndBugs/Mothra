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

function _useFetch_(_path_: string, _initialValue_: any) { return [_state_]: ObjectArray }

useFetch is used to create and manage state that:

-   originates from the database
-   must remain in sync with the database
-   and can have CRUD operations performed on by the user

Return _state_ Properties

-   _response_: any - holds the data in state from the fetch response
    -   Example:
        ```jsx
        {
            moths.response.map((moth, index) => (
                <li key={`moth${index}`}>{moth.name}</li>
            ))
        }
        // <li>Mothra</li>
        // <li>Venomoth</li>
        ```
-   _error_: string - fetch error message
    -   Example:
        ```jsx
        <div>{moths.error}</div>
        // net::ERR_CONNECTION_TIMED_OUT
        ```
-   _isLoading_: boolean

    -   is fetch promise pending

-   _getAll_(\__headers_): function

    -   uses get reqeust to fetch data from the path specified in the _useFetch_(_path_, _initialValue_) invocation

-   _getById_(_id_): function

    -   get request that adds id parameter to api path

-   _add_(_body_): function

    -   post request for creating new data
    -   optimisticly updates UI, reverts to previous state if fetch fails

-   _edit_(_body_): function

    -   put request for updating existing data
    -   optimisticly updates UI, reverts to previous state if fetch fails

-   _remove_(_id_): function

    -   delete request for deleting existing data
    -   optimisticly updates UI, reverts to previous state if fetch fails

-   _special_(_path_, _body_): function

    -   post request that accepts custom path

-   _reset_(): function
    -   restores response state to initialValue provided at useFetch(_path_, _initialValue_) invocation

#### Code Examples

1.  Invoke to initialize state

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

    // when data is an object/string and an id needs to be specified
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
                    {moths.response.map((moth, index) => (
                        <li key={index}>{moth.name}</li>
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

#### Description

function _useForm_(_inputsSchema_, _onSubmit_) {
&nbsp;&nbsp;&nbsp;&nbsp;return { _handleSubmit_: function, _handleOnChange_: function, _inputs_: object, _isSubmitDisabled_: boolean }: Object
}

useForm is used to manage state for forms with:

-   controlled inputs
-   need validation

Parameters

-   _inputsSchema_: object

    -   contains the input names and validation to be used

    -   each key correlates to a controlled input name

    -   Input Object Properties
        -   _value_: string
            -   initial value
        -   _error_: string
            -   initial error
        -   _name_: string
            -   holds copy of key value to identify input/state correlation
        -   _required_: boolean
            -   determines whether input is required to have a value in order to submit
        -   _validator_?: object
            -   contains validation requirements, and error text
                -   _regEx_: object
                    -   contains regular expression to test against value for validation
                    -   /^[a-zA-Z\]\$/
                -   _error_: string
                    -   inputs.error value to be set if regex test fails
        -   _type_?: string
            -   correlates to type prop on jsx input tag

-   _onSubmit_(): function
    -   given function for what to do with the resulting form submitted object

Result _Object_ Properties

-   _handleSubmit_(_event_): function

    -   handles event when submit-type button is pressed in form, validates inputs, and then creates fetch body object which is passed to the given onSubmit function

-   _handleOnChange_(_event_): function

    -   handles input onChange event to keep state in sync with form

-   _inputs_: object

    -   holds current state of each input value, associated error, and other relative information
    -   Properties
        -   _value_: string
            -   used for value prop on input jsx tag
        ```jsx
        <input value={inputs[NAME].value} />
        ```
        -   _error_: string
            -   used for name prop on input jsx tag
        ```jsx
        <div>{inputs[NAME].error}</div>
        ```

-   _isSubmitDisabled_: boolean

    -   disables submit button on initial load, and when form inputs are not valid

#### Code Examples

1.  Form Component

    ```jsx
    import React from 'react'
    import { MOTH } from '../../constants'
    import { useForm } from '../../hooks'

    export const MothForm = () => {
        const inputSchema = {
            [MOTH.NAME]: {
                value: '',
                error: '',
                name: MOTH.NAME,
                required: true,
                validator: {
                    regEx: /^([a-zA-Z]$/,
                    error: 'Name must only contain letters.',
                },
            },
            [MOTH.QUANTITY]: {
                value: 0,
                error: '',
                name: MOTH.QUANTITY,
                required: false,
            },
        }

        const onSubmit = (newMoth) => {
            moths.add(onsubmit)
        }

        const {
            handleSubmit,
            handleOnChange,
            inputs,
            isSubmitDisabled,
        } = useForm(inputsSchema, onSubmit)

        return (
            <form onSubmit={handleSubmit}>
                <div>
                    <label>{MOTH.NAME}:</label>
                    <input
                        name={[MOTH.NAME]}
                        value={inputs[MOTH.NAME].value}
                        onChange={handleOnChange}
                    />
                </div>
                <div>{inputs[MOTH.NAME].error}</div>

                <div>
                    <label>{MOTH.QUANTITY}:</label>
                    <input
                        name={[MOTH.QUANTITY]}
                        value={inputs[MOTH.QUANTITY].value}
                        onChange={handleOnChange}
                    />
                </div>
                <div>{inputs[MOTH.QUANTITY].error}</div>

                <button type="submit" disabled={isSubmitDisabled}>
                    Add Moth
                </button>
            </form>
        )
    }
    ```

### useMenu
