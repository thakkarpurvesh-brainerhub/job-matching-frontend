'use client';
import { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { api } from '@/lib/api';

export default function JobPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/api/jobs', { title, description });
      setStatus('Job created successfully!');
      setTitle('');
      setDescription('');
    } catch {
      setStatus('Error creating job.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h5" gutterBottom>Add New Job</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            fullWidth
            margin="normal"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
          <TextField
            label="Description"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" fullWidth>Submit</Button>
        </form>
        {status && <Typography mt={2}>{status}</Typography>}
      </Box>
    </Container>
  );
}
