


const camelCase = (string) => {
    return string.replace(/-([a-z])/g, (match, char) => {
        return char.toUpperCase()
    });
}

export default camelCase;