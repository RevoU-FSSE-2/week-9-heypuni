const express = require('express')
const mysql = require('mysql2')
const bodyParser = require('body-parser')
const { error } = require('console')

const app = express()

const commonResponse = function(data, error){
    if (error) {
        return {
            success: false,
            error: error
        }
    }
    return {
        success: true,
        data: data
    }
}

const mysqlCon = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'N0h4ckplz.',
    database: 'revou'
})

mysqlCon.connect((err) => {
    if (err) throw err

    console.log("Mysql Successfully Connected")
})

app.use(bodyParser.json())

app.get('/user', (request, response) => {
    mysqlCon.query("select * from revou.user", (err, result, fields) => {
        if (err) {
            console.log(error)
            response.status(500).send(commonResponse(null, "server error"))
            response.end()
            return
        }
        response.status(200).send(commonResponse(result, null))
        response.end()
    })
})

app.get('/user/:id', (request, response) => {
    const id = request.params.id;
    const query = `SELECT
      u.id,
      u.name,
      u.address,
      SUM(t.amount) AS balance,
      GROUP_CONCAT(CONCAT(t.type, ': ', t.amount) SEPARATOR ', ') as transactions
    FROM user u
    LEFT JOIN transaction t ON u.id = t.user_id
    WHERE u.id = ?
    GROUP BY u.id, u.name, u.address;`;

    mysqlCon.query(query, [id], (err, result, fields) => {
        if (err) {
            console.error(err);
            response.status(500).json(commonResponse(null, "Server error"));
            response.end();
            return;
        } else {
            response.status(200).json(commonResponse(result[0], null));
        }
    });
});

app.post('/user', (request, response) => {
    const body = request.body

    mysqlCon.query(`insert into
    revou.user (name, address)
    values (?, ?);`, [request.body.name, request.body.address], (err, result, fields) => {
        if (err) {
            console.error(err)
            response.status(500).json(commonResponse(null, "server error"))
            response.end()
            return
        }

        response.status(200).json(commonResponse({
            id: result.insertId
        }, null))
        response.end()
    })
})

app.post('/transaction', (request, response) => {
    const body = request.body

    mysqlCon.query(`insert into 
    revou.transaction (type, amount, user_id)
    values (?, ?, ?);`, [request.body.type, request.body.amount, request.body.user_id], (err, result, fields) => {
        if (err) {
            console.error(err)
            response.status(500).json(commonResponse(null, "server error"))
            response.end()
            return
        }

        response.status(200).json(commonResponse({
            id: result.insertId
        }, null))
        response.end()
    })
})

app.put('/transaction/:id', (request, response) => {
    const id = request.params.id;
    const body = request.body;

    mysqlCon.query('update revou.transaction set type = ?, amount = ?, user_id = ? where id = ?',
    [body.type, body.amount, body.user_id, id], (err, result, fields) => {
        if (err) {
            console.error(err)
            response.status(500).json(commonResponse(null, "server error"))
            response.end()
            return
        }

        if (result.affectedRows == 0) {
            response.status(404).json(commonResponse(null, "data not found"))
            response.end()
            return
        }

        response.status(200).json(commonResponse({
            id: id
        }, null))
        response.end()
    })
})

app.delete('/transaction/:id', (request, response) => {
    const id = request.params.id;

    mysqlCon.query("delete from revou.transaction where id = ?", id, (err, result, fields) => {
        if (err) {
            console.error(err)
            response.status(500).json(commonResponse(null, "server error"))
            response.end()
            return
        }

        if (result.affectedRows == 0) {
            response.status(404).json(commonResponse(null, "data not found"))
            response.end()
            return
        }

        response.status(200).json(commonResponse({
            id: id
        }, null))
        response.end()
    })
})

app.get("/", (request, response) => {
    response.send("Welcome to my 9th week assignment!")
});

app.listen(3000, () => {
    console.log("running in 3000")
})




