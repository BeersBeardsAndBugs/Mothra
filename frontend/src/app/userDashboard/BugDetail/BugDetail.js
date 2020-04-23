import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Paper from '@material-ui/core/Paper'
import MenuItem from '@material-ui/core/MenuItem'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import React, { useState } from 'react'
import { BUG, COMMENT, OPTIONS_BUG_PRIORITY, PATH_NEW_COMMENT } from '../../../constants'
import { useForm } from '../../../hooks'
import { post } from '../../../utils'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import SettingsOverscanIcon from '@material-ui/icons/SettingsOverscan';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import CardHeader from '@material-ui/core/CardHeader';
import theme from "../../../theme";



const useStyles = makeStyles((theme) => ({


      gridList: {
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
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
    { img: "jpg_img.JPG", title: '.jpg upload', author: 'Preston'},
    { img: "gif_img.gif", title: '.gif upload', author: 'Jordon'},
    { img: "ultrawide_img.png", title: 'ultrawide upload', author: 'Alex'},
    { img: "png_img.png", title: '.png upload', author: 'Alex'}
];

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
    <Grid container justify="flex-start" spacing={2}>

        {/*   Bug Detail Title Banner   */}
        <Grid item xs={12}>
             <Card>
                <CardContent>
                    <Typography variant="h2" >
                        {visibleBug[BUG.TITLE]}
                    </Typography>
                    <br/>
                    <Typography variant="subtitle1">
                        ID: {visibleBug[BUG.ID]}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>


        {/*   Bug Detail Description and Images  */}
        <Grid container item xs={7} alignItems="stretch" direction="column" spacing={2}>

        {/*   Bug Description Details   */}
        <Grid item>
            <Card>
                <CardContent>
                <Typography>
                    Status: {visibleBug[BUG.STATUS]}
                </Typography>
                <Typography>
                    Bug Priority: {visibleBug[BUG.PRIORITY]}
                </Typography>
                <Typography>
                    Current Owner: {visibleBug[BUG.ASSIGNED_TO]}
                </Typography>
                <Typography>
                    Last Updated: {visibleBug[BUG.UPDATED_LAST]}
                </Typography>
                <Typography>
                    Created By: {visibleBug[BUG.CREATED_BY]} on {visibleBug[BUG.CREATED_DATE]}
                </Typography>
                <Typography>
                    Created On: {visibleBug[BUG.CREATED_BY]} on {visibleBug[BUG.CREATED_DATE]}
                </Typography>
                <br/>
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
                </CardContent>
            </Card>
        </Grid>

        {/*   Bug Detail Images   */}
        <Grid item>
            <Card>
                <CardContent>
                <GridList className={classes.gridList} cols={1.5}> {pictures.map((tile) => (
                    <GridListTile key={tile.img}>
                        <img src={tile.img} alt={tile.title} />
                        <GridListTileBar 
                            title={tile.title} 
                            classes={{ root: classes.titleBar,title: classes.title,}}
                            actionIcon={
                                <IconButton aria-label={`star ${tile.title}`}>
                                    <SettingsOverscanIcon className={classes.title} />
                                </IconButton>
                                }
                        />
                    </GridListTile>
                ))}
                </GridList>
                </CardContent>
            </Card>
        </Grid>
    </Grid>


    {/*   Comments Section  */}
    <Grid container item xs={5} alignItems="stretch" spacing={2}>
        <Grid item xs={12}>
          <Card >
            <CardContent>
                <CardHeader title="Comments"></CardHeader>
                {/*   New Comment Starts here   */}

                {visibleBug.comments.map((comment, index) => {return (
                <Card style={{ padding: "20px 20px", marginTop: 10 }} key={`${visibleBug[BUG.ID]}-comment-${index}`}>
                    <CardContent>
                    <Grid container wrap="nowrap" spacing={2}>
                        <Grid item>
                            <Avatar alt="" src={comment[COMMENT.USER] + '.jpg'} colorDefault={theme.palette.primary.main}/>
                        </Grid>
                        <Grid justifyContent="left" item xs zeroMinWidth>
                            <Typography variant="h6">
                                {comment[COMMENT.USER]}
                            </Typography>
                            <br/>
                            <Typography >
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
            </CardContent>
          </Card>
        </Grid>
    </Grid>






    {/*
            <form className={classes.form}
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

            */}



        </Grid>

    )
}
