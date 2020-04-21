import React, { useState } from 'react'
import { useForm } from '../../../hooks'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import { post } from '../../../utils'
import {
    PATH_NEW_COMMENT,
    BUG,
    COMMENT,
    OPTIONS_BUG_PRIORITY,
} from '../../../constants'

const useStyles = makeStyles((theme) => ({
    bugDetail: {
        padding: '1rem',
    },
}))

export const BugDetail = ({ visibleBug, userEmail }) => {
    const classes = useStyles()
    const inputsSchema = {
        [BUG.DESCRIPTION]: {
            value: visibleBug[BUG.DESCRIPTION],
            error: '',
            name: BUG.DESCRIPTION,
            required: true,
        },
        [BUG.PRIORITY]: {
            value: visibleBug[BUG.PRIORITY],
            error: '',
            name: BUG.PRIORITY,
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
            bug: visibleBug[COMMENT.TEXT],
            user: userEmail,
            text: newComment,
        }
        const error = (e) => {
            console.log(e)
        }
        const result = await post(PATH_NEW_COMMENT, body, error)

        if (result) {
            console.log(result)
        }
    }
    return (
        <div className={classes.bugDetail}>
            <form
                className="bugDetail_form"
                onSubmit={handleSubmit}
                autocomplete="off"
            >
                <Box
                    display="flex"
                    p={1}
                    bgcolor="background.paper"
                    alignItems="center"
                >
                    <Box p={3} flexGrow={1}>
                        <Typography variant="h3">
                            {visibleBug[BUG.TITLE]}
                        </Typography>
                    </Box>
                    <Box p={3}>
                        <Typography variant="h5">
                            {visibleBug[BUG.ID]}
                        </Typography>
                    </Box>
                    <Box p={3}>
                        <TextField
                            select
                            label="Priority"
                            name={BUG.PRIORITY}
                            value={inputs[BUG.PRIORITY].value}
                            onChange={handleOnChange}
                            variant="outlined"
                        >
                            {OPTIONS_BUG_PRIORITY.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Box>
                </Box>
                <Grid container p={3} direction="row">
                    <Grid item container xs direction="row">
                        <TextField
                            fullWidth
                            id="standard-textarea"
                            label="Description"
                            placeholder="Description"
                            multiline
                            rows={4}
                            name={BUG.DESCRIPTION}
                            value={inputs[BUG.DESCRIPTION].value}
                            onChange={handleOnChange}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item container xs direction="column">
                        <Grid
                            item
                            container
                            direction="row"
                            alignItems="center"
                            spacing={3}
                        >
                            <Grid item container xs justify="flex-end">
                                <Typography variant="body1">
                                    Assigned To:
                                </Typography>
                            </Grid>
                            <Grid item xs>
                                <Typography variant="body1">
                                    {visibleBug[BUG.ASSIGNED_TO]}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid
                            item
                            container
                            direction="row"
                            justify="center"
                            alignItems="center"
                            spacing={3}
                        >
                            <Grid item container xs justify="flex-end">
                                <Typography variant="body1">Status:</Typography>
                            </Grid>
                            <Grid item xs>
                                <Typography variant="body1">
                                    {visibleBug[BUG.STATUS]}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item container direction="row" spacing={3}>
                            <Grid item container xs justify="flex-end">
                                <Typography variant="body1">
                                    Created By:
                                </Typography>
                            </Grid>
                            <Grid item xs>
                                <Typography variant="body1">
                                    {visibleBug[BUG.CREATED_BY]}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item container direction="row" spacing={3}>
                            <Grid item container xs justify="flex-end">
                                <Typography variant="body1">
                                    Created Date:
                                </Typography>
                            </Grid>
                            <Grid item xs>
                                <Typography variant="body1">
                                    {visibleBug[BUG.CREATED_DATE]}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Button type="submit" variant="contained" color="primary">
                    Save Changes
                </Button>
            </form>
            <Box>
                <Typography variant="h5">Comments</Typography>
            </Box>
            {visibleBug.comments.map((comment, index) => {
                return (
                    <Box p={3} key={`${visibleBug[BUG.ID]}-comment-${index}`}>
                        <Box display="flex" justify="flex-end">
                            <Box flexGrow={1}>{comment[COMMENT.USER]}</Box>
                            <Box>{comment[COMMENT.DATE]}</Box>
                        </Box>
                        <Box>
                            <Box>{comment[COMMENT.TEXT]}</Box>
                        </Box>
                    </Box>
                )
            })}
            <form onSubmit={handleCommentSubmit}>
                <TextField
                    fullWidth
                    id="standard-textarea"
                    label="Enter Comment"
                    placeholder="What's on your mind?™"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    variant="outlined"
                />
                <Button type="submit" variant="contained" color="primary">
                    Save Comment
                </Button>
            </form>
        </div>
    )
}
