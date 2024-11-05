import React, { useState } from 'react';
import axios from 'axios';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AppBar, Toolbar, Typography, Container, Button, Paper, TextField, Box, Switch, CssBaseline } from '@mui/material';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/theme/dracula.css'; // Tema escuro para CodeMirror
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/python/python';
import 'codemirror/mode/css/css';
import './App.css';

function App() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('HTML'); // Padrão para HTML
  const [result, setResult] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  const lightTheme = createTheme({
    palette: {
      mode: 'light',
    },
  });

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
  };

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
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            CodeGuardian
          </Typography>
          <Box className="menu">
          <Button color="inherit">Configurações de Lint</Button>
          <Button color="inherit">Exportar Resultados</Button>
          <Button color="inherit">Histórico de Análises</Button>
          <Button color="inherit">Sobre</Button>
        </Box>

          <Switch checked={darkMode} onChange={handleThemeChange} />
        </Toolbar>
      </AppBar>
      <Container>
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
            theme: darkMode ? 'dracula' : 'material',
            lineNumbers: true,
          }}
          onBeforeChange={(editor, data, value) => {
            setCode(value);
          }}
          style={{
            height: '200px',
            backgroundColor: darkMode ? '#1e1e1e' : '#fff',
            color: darkMode ? '#fff' : '#000',
          }}
        />
        <Button variant="contained" color="primary" onClick={analyzeCode} style={{ marginTop: '10px' }}>
          Analisar Código
        </Button>
        <Paper elevation={3} style={{ whiteSpace: 'pre-wrap', marginTop: '20px', padding: '20px' }}>
          <div dangerouslySetInnerHTML={{ __html: result }} />
        </Paper>
      </Container>
      <footer style={{ textAlign: 'center', padding: '10px', marginTop: '20px', backgroundColor: darkMode ? '#303030' : '#f8f9fa', color: darkMode ? '#fff' : '#000' }}>
        <Typography variant="body2" color="textSecondary">© {new Date().getFullYear()} CodeGuardian. Todos os direitos reservados.</Typography>
      </footer>
    </ThemeProvider>
  );
}

export default App;
