import * as React from "react";
import { useState } from "react";

export interface RotorsProps {
  initial: number;
}

const Rotors: React.FC<RotorsProps> = ({ initial }) => {
  const [rotor, setRotor] = useState(initial);

  const handleRotorsCycle = () => {
    // Variable delcaration
    const maxValue = 26;

    const auxRotor = rotor + 1;
    if (auxRotor > maxValue) {
      setRotor(1);
    } else {
      setRotor(auxRotor);
    }
  };

  return <React.Fragment>{rotor}</React.Fragment>;
};

export default Rotors;
