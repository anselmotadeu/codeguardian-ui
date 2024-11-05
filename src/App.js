import React, { useState } from 'react';
import axios from 'axios';
import { AppBar, Toolbar, Typography, Container, Button, Paper, TextField } from '@mui/material';
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
  const [language, setLanguage] = useState('HTML'); // Padrão para HTML
  const [result, setResult] = useState('');

  const analyzeCode = async () => {
    try {
      const response = await axios.post('http://localhost:3000/analyze', { code });
      setResult(response.data.analysis || 'Nenhum resultado de análise disponível.');
      setLanguage(response.data.language); // Atualiza a linguagem detectada
    } catch (error) {
      console.error('Erro ao Analisar Código:', error);
      alert('Ocorreu um erro ao analisar o código. Verifique o console para mais detalhes.');
    }
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            CodeGuardian
          </Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Typography variant="h4" gutterBottom>CodeGuardian</Typography>
        <TextField
          label="Linguagem Detectada"
          value={language}
          fullWidth
          margin="normal"
          InputProps={{
            readOnly: true,
          }}
        />
        <CodeMirror
          value={code}
          options={{
            mode: language.toLowerCase(),
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
      <footer style={{ textAlign: 'center', padding: '10px', marginTop: '20px', backgroundColor: '#f8f9fa' }}>
        <Typography variant="body2" color="textSecondary">© {new Date().getFullYear()} CodeGuardian. Todos os direitos reservados.</Typography>
      </footer>
    </>
  );
}

export default App;
