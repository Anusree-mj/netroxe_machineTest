import React from 'react'
import Header from '@/components/header'
import SideBar from '@/components/sideBar'
import { Box } from '@mui/material'

const Page = () => {
  return (
    <>
      <Header />
      <Box sx={{
        display: 'flex', justifyContent: 'space-between',
        maxWidth: '100%', alignItems: 'center'
      }}>

        <SideBar />
      </Box>
    </>
  )
}

export default Page