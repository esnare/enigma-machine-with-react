const alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',];     

const getLetterIndex = (letter: string) => {
    return alphabet.findIndex(item => item === letter);
}

export {alphabet, getLetterIndex};