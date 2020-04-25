import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import React, { useState } from 'react'
import { BUG, COMMENT, PATH } from '../../../constants'
import { useForm } from '../../../hooks'
import { post } from '../../../utils'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import IconButton from '@material-ui/core/IconButton'
import SettingsOverscanIcon from '@material-ui/icons/SettingsOverscan'
import Avatar from '@material-ui/core/Avatar'
import Divider from '@material-ui/core/Divider'
import CardHeader from '@material-ui/core/CardHeader'
import theme from '../../../theme'

const useStyles = makeStyles((theme) => ({
    pictureContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: 500,
        height: 450,
    },

    title: {
        color: theme.palette.primary.light,
    },
    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
}))

const pictures = [
    { img: 'jpg_img.JPG', title: '.jpg upload', author: 'Preston' },
    { img: 'gif_img.gif', title: '.gif upload', author: 'Jordon' },
    { img: 'ultrawide_img.png', title: 'ultrawide upload', author: 'Alex' },
    { img: 'png_img.png', title: '.png upload', author: 'Alex' },
]

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
        const result = await post(PATH.COMMENT, body, error)

        if (result) {
            console.log(result)
        }
    }

    return (
        <Grid container justify="flex-start" alignItems="stretch" spacing={2}>
            {/*   Bug Detail Title Banner   */}
            <Grid item xs={12}>
                <Card>
                    <CardContent>
                        <Typography variant="h2">
                            {visibleBug[BUG.TITLE]}
                        </Typography>
                        <br />
                        <Typography variant="subtitle1">
                            ID: {visibleBug[BUG.ID]}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>

            {/*   Bug Detail Description and Images  
        <Grid container item xs={7} alignItems="stretch" direction="column" spacing={2}>
*/}
            {/*   Bug Description Details   */}
            <Grid item xs={12} sm={7}>
                <Card>
                    <CardContent>
                        <Typography variant="body1">
                            Status: {visibleBug[BUG.STATUS]}
                        </Typography>
                        <Typography variant="body1">
                            Bug Priority: {visibleBug[BUG.PRIORITY]}
                        </Typography>
                        <Typography variant="body1">
                            Current Owner: {visibleBug[BUG.ASSIGNED_TO]}
                        </Typography>
                        <Typography variant="body1">
                            Last Updated: {visibleBug[BUG.UPDATED_LAST]} by{' '}
                            {visibleBug[BUG.UPDATED_BY]}
                        </Typography>
                        <Typography variant="body1">
                            Created: {visibleBug[BUG.CREATED_DATE]} by{' '}
                            {visibleBug[BUG.CREATED_BY]}
                        </Typography>
                        <br />
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
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            Save Change
                        </Button>
                    </CardContent>
                </Card>
            </Grid>

            {/*   Bug Detail Images   */}
            <Grid item xs={12} sm={5}>
                <Card>
                    <CardContent>
                        <div className={classes.pictureContainer}>
                            <GridList
                                cellHeight={160}
                                className={classes.gridList}
                                cols={3}
                            >
                                {' '}
                                {pictures.map((tile) => (
                                    <GridListTile key={tile.img}>
                                        <img
                                            src={tile.img}
                                            alt={tile.title}
                                            cols={tile.cols || 1}
                                        />
                                        <GridListTileBar
                                            title={tile.title}
                                            classes={{
                                                root: classes.titleBar,
                                                title: classes.title,
                                            }}
                                            actionIcon={
                                                <IconButton
                                                    aria-label={`star ${tile.title}`}
                                                >
                                                    <SettingsOverscanIcon
                                                        className={
                                                            classes.title
                                                        }
                                                    />
                                                </IconButton>
                                            }
                                        />
                                    </GridListTile>
                                ))}
                            </GridList>
                        </div>
                    </CardContent>
                </Card>
            </Grid>

            {/* </Grid> */}

            {/*   Comments Section  
    <Grid container item xs={5} alignItems="stretch" spacing={2}>
    */}
            <Grid item xs={12} sm={12}>
                <Card>
                    <CardContent>
                        <CardHeader title="Comments"></CardHeader>

                        {/*   New Comment Starts here   */}
                        {visibleBug.comments.map((comment, index) => {
                            return (
                                <Card
                                    style={{
                                        padding: '20px 20px',
                                        marginTop: 10,
                                    }}
                                    key={`${
                                        visibleBug[BUG.ID]
                                    }-comment-${index}`}
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
                                                    src={
                                                        comment[COMMENT.USER] +
                                                        '.jpg'
                                                    }
                                                    colorDefault={
                                                        theme.palette.primary
                                                            .main
                                                    }
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
                                                    {comment.date}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            )
                        })}

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
                            onChange={handleOnChange}
                            variant="outlined"
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            Save Comment
                        </Button>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}
