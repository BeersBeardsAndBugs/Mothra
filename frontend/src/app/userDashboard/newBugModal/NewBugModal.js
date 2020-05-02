import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import { NewBug } from './newBug'

import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';

import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Checkbox from '@material-ui/core/Checkbox'
import ListItemText from '@material-ui/core/ListItemText'

import Avatar from '@material-ui/core/Avatar'
import BugReportIcon from '@material-ui/icons/BugReportRounded'

import Box from '@material-ui/core/Box'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import CloseIcon from '@material-ui/icons/Close'
import SettingsOverscanIcon from '@material-ui/icons/SettingsOverscan'
import { positions } from '@material-ui/system';

import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';



import { BUG, PATH } from '../../../constants'

const useStyles = makeStyles((theme) => ({

    pictureContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        backgroundColor: theme.palette.background.paper,
        overflowY: 'hidden',
        overflowX: 'hidden',
    },
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



export const NewBugModal = ({ isNewBugModalOpen, handleNewBugModalClose }) => {
    const classes = useStyles();


    const inputsSchema = {
        [BUG.DESCRIPTION]: {
            value: '',
            error: '',
            name: BUG.DESCRIPTION,
            required: true,
        },
    }

    const pictures = [
        { img: 'jpg_img.JPG', title: '.jpg upload', author: 'Preston' },
        { img: 'gif_img.gif', title: '.gif upload', author: 'Jordon' },
        { img: 'ultrawide_img.png', title: 'ultrawide upload', author: 'Alex' },
        { img: 'png_img.png', title: '.png upload', author: 'Alex' },
    ]



    const [title, setTitle] = React.useState('');
    const [desc, setDesc] = React.useState('');
    const [tags, setTags] = React.useState([]);
    const [priority, setPriority] = React.useState('None');
    const [assignTo, setAssignTo] = React.useState('');
    const [isSubmitDisabled, setIsSubmitDisabled] = React.useState([true]);
    const [handleSubmit, setHandleSubmit] = React.useState([]);
    const names = [
        'Jordon West',
        'Preston West',
        'Alex Albright',
      ];
    const priorities = [
        'Blocker',
        'Critical',
        'High',
        'Normal',
        'Enhancement',
        'None'
      ];

    const handleTagsChange = (event) => {
        setTags(event.target.value);
    };

    const handlePriorityChange = (event) => {
        setPriority(event.target.value);
    };

    
    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleDescChange = (event) => {
        setDesc(event.target.value);
    };

    const handleAssignToChange = (event) => {
        setAssignTo(event.target.value);
    };

    return (
        <div className={classes.root}>
            <Dialog maxWidth='lg' fullWidth open={isNewBugModalOpen} disableBackdropClick onClose={handleNewBugModalClose}>
            <DialogTitle>

            <Grid container direction="row" justify="space-between" alignItems="center" spacing={2}>
                <Grid item>
                    <Typography>Create New Ticket</Typography>
                </Grid>
                <Grid item justify='flex-end'>
                    <IconButton onClick={handleNewBugModalClose}>
                        <CloseIcon />
                    </IconButton>
                </Grid>
            </Grid>

            </DialogTitle>
            <DialogContent>
            <form noValidate autoComplete="off">
            <Grid container direction="row" justify="center" alignItems="stretch" spacing={2}>
                <Grid item xs={12}>
                    <FormControl fullWidth variant="outlined">
                        <InputLabel htmlFor="component-outlined">Bug title</InputLabel>
                        <OutlinedInput autoFocus id="component-outlined" value={title} onChange={handleTitleChange} label="Bug Title" />
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={7} >
                    <TextField
                        fullWidth
                        id="standard-textarea"
                        label="Description"
                        placeholder="Description"
                        multiline
                        rows={4}
                        name="Description"
                        value={desc}
                        onChange={handleDescChange}
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12} sm={5}>
                <FormControl fullWidth>
                    <InputLabel id="demo-mutiple-name-label">Priority</InputLabel>
                    <Select value={priority} onChange={handlePriorityChange} input={<Input />}>
                    {priorities.map((priority) => (
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
                    <InputLabel id="demo-mutiple-name-label">Assign To</InputLabel>
                    <Select value={assignTo} onChange={handleAssignToChange} input={<Input />}>
                    {names.map((name) => (
                        <MenuItem key={name} value={name}>
                            <ListItemAvatar className={classes.forceInline}>
                                <Avatar variant='square' alt="" src={name.split(" ")[0] +'.jpg'}></Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={name} className={classes.forceInline} />
                        </MenuItem>))}
                    </Select>
                </FormControl>

                <FormControl fullWidth >
                    <InputLabel>Notify Teammates</InputLabel>
                    <Select multiple value={tags} onChange={handleTagsChange} input={<Input />} 
                    renderValue={(selected) => selected.join(', ')}>
                        {names.map((name) => (
                            <MenuItem key={name} value={name}>
                                <ListItemAvatar className={classes.forceInline}>
                                    <Avatar variant='square' alt="" src={name.split(" ")[0] +'.jpg'}></Avatar>
                                </ListItemAvatar>
                            <ListItemText primary={name} />
                            <Checkbox checked={tags.indexOf(name) > -1} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                </Grid>

            {/*   Bug Detail Images   */}
            <Grid item xs={12} sm={12}>
                <Card>
                    <CardContent>

                    <Button type="submit" variant="contained" color="secondary">
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
                                <GridListTileBar title="Add Image">

                                </GridListTileBar>
                                    
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
                </DialogContent>
            </Dialog>
        </div>
    )
}
