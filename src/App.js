import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('js');
  const [result, setResult] = useState('');

  const analyzeCode = async () => {
    try {
      const response = await axios.post('http://localhost:3000/analyze', { code, language });
      setResult(response.data.analysis);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>CodeGuardian</h1>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Insira seu código aqui"
      />
      <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="js">JavaScript</option>
        <option value="python">Python</option>
        <option value="html">HTML</option>
        <option value="css">CSS</option>
      </select>
      <button onClick={analyzeCode}>Analisar Código</button>
      <pre>{result}</pre>
    </div>
  );
}

export default App;
