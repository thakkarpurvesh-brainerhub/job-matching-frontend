'use client';
import { Box, Button, Container, Typography, Stack } from '@mui/material';
import Link from 'next/link';

export default function HomePage() {
  return (
    <Container>
      <Box textAlign="center" mt={10}>
        <Typography variant="h4" gutterBottom>
          Job-Candidate Matching System
        </Typography>
        <Stack spacing={2} mt={4}>
          <Link href="/jobs"><Button variant="contained">Add Job</Button></Link>
          <Link href="/candidates"><Button variant="contained">Add Candidate</Button></Link>
          <Link href="/match"><Button variant="contained">Match Candidates</Button></Link>
        </Stack>
      </Box>
    </Container>
  );
}