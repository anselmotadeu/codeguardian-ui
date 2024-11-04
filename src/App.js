import React, { useState } from 'react';
import axios from 'axios';
import { Container, Button, Typography, Paper, MenuItem, TextField } from '@mui/material';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/python/python';
import 'codemirror/mode/css/css';
import './App.css';

function App() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('html');
  const [result, setResult] = useState('');

  const analyzeCode = async () => {
    try {
      const response = await axios.post('http://localhost:3000/analyze', { code, language });
      setResult(response.data.analysis || 'Nenhum resultado de análise disponível.');
    } catch (error) {
      console.error('Erro ao Analisar Código:', error);
      alert('Ocorreu um erro ao analisar o código. Verifique o console para mais detalhes.');
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>CodeGuardian</Typography>
      <TextField
        select
        label="Linguagem"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        fullWidth
        margin="normal"
      >
        <MenuItem value="javascript">JavaScript</MenuItem>
        <MenuItem value="python">Python</MenuItem>
        <MenuItem value="html">HTML</MenuItem>
        <MenuItem value="css">CSS</MenuItem>
      </TextField>
      <CodeMirror
        value={code}
        options={{
          mode: language,
          theme: 'material',
          lineNumbers: true
        }}
        onBeforeChange={(editor, data, value) => {
          setCode(value);
        }}
      />
      <Button variant="contained" color="primary" onClick={analyzeCode} style={{ marginTop: '10px' }}>
        Analisar Código
      </Button>
      <Paper elevation={3} style={{ whiteSpace: 'pre-wrap', marginTop: '20px', padding: '20px' }}>
        <div dangerouslySetInnerHTML={{ __html: result }} />
      </Paper>
    </Container>
  );
}

export default App;