'use client';
import { useState } from 'react';
import { api } from '@/lib/api';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
} from '@mui/material';

export default function MatchPage() {
  const [description, setDescription] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleMatch = async () => {
    if (!description.trim()) {
      setStatus('Please enter a job description.');
      return;
    }

    setLoading(true);
    setStatus('');
    setResults([]);

    try {
      const res = await api.post('/api/match', { description });
      setResults(res.data);
      setStatus(res.data.length ? '' : 'No matches found.');
    } catch {
      setStatus('Error during match.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h5" gutterBottom>
          Match Candidates to Job Description
        </Typography>

        <TextField
          label="Job Description"
          multiline
          rows={4}
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          margin="normal"
          required
        />

        <Button
          variant="contained"
          fullWidth
          onClick={handleMatch}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Find Matches'}
        </Button>

        {status && (
          <Typography mt={2} color={status.includes('Error') ? 'error' : 'textPrimary'}>
            {status}
          </Typography>
        )}

        {results.length > 0 && (
          <List sx={{ mt: 2 }}>
            {results.map((c, index) => (
              <ListItem key={index} divider>
                <ListItemText
                  primary={`${c.name} (Score: ${(c.score * 100).toFixed(1)}%)`}
                  secondary={c.summary}
                />
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </Container>
  );
}