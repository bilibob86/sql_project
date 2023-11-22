async function firstStep(el) {
    const request = await fetch('http://127.0.0.1:5000/root');
    try {
        const data = await request.json();
        if (data.code == 200) {
            const rq = document.getElementById('sql_input').value;
            console.log(sqlRequest(rq));
        } else {

        }
    } catch (error) {
        console.log(error);
    }
}

async function sqlRequest(request) {
    const response = await fetch('http://127.0.0.1:5000/execute', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
    });
    const data = await response.json();
    return data;
}