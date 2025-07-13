import * as React from 'react'
import { 
  AppBar,
  Link,
  Box,
  Button,
  Toolbar,
  Typography,
  Container } from '@mui/material'

export default function NavigationHeader({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppBar position="fixed" color="primary" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" component="div">
            <Link href="/">
              <Button variant="text" sx={{color: "white"}}>
                GameDev CEO
              </Button>
            </Link>
          </Typography>
          <Box>
          <Link href="/pages/jobs/create">
            <Button variant="text" sx={{color: "white"}}>
              Create Job
            </Button>
          </Link>
          <Link href="/pages/fields/create" underline="none">
            <Button variant="outlined" sx={{color:"white"}}>
              Create Field
            </Button>
          </Link>
          <Link href="/pages/employees/create">
            <Button variant="outlined" sx={{color:"white"}}>
              Create Employee
            </Button>
          </Link>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Κενό για να μην καλύπτεται το περιεχόμενο */}
      <Toolbar />

      <Box>
        {children}
      </Box>
    </>
  )
}
