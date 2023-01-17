import Head from 'next/head';
import Image from 'next/image';
import impactframesLogo from '../assets/impactframes-logo.png';
import { useState } from 'react';

const Home = () => {
  const [userInput, setUserInput] = useState('');
  const [apiOutput, setApiOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [mod1, setMod1] = useState('');
  const [mod2, setMod2] = useState('');
  const [mod3, setMod3] = useState('');
  const [mod4, setMod4] = useState('');
  
  const callGenerateEndpoint = async () => {
    setIsGenerating(true);
    
    console.log("Calling OpenAI...")
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput }),
    });
  
    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text)
  
    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  }

  const onUserChangedText = (event) => {
    console.log(event.target.value);
    setUserInput(event.target.value);
  };

  const handleMod1Change = (e) => {
    setMod1(e.target.value);
  };

  const handleMod2Change = (e) => {
    setMod2(e.target.value);
  };

  const handleMod3Change = (e) => {
    setMod3(e.target.value);
  };

  const handleMod4Change = (e) => {
    setMod4(e.target.value);
  };

  const copyMod1ToInput = () => {
    setUserInput(userInput + mod1);
  };

  const copyMod2ToInput = () => {
    setUserInput(userInput + mod2);
  };

  const copyMod3ToInput = () => {
    setUserInput(userInput + mod3);
  };

  const copyMod4ToInput = () => {
    setUserInput(userInput + mod4);
  };

  return (
    <div className="root">
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>iF-Ai Gym Personal Trainer</h1>
          </div>
          <div className="header-subtitle">
            <h2>Hi Let's plan your gym session</h2>
          </div>
        </div>
        <br />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <select value={mod1} onChange={handleMod1Change}>
              <option value="">Select split Focus</option>
              <option value="Let's do a Legs, Arms and Abdomen split workout for ">Legs</option>
              <option value="Let's do an Abdomen and Cardio split workout for ">Abdomen</option>
              <option value="Let's do an Arms, Legs and Abdomen split workout for ">Arms</option>
              <option value="Let's do a Chest, Back and Abdomen split workout for ">Chest</option>
              <option value="Let's do a Back, Legs and Abdomen split workout for ">Back</option>
              <option value="Let's do a Chest, Legs and Abdomen split workout for ">Chest</option>
            </select>
            <button onClick={copyMod1ToInput}>Copy to input</button>
            <select value={mod2} onChange={handleMod2Change}>
              <option value="">Gender</option>
              <option value="a woman ">Female</option>
              <option value="a man ">Male</option>
            </select>
            <button onClick={copyMod2ToInput}>Copy to input</button>
            <select value={mod3} onChange={handleMod3Change}>
              <option value="">age</option>
              <option value="over 20 years old ">20+</option>
              <option value="over 35 years old ">35+</option>
              <option value="over 50 years old ">50+</option>
            </select>
            <button onClick={copyMod3ToInput}>Copy to input</button>
            <select value={mod4} onChange={handleMod4Change}>
              <option value="">Difficulty</option>
              <option value="make it challenging ">Gym goer</option>
              <option value="make it intense ">Shreded</option>
              <option value="make it very intense ">Beast</option>
            </select>
            <button onClick={copyMod4ToInput}>Copy to input</button>
          </div>
        <div className="prompt-container">
          <textarea
            placeholder="slect an split and enter the number of sets and reps"
            className="prompt-box"
            value={userInput}
            onChange={onUserChangedText}
          />
          <div className="prompt-buttons">
            <a
              className={isGenerating ? 'generate-button loading' : 'generate-button'}
              onClick={callGenerateEndpoint}
            >
              <div className="generate">
              {isGenerating ? <span className="loader"></span> : <p>Generate</p>}
              </div>
            </a>
          </div>
          {/* New code I added here */}
          {apiOutput && (
            <div className="output">
              <div className="output-header-container">
                <div className="output-header">
                  <h3>Output</h3>
                </div>
              </div>
              <div className="output-content">
                <p>{apiOutput}</p>
              </div>
            </div>
          )}
        </div>
        <div className="badge-container grow">
          <a
            href="https://impactframes.art"
            target="_blank"
            rel="noreferrer"
          >
            <div className="badge">
              <Image src={impactframesLogo} alt="impactframes logo" />
              <p>build by impactframes</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
