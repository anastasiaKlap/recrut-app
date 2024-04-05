import React, { useState, useEffect, useRef } from 'react';

const CodeInput = ({ codePattern, showAlert }) => {
    const [inputs, setInputs] = useState([]);
    const inputRefs = useRef([]);

    useEffect(() => {
        const newInputs = codePattern.reduce((acc, val) => {
            if (typeof val === 'number') {
                for (let i = 0; i < val; i++) {
                    acc.push('');
                }
            } else if (typeof val === 'string') {
                acc.push(val);
            }
            return acc;
        }, []);
        setInputs(newInputs);
    }, [codePattern]);

    const handleInputChange = (e, index) => {
        const value = e.target.value.slice(-1); // Allow only one character
        const newInputs = [...inputs];
        newInputs[index] = value;
        setInputs(newInputs);

        // Move to the next input if available
        if (value !== '' && index < inputs.length - 1) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleInputKeyDown = (e, index) => {
        if (e.key === 'Backspace' && index > 0 && inputs[index] === '') {
            inputRefs.current[index - 1].focus();
        } else if (e.key === 'ArrowLeft' && index > 0) {
            inputRefs.current[index - 1].focus();
        } else if (e.key === 'ArrowRight' && index < inputs.length - 1) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData('text');
        const newInputs = [...inputs];
        let pasteIndex = inputs.findIndex((input, index) => index >= inputs.length - 1 || input === '');

        for (const char of pasteData) {
            if (pasteIndex >= inputs.length) break;
            newInputs[pasteIndex++] = char;
        }
        setInputs(newInputs);
    };

    const generateCode = () => {
        const code = inputs.join('');
        showAlert(code);
    };

    return (
        <div>
            {inputs.map((input, index) => (
                <input
                    key={index}
                    ref={(ref) => (inputRefs.current[index] = ref)}
                    type="text"
                    value={input}
                    onChange={(e) => handleInputChange(e, index)}
                    onKeyDown={(e) => handleInputKeyDown(e, index)}
                    onPaste={(e) => handlePaste(e)}
                    maxLength={1}
                    style={{ width: '30px', marginRight: '5px' }}
                />
            ))}
            <button onClick={generateCode}>Show Alert</button>
        </div>
    );
};

export default CodeInput;
