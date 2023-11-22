function embellish() {
    const keywords = ['SELECT', 'FROM', 'WHERE', 'JOIN', 'ON', 'GROUP',
        'BY', 'ORDER', 'INSERT', 'INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE', 'FROM', 'CREATE', 'TABLE',
        'PRIMARY', 'KEY', 'varchar', 'int', 'NOT', 'NULL'
    ];
    const commentPattern = /--.*|\/\*[\s\S]*?\*\//g; // Matches SQL comments

    const sqlInput = document.getElementById('sql_input');
    const sqlOutput = document.getElementById('sql_output');

    const text = sqlInput.value;
    const highlightedText = text.replace(commentPattern, match => `<span class="comment">${match}</span>`);

    const words = highlightedText.split(/\b/);

    const styledText = words.map(word => {
        if (keywords.includes(word.toUpperCase())) {
            return `<span class="keyword">${word}</span>`;
        } else if (word.match(/[(),=+\-]/g)) {
            return `<span class="operator">${word}</span>`;
        } else if (word.match(/\d+/g)) {
            return `<span class="number">${word}</span>`;
        } else {
            return `<span class="string">${word}</span>`;
        }
    }).join('');

    sqlOutput.innerHTML = styledText;
}