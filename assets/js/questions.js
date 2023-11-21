async function showExplanation(id) {
    await new Promise(r => setTimeout(r, 500));
    const body = document.getElementById("body_" + id);
    const explanation = document.getElementById("explanation_" + id);
    body.classList.add('hidden');
    explanation.classList.remove('hidden');
}

function hideExplanation(id) {
    const body = document.getElementById("body_" + id);
    const explanation = document.getElementById("explanation_" + id);
    body.classList.remove('hidden');
    explanation.classList.add('hidden');
    nextPart();
}