import React from 'react';
import CodeInput from './CodeInput';

const App = () => {
    const codePattern = [3, '-', 7, '=', 2]; // Przykładowy wzorzec kodu

    return (
        <div>
            <h1>Enter Code</h1>
            <CodeInput codePattern={codePattern} />
        </div>
    );
};

export default App;
