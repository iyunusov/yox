'use client'
import { Box, CircularProgress, Paper, Typography } from "@mui/material";

export default function Loading() {
  return (
    <Box
      display={'flex'}
      justifyContent="center"
      alignItems="center"
      height={{
        xs: 'calc(100vh - 64px)',
        sm: 'calc(100vh - 64px)',
      }}
    >
      <Paper
        sx={{
          width: { xs: '100%', sm: '480px' },
          p: 4
        }}>
        <Box display={'flex'} flexDirection={'row'} gap={2}>
          <CircularProgress />
          <Typography component={'span'} ml={2}>It is loading, damn it! ;)</Typography>
        </Box>
      </Paper>

    </Box>
  )
}
