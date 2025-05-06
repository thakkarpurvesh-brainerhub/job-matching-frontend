'use client';
import { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { api } from '@/lib/api';

export default function CandidatePage() {
  const [name, setName] = useState('');
  const [summary, setSummary] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/api/candidates', { name, summary });
      setStatus('Candidate created successfully!');
      setName('');
      setSummary('');
    } catch {
      setStatus('Error creating candidate.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h5" gutterBottom>Add New Candidate</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
          <TextField
            label="Summary / Skills"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            value={summary}
            onChange={e => setSummary(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" fullWidth>Submit</Button>
        </form>
        {status && <Typography mt={2}>{status}</Typography>}
      </Box>
    </Container>
  );
}
