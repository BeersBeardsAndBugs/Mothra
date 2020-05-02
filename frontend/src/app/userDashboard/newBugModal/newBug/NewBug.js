import React from 'react'
import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import TextField from '@material-ui/core/TextField';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import IconButton from '@material-ui/core/IconButton'
import SettingsOverscanIcon from '@material-ui/icons/SettingsOverscan'

export const NewBug = ({ classes }) => {

  const useStyles = makeStyles((theme) => ({
    // CSS Trick to handle Material Defect that causes horizontal overflow on Grid spacing
    // We'll use this until Google decides to fix the issue. Tho its been around for over a year...
    grid: {
      margin: theme.spacing(0),
      flexGrow: 0,
      maxWidth: `100%`,
      flexBasis: `100%`
  },
    detailsContainer : {
      minHeight: '300px',
    },
    title: {
        color: theme.palette.primary.light,
    },
    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    pictureContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      backgroundColor: theme.palette.background.paper,
      height: '300px',
      overflowY: 'auto',
      overflowX: 'hidden',
  },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      maxWidth: 300,
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: 2,
    },
    noLabel: {
      marginTop: theme.spacing(3),
    },
  }));

  const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const theme = useTheme();
  const [dummy, setDummy] = React.useState('Dummy Value');
  const names = [
    'Jordon West',
    'Preston West',
    'Alex Albright',
  ];

  const [assignTo, setAssignTo] = React.useState([]);

  const [modalStyle] = React.useState({
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  })

  const handleChange = (event) => {
    setDummy(event.target.value);
  };

  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
  return (

    
      <div style={modalStyle} className={classes.paper}>
        <Grid container>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h1">
                  Create New Bug
                </Typography>
                <br />
                <Typography variant="subtitle1">
                  ID: none
                </Typography>
                </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={7} >
                <Card >
                    <CardContent > 
                    <div className={classes.detailsContainer}>
                        <TextField
                            fullWidth
                            id="standard-textarea"
                            label="Description"
                            placeholder="Description"
                            multiline
                            rows={4}
                            name="Description"
                            value={''}
                            onChange={handleChange}
                            variant="outlined"
                        />
                    </div>
                    </CardContent>
                </Card>
            </Grid>


    {/*
      <form className={classes.root} noValidate autoComplete="off">
        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="component-outlined">Bug title</InputLabel>
          <OutlinedInput  id="component-outlined" value={''} onChange={handleChange} label="Bug Title" />
        </FormControl>
        <FormControl>
        <InputLabel id="demo-mutiple-name-label">Assign To</InputLabel>
        <Select
          labelId="demo-mutiple-name-label"
          id="demo-mutiple-name"
          multiple
          value={assignTo}
          onChange={handleChange}
          input={<Input />}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name} style={getStyles(name, assignTo, theme)}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel id="demo-mutiple-name-label">Assign To</InputLabel>
        <Select
          labelId="demo-mutiple-name-label"
          id="demo-mutiple-name"
          multiple
          value={assignTo}
          onChange={handleChange}
          input={<Input />}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name} style={getStyles(name, assignTo, theme)}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

        <FormControl variant="outlined">
          <InputLabel htmlFor="component-outlined">Description</InputLabel>
          <OutlinedInput id="component-outlined" value={''} onChange={handleChange} label="Bug Description" />
        </FormControl>

        <FormControl>
          <InputLabel htmlFor="component-helper">Name</InputLabel>
          <Input
            id="component-helper"
            value={dummy}
            onChange={handleChange}
            aria-describedby="component-helper-text"
          />
          <FormHelperText id="component-helper-text">Some important helper text</FormHelperText>
        </FormControl>
        <FormControl disabled>
          <InputLabel htmlFor="component-disabled">Name</InputLabel>
          <Input id="component-disabled" value={dummy} onChange={handleChange} />
          <FormHelperText>Disabled</FormHelperText>
        </FormControl>
        <FormControl error>
          <InputLabel htmlFor="component-error">Name</InputLabel>
          <Input
            id="component-error"
            value={dummy}
            onChange={handleChange}
            aria-describedby="component-error-text"
          />
          <FormHelperText id="component-error-text">Error</FormHelperText>
        </FormControl>

        <FormControl variant="filled">
          <InputLabel htmlFor="component-filled">Name</InputLabel>
          <FilledInput id="component-filled" value={dummy} onChange={handleChange} />
        </FormControl>
      </form>
    
*/}

</Grid>
    </div>
  
  )
}
