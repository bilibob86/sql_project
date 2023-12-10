/**  
 * SQL Editor - A simple SQL editor with syntax highlighting
 * @param {Element} el - The textarea element to be converted into a SQL editor
 * @returns {void}
 */

function embellish(el) {
    const keywords = ['SELECT', 'FROM', 'WHERE', 'JOIN', 'ON', 'GROUP',
        'BY', 'ORDER', 'INSERT', 'INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE', 'FROM', 'CREATE', 'TABLE',
        'PRIMARY', 'KEY', 'VARCHAR', 'INT', 'NOT', 'NULL', 'DEFAULT', 'DATETIME'
    ]; // SQL keywords
    const commentPattern = /--.*|\/\*[\s\S]*?\*\//g; // Matches SQL comments

    const sqlInput = el; // The textarea element
    const sqlOutput = el.nextElementSibling; // The div element that will contain the highlighted SQL

    const text = sqlInput.value; // The text inside the textarea
    const highlightedText = text.replace(commentPattern, match => `<span class="comment">${match}</span>`); // The text with comments highlighted

    const lines = highlightedText.split('\n'); // The text split into lines

    const styledLines = lines.map(line => {
        const words = line.split(/\b/);

        const styledText = words.map(word => {
            if (keywords.includes(word.toUpperCase())) {
                return `<span class="keyword">${word}</span>`;
            } else if (word.match(/[(),=+.\-]/g)) {
                return `<span class="operator">${word}</span>`;
            } else if (word.match(/^\d+$/)) {
                return `<span class="number">${word}</span>`;
            } else if (word.match(/["';]/g)) {
                return `<span class="operator">${word}</span>`;
            } else {
                return `<span class="string">${word}</span>`;
            }
        }).join('');

        return styledText; // The line with syntax highlighting
    });

    sqlOutput.innerHTML = styledLines.join('<br>'); // The lines with line breaks
}