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
        } else {}
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
        } else {}
    } catch (error) {
        console.log(error);
    }
}

async function thirdStep(el) {
    const request = await fetch('http://127.0.0.1:5000/root');
    const parent = document.getElementById(el);
    try {
        const data = await request.json();
        if (data.code == 200) {
            const rq = parent.getElementsByClassName('sql_input')[0].value;
            const err = parent.getElementsByClassName('output_error')[0];
            await sqlRequest("CREATE TABLE `sql_project`.`utilisateurs` ( `id` INT NOT NULL AUTO_INCREMENT , `nom` TEXT NOT NULL , `email` VARCHAR(150) NOT NULL , `mdp` VARCHAR(500) NOT NULL , `anniv` DATE NOT NULL , `date_creation` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (`id`)) ENGINE = MyISAM;")
            const out = await sqlRequest(rq);
            if (out.code == 200) {
                nextPart(el);
            } else {
                err.innerHTML = "Error: " + out.result;
            }
        } else {}
    } catch (error) {
        console.log(error);
    }
}

async function fourthStep(el) {
    const request = await fetch('http://127.0.0.1:5000/root');
    const parent = document.getElementById(el);
    try {
        const data = await request.json();
        if (data.code == 200) {
            const rq = parent.getElementsByClassName('sql_input')[0].value;
            const err = parent.getElementsByClassName('output_error')[0];
            await sqlRequest("CREATE TABLE `sql_project`.`utilisateurs` ( `id` INT NOT NULL AUTO_INCREMENT , `nom` TEXT NOT NULL , `email` VARCHAR(150) NOT NULL , `mdp` VARCHAR(500) NOT NULL , `anniv` DATE NOT NULL , `date_creation` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (`id`)) ENGINE = MyISAM;")
            await sqlRequest("INSERT INTO `utilisateurs` (`id`, `nom`, `email`, `mdp`, `anniv`, `date_creation`) VALUES (NULL, 'Denis', 'denis@gmail.com', 'azerty123', '2000-12-07', '2023-12-07 12:00:00');")
            await sqlRequest("INSERT INTO `utilisateurs` (`id`, `nom`, `email`, `mdp`, `anniv`, `date_creation`) VALUES (NULL, 'Jean', 'jean@gmail.com', '123456789', '1999-01-21', '2023-12-07 02:52:54');")
            await sqlRequest("INSERT INTO `utilisateurs` (`id`, `nom`, `email`, `mdp`, `anniv`, `date_creation`) VALUES (NULL, 'Marie', 'marie@gmail.com', 'mdp', '2001-05-12', '2023-12-07 17:25:37');")
            await sqlRequest("INSERT INTO `utilisateurs` (`id`, `nom`, `email`, `mdp`, `anniv`, `date_creation`) VALUES (NULL, 'Bertrand', 'bertrand@gmail.com', 'motdepasse', '1956-09-30	', '2023-12-07 18:22:34');")
            const out = await sqlRequest(rq);
            if (out.code == 200) {
                const line = await sqlRequest("SELECT * FROM utilisateurs WHERE id = 2");
                if (line.result[1][0][1] == "Bernard") {
                    nextPart(el);
                    const lines = await sqlRequest("SELECT * FROM utilisateurs");
                    const tableStructureHTML = document.getElementById('table_structure_2');
                    for (let i = 0; i < lines.result[1].length; i++) {
                        let htmlTableBody = document.createElement('tr');
                        lines.result[1][i].forEach(el => {
                            let htmlTableData = document.createElement('td');
                            htmlTableData.innerHTML = el;
                            htmlTableBody.appendChild(htmlTableData);
                        });
                        tableStructureHTML.appendChild(htmlTableBody);
                    }
                } else {
                    err.innerHTML = "La bonne ligne n'a pas été modifiée";
                }
            } else {
                err.innerHTML = "Error: " + out.result;
            }
        } else {}
    } catch (error) {
        console.log(error);
    }
}

async function fifthStep(el) {
    const request = await fetch('http://127.0.0.1:5000/root');
    const parent = document.getElementById(el);
    try {
        const data = await request.json();
        if (data.code == 200) {
            const rq = parent.getElementsByClassName('sql_input')[0].value;
            const err = parent.getElementsByClassName('output_error')[0];
            await sqlRequest("CREATE TABLE `sql_project`.`utilisateurs` ( `id` INT NOT NULL AUTO_INCREMENT , `nom` TEXT NOT NULL , `email` VARCHAR(150) NOT NULL , `mdp` VARCHAR(500) NOT NULL , `anniv` DATE NOT NULL , `date_creation` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (`id`)) ENGINE = MyISAM;")
            await sqlRequest("INSERT INTO `utilisateurs` (`id`, `nom`, `email`, `mdp`, `anniv`, `date_creation`) VALUES (NULL, 'Denis', 'denis@gmail.com', 'azerty123', '2000-12-07', '2023-12-07 12:00:00');")
            await sqlRequest("INSERT INTO `utilisateurs` (`id`, `nom`, `email`, `mdp`, `anniv`, `date_creation`) VALUES (NULL, 'Jean', 'jean@gmail.com', '123456789', '1999-01-21', '2023-12-07 02:52:54');")
            await sqlRequest("INSERT INTO `utilisateurs` (`id`, `nom`, `email`, `mdp`, `anniv`, `date_creation`) VALUES (NULL, 'Marie', 'marie@gmail.com', 'mdp', '2001-05-12', '2023-12-07 17:25:37');")
            await sqlRequest("INSERT INTO `utilisateurs` (`id`, `nom`, `email`, `mdp`, `anniv`, `date_creation`) VALUES (NULL, 'Bertrand', 'bertrand@gmail.com', 'motdepasse', '1956-09-30	', '2023-12-07 18:22:34');")
            const lines = await sqlRequest(rq);
            if (lines.code == 200) {
                nextPart(el);
                const tableStructureHTML = document.getElementById('table_structure_1');
                for (let i = 0; i < lines.result[1].length; i++) {
                    let htmlTableBody = document.createElement('tr');
                    lines.result[1][i].forEach(el => {
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
            console.log(data);
        }
    } catch (error) {
        console.log(error);
    }
}

async function sixthStep(el) {
    const response = await fetch('http://127.0.0.1:5000/root');
    const completeDataBase = await fetch("../assets/sql/complete_database.sql");
    const parent = document.getElementById(el);
    try {
        const data = await response.json();
        if (data.code == 200) {
            // Execute SQL request
            const rq = parent.getElementsByClassName('sql_input')[0].value;
            const err = parent.getElementsByClassName('output_error')[0];

            // Execute SQL file
            const sqlFile = await completeDataBase.text();
            const sqlFileLines = sqlFile.split(";");
            for (let i = 0; i < sqlFileLines.length; i++) {
                await sqlRequest(sqlFileLines[i]);
            }

            const out = await sqlRequest(rq);
            if (out.code == 200) {
                nextPart(el);
                const tableStructureHTML = document.getElementById('table_structure_2');
                for (let i = 0; i < out.result[1].length; i++) {
                    let htmlTableBody = document.createElement('tr');
                    out.result[1][i].forEach(el => {
                        let htmlTableData = document.createElement('td');
                        htmlTableData.innerHTML = el;
                        htmlTableBody.appendChild(htmlTableData);
                    });
                    tableStructureHTML.appendChild(htmlTableBody);
                }
            } else {
                err.innerHTML = "Error: " + out.result;
            }
        } else {}
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