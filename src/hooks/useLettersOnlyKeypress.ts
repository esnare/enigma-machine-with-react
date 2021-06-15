import { useEffect } from 'react';
/**
 * useLettersOnlyKeypress
 * @param {function} action - the action to perform on key press
 */
export default function useLettersOnlyKeypress(action:any) {
  useEffect(() => {
    function onKeyup(event:any) {
        const charCode = event.keyCode;
        if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode === 8){
            const letter = event.key;
            action(letter.toUpperCase());
        }
    }
    window.addEventListener('keyup', onKeyup);
    return () => window.removeEventListener('keyup', onKeyup);
  }, [action]);
}