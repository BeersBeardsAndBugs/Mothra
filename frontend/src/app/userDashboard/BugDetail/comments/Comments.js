import Avatar from '@material-ui/core/Avatar'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import CardHeader from '@material-ui/core/CardHeader'
import theme from '../../../../theme'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import React, { useState } from 'react'
import { COMMENT } from '../../../../constants'
import { makeStyles } from '@material-ui/core/styles'
import { dateTimeNowText } from '../../../../utils'

export const Comments = ({ comments, bugId, userEmail }) => {
    const useStyles = makeStyles((theme) => ({
        commentsContainer: {
            maxHeight: '400px',
            overflowY: 'auto',
        },
    }))

    const classes = useStyles()

    const [newComment, setNewComment] = useState('')

    const handleSubmit = () => {
        comments.add({
            [COMMENT.TEXT]: newComment,
            bugId,
            [COMMENT.USER]: userEmail,
            [COMMENT.DATE]: dateTimeNowText(),
        })
        setNewComment('')
    }

    return (
        <Grid item xs={12} sm={12}>
            <Card>
                <CardContent>
                    <CardHeader title="Comments"></CardHeader>
                    <div className={classes.commentsContainer}>
                        {/*   New Comment Starts here   */}
                        {comments.response.map((comment, index) => {
                            return (
                                <Card
                                    style={{
                                        padding: '20px 20px',
                                        marginTop: 10,
                                    }}
                                    key={`${bugId}-comment-${index}`}
                                >
                                    <CardContent>
                                        <Grid
                                            container
                                            wrap="nowrap"
                                            spacing={2}
                                        >
                                            <Grid item>
                                                <Avatar
                                                    alt=""
                                                    // src={
                                                    //     comment[COMMENT.USER] +
                                                    //     '.jpg'
                                                    // }
                                                    // colorDefault={
                                                    //     theme.palette.primary
                                                    //         .main
                                                    // }
                                                />
                                            </Grid>
                                            <Grid
                                                justifyContent="left"
                                                item
                                                xs
                                                zeroMinWidth
                                            >
                                                <Typography variant="h6">
                                                    {comment[COMMENT.USER]}
                                                </Typography>
                                                <br />
                                                <Typography>
                                                    {comment[COMMENT.TEXT]}
                                                </Typography>
                                                <Typography variant="caption">
                                                    {comment[COMMENT.DATE]}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            )
                        })}
                    </div>
                    <Divider></Divider>

                    <br />
                    <TextField
                        fullWidth
                        id="standard-textarea"
                        label="Enter Comment"
                        placeholder="What's on your mind?"
                        multiline
                        rows={4}
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        variant="outlined"
                    />
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        color="primary"
                    >
                        Save Comment
                    </Button>
                </CardContent>
            </Card>
        </Grid>
    )
}
