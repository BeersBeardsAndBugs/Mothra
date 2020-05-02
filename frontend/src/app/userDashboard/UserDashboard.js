import Grid from '@material-ui/core/Grid'
import React, { useState, useEffect } from 'react'
import { BugDetail } from './BugDetail'
import { BugList } from './BugList'
import { NavbarContainer } from './navbarContainer'
import { NewBugDialog } from './newBugDialog'
import { useFetch } from '../../hooks'
import { PATH } from '../../constants'

export const UserDashboard = ({ user, setPageSelected }) => {

    const [bugs] = useFetch(PATH.BUG, [])
    const [visibleBug, setVisibleBug] = useState({})
    const [isNewBugDialogOpen, setIsNewBugDialogOpen] = React.useState(false)

    useEffect(() => {
        bugs.getAll()
    }, [])

    const handleVisibleBugChange = (bugId) => {
        const foundBugs = bugs.response.filter((bug) => bug.id === bugId)
        if (foundBugs.length === 1) {
            setVisibleBug((prevState) => ({
                ...prevState,
                ...foundBugs[0],
            }))
        }
    }

    const handleNewBugDialogOpen = () => {
        setIsNewBugDialogOpen(true)
    }

    const handleNewBugDialogClose = () => {
        setIsNewBugDialogOpen(false)
    }

    const editBugSubmit = (editedBug) => {
        bugs.edit({ ...editedBug, id: visibleBug.id })
    }

    return (
      <Grid container alignItems="stretch" justify="flex-start" >
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <NavbarContainer 
            {...{
              user,
              setPageSelected,
              handleVisibleBugChange,
              handleNewBugDialogOpen,
            }}
          />
        </Grid>

        <Grid item xs={12} md={2}>
          <BugList 
            {...{
              bugs,
              userName: user.response.name,
              handleVisibleBugChange,
            }}
          />
        </Grid>

        <Grid item xs={12} md={10}>
          {visibleBug?.id && (
            <BugDetail
              key={visibleBug.id}
              {...{
                visibleBug,
                editBugSubmit,
              }}
            />
          )}
        </Grid>

        {isNewBugDialogOpen && (
          <NewBugDialog
            {...{ isNewBugDialogOpen, handleNewBugDialogClose }}
          />
        )}
      </Grid>
    )
}
