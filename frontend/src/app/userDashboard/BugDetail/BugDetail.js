import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import IconButton from '@material-ui/core/IconButton'
import SettingsOverscanIcon from '@material-ui/icons/SettingsOverscan'
import React from 'react'
import { BUG, PATH } from '../../../constants'
import { useForm, useFetch } from '../../../hooks'
import { Comments } from './comments'

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
    grid: {
        margin: theme.spacing(0),
        flexGrow: 0,
        maxWidth: `100%`,
        flexBasis: `100%`,
    },
}))

const pictures = [
    { img: 'jpg_img.JPG', title: '.jpg upload', author: 'Preston' },
    { img: 'gif_img.gif', title: '.gif upload', author: 'Jordon' },
    { img: 'ultrawide_img.png', title: 'ultrawide upload', author: 'Alex' },
    { img: 'png_img.png', title: '.png upload', author: 'Alex' },
]

export const BugDetail = ({ editBugSubmit, visibleBug, userEmail }) => {
    const [comments] = useFetch(PATH.COMMENT, visibleBug.comments || [])
    const classes = useStyles()

    const inputsSchema = {
        [BUG.DESCRIPTION]: {
            value: visibleBug[BUG.DESCRIPTION],
            error: '',
            name: BUG.DESCRIPTION,
            required: true,
        },
    }

    const { handleSubmit, handleOnChange, inputs, isSubmitDisabled } = useForm(
        inputsSchema,
        editBugSubmit
    )

    return (
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="stretch"
            spacing={2}
            className={classes.grid}
        >
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
                        <div className={classes.detailsContainer}>
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
                                onClick={handleSubmit}
                                disabled={isSubmitDisabled}
                            >
                                Save Change
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </Grid>

            {/*   Bug Detail Images   */}
            <Grid item xs={12} sm={5}>
                <Card>
                    <CardContent>
                        <div className={classes.pictureContainer}>
                            <GridList cellHeight={160} cols={1}>
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
            {comments.isLoading && !comments.response ? (
                <Typography>Loading Comments...</Typography>
            ) : (
                <Comments
                    {...{ bugId: visibleBug[BUG.ID], comments, userEmail }}
                />
            )}
        </Grid>
    )
}
