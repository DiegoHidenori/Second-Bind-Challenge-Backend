const { Client } = require('pg');
const fs = require('fs');
require('dotenv').config();

const runSchema = async () => {

    const client = new Client ({

        host: process.env.DATABASE_HOST,
        database: process.env.DATABASE_NAME,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        port: process.env.DATABASE_PORT,

    });

    try {

        console.log('Connecting to database');
        await client.connect();

        const schema = fs.readFileSync('schema.sql', 'utf8');
        await client.query(schema);
        console.log('Schema created');

    } catch (e) {

        console.log(e);

    } finally {

        await client.end();
        console.log('Disconnected from database');

    }

};

runSchema();