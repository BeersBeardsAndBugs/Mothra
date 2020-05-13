import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import React from 'react'
import { BUG, PATH, USER, OPTIONS_BUG_PRIORITY, OPTIONS_BUG_STATUS } from '../../../constants'
import { useForm, useFetch } from '../../../hooks'
import { Comments } from './comments'
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Checkbox from '@material-ui/core/Checkbox'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import BugReportIcon from '@material-ui/icons/BugReportRounded'
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

const useStyles = makeStyles((theme) => ({
    pictureContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        backgroundColor: theme.palette.background.paper,
        height: '300px',
        overflowY: 'auto',
        overflowX: 'hidden',
    },
    detailsContainer: {
        minHeight: '300px',
    },
    title: {
        color: theme.palette.primary.light,
    },
    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    // CSS Trick to handle Material Defect that causes horizontal overflow on Grid spacing
    // We'll use this until Google decides to fix the issue. Tho its been around for over a year...
    // grid: {
    //     margin: theme.spacing(0),
    //     flexGrow: 0,
    //     maxWidth: `100%`,
    //     flexBasis: `100%`,
    // },
    gridList: {
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    forceInline : {
        display: 'inline-block',
        margin: 'auto',
    },
    Blocker: {
        background: '#b71c1c',
    },
    Critical: {
        background: '#e53935',
    },
    High: {
        background: '#fb8c00',
    },
    Normal: {
        background: '#fdd835',
    },
    Enhancement: {
        background: '#8bc34a',
    },
}))

const pictures = [
    { img: 'jpg_img.JPG', title: '.jpg upload', author: 'Preston' },
    { img: 'gif_img.gif', title: '.gif upload', author: 'Jordon' },
    { img: 'ultrawide_img.png', title: 'ultrawide upload', author: 'Alex' },
    { img: 'png_img.png', title: '.png upload', author: 'Alex' },
]

