import React, { useState, useEffect } from "react";
import "./App.css";
// Custom Components
import useLettersOnlyKeypress from "./hooks/useLettersOnlyKeypress";
import { alphabet, getLetterIndex } from "./utils/alphabet";
import { RotorI, RotorII, RotorIII } from "./utils/rotors";
import { ReflectorB } from "./utils/reflectors";

function App() {
  const [keyPressed, setKeyPressed] = useState("");

  const [firstRotorValue, setFirstRotorValue] = useState(1);
  const [secondRotorValue, setSecondRotorValue] = useState(1);
  const [thirdRotorValue, setThirdRotorValue] = useState(1);

  const [firstRotor, setFirstRotor] = useState(RotorIII);
  const [secondRotor, setSecondRotor] = useState(RotorII);
  const [thirdRotor, setThirdRotor] = useState(RotorI);

  useEffect(() => {
    if (firstRotorValue > 1) {
      const auxRotor = firstRotor;
      const deledteValues = auxRotor.splice(0, firstRotorValue - 1);
      deledteValues.forEach((item) => auxRotor.push(item));
      setFirstRotor(auxRotor);
    }
  }, [firstRotorValue, firstRotor]);

  useEffect(() => {
    if (secondRotorValue > 1) {
      const auxRotor = secondRotor;
      const deledteValues = auxRotor.splice(0, secondRotorValue - 1);
      deledteValues.forEach((item) => auxRotor.push(item));
      setSecondRotor(auxRotor);
    }
  }, [secondRotorValue, secondRotor]);

  useEffect(() => {
    if (thirdRotorValue > 1) {
      const auxRotor = thirdRotor;
      const deledteValues = auxRotor.splice(0, thirdRotorValue - 1);
      deledteValues.forEach((item) => auxRotor.push(item));
      setThirdRotor(auxRotor);
    }
  }, [thirdRotorValue, thirdRotor]);

  useLettersOnlyKeypress((letter: any) => {
    encode(letter);
    handleRotorsCycle();
  });

  const encode = (letter: string) => {
    // First rotor iteration
    const firstRotorResult = rotorEncrypt(letter, firstRotorValue, firstRotor);

    const secondRotorResult = rotorEncrypt(
      firstRotorResult,
      secondRotorValue,
      secondRotor
    );

    const thirdRotorResult = rotorEncrypt(
      secondRotorResult,
      thirdRotorValue,
      thirdRotor
    );

    // Going through the reflector
    const theReflector = reflector(thirdRotorResult);

    //  Rotors invert
    const thirdRotorResultInvert = rotorEncryptInvert(
      theReflector,
      thirdRotorValue,
      thirdRotor
    );

    const secondRotorResultInvert = rotorEncryptInvert(
      thirdRotorResultInvert,
      secondRotorValue,
      secondRotor
    );

    const firstRotorResultInvert = rotorEncryptInvert(
      secondRotorResultInvert,
      firstRotorValue,
      firstRotor
    );

    setKeyPressed(keyPressed + " " + firstRotorResultInvert);
  };

  const rotorEncrypt = (
    letter: string,
    rotorValue: number,
    rotor: string[]
  ) => {
    const i = getLetterIndex(letter);

    return rotor[i];
  };

  const reflector = (letter: string) => {
    const i = getLetterIndex(letter);

    return ReflectorB[i];
  };

  const rotorEncryptInvert = (
    letter: string,
    rotorValue: number,
    rotor: string[],
    debug: boolean = false
  ) => {
    const i = rotor.findIndex((item) => item === letter);

    return alphabet[i];
  };

  const handleRotorsCycle = () => {
    // Variable delcaration
    const maxValue = 26;

    const auxfirstRotorValue = firstRotorValue + 1;
    if (auxfirstRotorValue > maxValue) {
      setFirstRotorValue(1);
      const auxsecondRotorValue = secondRotorValue + 1;
      if (auxsecondRotorValue > maxValue) {
        setSecondRotorValue(1);
        const auxthirdRotorValue = thirdRotorValue + 1;
        if (auxthirdRotorValue > maxValue) {
          setThirdRotorValue(1);
        } else {
          setThirdRotorValue(auxthirdRotorValue);
        }
      } else {
        setSecondRotorValue(auxsecondRotorValue);
      }
    } else {
      setFirstRotorValue(auxfirstRotorValue);
    }
  };

  return (
    <div className="App">
      <header className="mt-10">
        <h1 className="text-">Enigma Machine</h1>
        <div>
          {firstRotorValue} - {secondRotorValue} - {thirdRotorValue}
        </div>
        <p>Key Pressed: {keyPressed}</p>
      </header>
    </div>
  );
}

export default App;
