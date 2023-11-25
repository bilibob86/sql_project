async function firstStep(el) {
    const request = await fetch('http://127.0.0.1:5000/root');
    const parent = document.getElementById(el);
    try {
        const data = await request.json();
        if (data.code == 200) {
            const rq = parent.getElementsByClassName('sql_input')[0].value;
            const err = parent.getElementsByClassName('output_error')[0];
            const out = await sqlRequest(rq);
            if (out.code == 200) {
                nextPart(el);
                const tableName = await sqlRequest("SHOW TABLES");
                console.log(tableName);
                const tableStructure = await sqlRequest("DESCRIBE " + tableName.result[1][0][0]);
                const tableStructureHTML = document.getElementById('table_structure');

                for (let i = 0; i < tableStructure.result[1].length; i++) {
                    let htmlTableBody = document.createElement('tr');
                    tableStructure.result[1][i].forEach(el => {
                        let htmlTableData = document.createElement('td');
                        htmlTableData.innerHTML = el;
                        htmlTableBody.appendChild(htmlTableData);
                    });
                    tableStructureHTML.appendChild(htmlTableBody);
                }
            } else {
                err.innerHTML = "Error: " + out.result;
            }
        } else {

        }
    } catch (error) {
        console.log(error);
    }
}

async function secondStep(el) {
    const request = await fetch('http://127.0.0.1:5000/root');
    const parent = document.getElementById(el);
    try {
        const data = await request.json();
        if (data.code == 200) {
            const rq = parent.getElementsByClassName('sql_input')[0].value;
            const err = parent.getElementsByClassName('output_error')[0];
            const out = await sqlRequest(rq);
            if (out.code == 200) {
                nextPart(el);
                const tableName = await sqlRequest("SHOW TABLES");
                console.log(tableName);
                const tableStructure = await sqlRequest("DESCRIBE " + tableName.result[1][0][0]);
                const tableStructureHTML = document.getElementById('table_structure_2');

                for (let i = 0; i < tableStructure.result[1].length; i++) {
                    let htmlTableBody = document.createElement('tr');
                    tableStructure.result[1][i].forEach(el => {
                        let htmlTableData = document.createElement('td');
                        htmlTableData.innerHTML = el;
                        htmlTableBody.appendChild(htmlTableData);
                    });
                    tableStructureHTML.appendChild(htmlTableBody);
                }
            } else {
                err.innerHTML = "Error: " + out.result;
            }
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
    try {
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        return false;
    }
}