export const BugDetail = ({ add, users, editBugSubmit, visibleBug, userEmail }) => {
    const [comments] = useFetch(PATH.COMMENT, visibleBug.comments)
    const classes = useStyles()
    const [watchers, setWatchers] = React.useState([]);
    const handleTagsChange = (event) => {
        setWatchers(event.target.value);
    };

    const inputsSchema = {
        [BUG.TITLE]: {
            value: visibleBug[BUG.TITLE],
            error: '',
            name: BUG.TITLE,
            required: true,
        },
        [BUG.DESCRIPTION]: {
            value: visibleBug[BUG.DESCRIPTION],
            error: '',
            name: BUG.DESCRIPTION,
            required: true,
        },
        [BUG.STATUS]: {
            value: visibleBug[BUG.STATUS],
            error: '',
            name: BUG.STATUS,
            required: true,
        },
        [BUG.PRIORITY]: {
            value: visibleBug[BUG.PRIORITY],
            error: '',
            name: BUG.PRIORITY,
            required: true,
        },
        [BUG.ASSIGNED_TO]: {
            value: visibleBug[BUG.ASSIGNED_TO],
            error: '',
            name: BUG.ASSIGNED_TO,
            required: false,
        },
    }

    const { handleSubmit, handleOnChange, inputs, isSubmitDisabled } = useForm(
        inputsSchema,
        editBugSubmit
    )

    return (
<Card>
    <CardContent>
        <form noValidate autoComplete="off">
            <Grid container direction="row" justify="center" alignItems="stretch" spacing={5}>
                <Grid item xs={12}>
                    <FormControl fullWidth variant="outlined">
                        <InputLabel>Bug title</InputLabel>
                        <OutlinedInput label="Bug Title" inputProps={{maxLength: 80}} name={BUG.TITLE} value={inputs[BUG.TITLE].value}  onChange={handleOnChange}/>
                        {/*<OutlinedInput label="Bug Title" autoFocus inputProps={{maxLength: 80}} name={BUG.TITLE} value={inputs[BUG.TITLE].value} onChange={handleOnChange}/>*/}
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={7} >
                    <TextField label="Description" name={BUG.DESCRIPTION} value={inputs[BUG.DESCRIPTION].value} onChange={handleOnChange} fullWidth multiline rows={10} variant="outlined"/>
                </Grid>
                <Grid item xs={12} sm={5}>

                <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select name={BUG.STATUS} value={inputs[BUG.STATUS].value} onChange={handleOnChange} input={<Input />}>
                    {OPTIONS_BUG_STATUS.map((status) => (
                        <MenuItem key={status} value={status}>
                            <ListItemText primary={status} className={classes.forceInline} />
                        </MenuItem>))}
                    </Select>
                </FormControl>

                <FormControl fullWidth>
                    <InputLabel>Priority</InputLabel>
                    <Select name={BUG.PRIORITY} value={inputs[BUG.PRIORITY].value} onChange={handleOnChange} input={<Input />}>
                    {OPTIONS_BUG_PRIORITY.map((priority) => (
                        <MenuItem key={priority} value={priority}>
                            <ListItemAvatar className={classes.forceInline}>
                                <Avatar variant='square' className={classes[priority]}>
                                    <BugReportIcon></BugReportIcon>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={priority} className={classes.forceInline} />
                        </MenuItem>))}
                    </Select>
                </FormControl>

                <FormControl fullWidth>
                    <InputLabel>Assign To</InputLabel>
                    <Select name={BUG.ASSIGNED_TO} value={inputs[BUG.ASSIGNED_TO].value} onChange={handleOnChange} input={<Input />}>
                        <MenuItem key={'Unassigned'} value={null}>
                            <ListItemText primary="Unassigned"/>
                        </MenuItem>
                        {users.response.map((user) => (
                        <MenuItem key={user[USER.ID]} value={user[USER.NAME]}>
                            <ListItemAvatar className={classes.forceInline}>
                                <Avatar variant='square' alt="" src={user[USER.NAME] +'.jpg'}></Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={user[USER.NAME]} className={classes.forceInline} />
                        </MenuItem>))}
                    </Select>
                </FormControl>

                <FormControl fullWidth >
                    <InputLabel>Notify Teammates</InputLabel>

                    <Select multiple value={watchers} onChange={handleTagsChange} input={<Input />} 
                    renderValue={(selected) => selected.join(', ')}>
                        {users.response.map((user) => (
                            <MenuItem key={user[USER.ID]} value={user[USER.NAME]}>
                                <ListItemAvatar className={classes.forceInline}>
                                    <Avatar variant='square' alt="" src={user[USER.NAME] +'.jpg'}></Avatar>
                                </ListItemAvatar>
                            <ListItemText primary={user[USER.NAME]} />
                            <Checkbox checked={watchers.indexOf(user[USER.NAME]) > -1} />
                            </MenuItem>
                        ))}
                    </Select>

                </FormControl>
            </Grid>

            {/*   Bug Detail Images   */}
            <Grid item xs={12} sm={12}>
                <Card>
                    <CardContent>
                    <Button variant="contained" color="secondary">
                        + Add Image
                    </Button>
                    {/*** 
                    <div className={classes.pictureContainer}>
                        <GridList cols={2.5} className={classes.gridList}>
                            {pictures.map((tile) => (
                            <GridListTile key={tile.img}>
                                <img src={tile.img} alt={tile.title} />
                                    <GridListTileBar title={tile.title}
                                    actionIcon={
                                        <IconButton aria-label={`star ${tile.title}`}>
                                            <SettingsOverscanIcon/>
                                        </IconButton>
                                    }
                                />
                            </GridListTile>
                            ))}
                        <GridListTile>
                            <GridListTileBar title="Add Image"></GridListTileBar>   
                        </GridListTile>
                    </GridList>
                </div>
                */}
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12} sm={12}>
                <Button type="submit" variant="contained" color="primary" onClick={handleSubmit} disabled={isSubmitDisabled || false}>
                    Save Change
                </Button>
            </Grid>
            </Grid>
            </form>

            {/*   Comments Section  */}
    <Grid container item xs={12} alignItems="stretch" spacing={2}>
        {comments.isLoading && !comments.response ? (
            <Typography>Loading Comments...</Typography>
                ) : (
            <Comments{...{ bugId: visibleBug[BUG.ID], comments, userEmail }}/>
        )}
    </Grid>
</CardContent>
</Card>)}
