import React, { useState } from 'react'
import { useForm } from '../../../hooks'
import { Input } from '../../_shared'
import { makeStyles } from '@material-ui/core/styles'
import { post } from '../../../utils'
import { NEW_COMMENT } from '../../../constants'

const useStyles = makeStyles((theme) => ({
    matTheme: {
        backgroundColor: theme.palette.background.paper,
    },
}))

export const BugDetail = ({ visibleBug, userEmail }) => {
    const TITLE = 'title'
    const PRIORITY = 'priority'
    const DESCRIPTION = 'description'
    const COMMENTS = 'comments'
    const HISTORY = 'history'

    const inputsSchema = {
        [TITLE]: {
            value: visibleBug.title,
            error: '',
            name: TITLE,
            required: true,
        },
        [PRIORITY]: {
            value: visibleBug.priority,
            error: '',
            name: PRIORITY,
            required: true,
        },
        [DESCRIPTION]: {
            value: visibleBug.description,
            error: '',
            name: DESCRIPTION,
            required: true,
        },
        [COMMENTS]: {
            value: visibleBug.comments,
            error: '',
            name: COMMENTS,
            required: true,
        },
        [HISTORY]: {
            value: visibleBug.history,
            error: '',
            name: HISTORY,
            required: true,
        },
    }
    const formSubmit = () => {
        return true
    }

    const { handleSubmit, handleOnChange, inputs, isSubmitDisabled } = useForm(
        inputsSchema,
        formSubmit
    )

    const handleOnBlur = () => {
        // do stuff when an input is clicked away from
    }
    // <select name="myDropdown" value={myDropdown} onChange={handleOnChange}>
    //     <option value=""></option>
    // </select>

    const [newComment, setNewComment] = useState('')

    const handleCommentSubmit = async (e) => {
        e.preventDefault()
        const body = {
            bug: visibleBug.id,
            user: userEmail,
            text: newComment,
        }
        const error = (e) => {
            console.log(e)
        }
        const result = await post(NEW_COMMENT, body, error)

        if (result) {
            console.log(result)
        }
    }
    return (
        <div className="mdc-card">
            <form className="bugDetail_form" onSubmit={handleSubmit}>
                <h1>{visibleBug.title}</h1>
                <h3>Priority</h3>
                <Input {...{ input: inputs[PRIORITY], handleOnChange }} />
                <h3>Description</h3>
                <Input {...{ input: inputs[DESCRIPTION], handleOnChange }} />
                <h3>Date Created: {visibleBug.dateCreated}</h3>
                <h3>Created By: {visibleBug.createdBy}</h3>
                <h3>Status: {visibleBug.status}</h3>
                <div>{visibleBug.attachments}</div>

                <button type="submit" name="submit" className="btn">
                    Save Changes
                </button>
            </form>
            {visibleBug.comments.map((comment, index) => {
                return (
                    <div key={`${visibleBug.id}-comment-${index}`}>
                        <div>{`${comment.user} - ${comment.date}`}</div>
                        <div>{comment.text}</div>
                    </div>
                )
            })}
            <form onSubmit={handleCommentSubmit}>
                <label htmlFor="">Add Comment</label>
                <input
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />
                <button type="submit">Save Comment</button>
            </form>
            <h3>History</h3>
            {/* <Input {...{ input: inputs[HISTORY], handleOnChange }} /> */}
        </div>
    )
}
