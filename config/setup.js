const { Client } = require('pg');
const fs = require('fs');
require('dotenv').config();

const runSchema = async () => {

    const db = process.env.DATABASE_NAME;

    const client = new Client({

        connectionString: process.env.DATABASE_URL,
        ssl: {

            rejectUnauthorized: false

        }

    })

    try {

        console.log('Connecting to database');
        await client.connect();

        const result = await client.query(`SELECT 1 FROM information_schema.tables WHERE datname = $1`, [db]);
        if (result.rowCount === 0) {

            console.log(`Database '${db}' does not exist. Creating...`);
            await client.query(`CREATE DATABASE ${db} OWNER ${process.env.DATABASE_USER}`);
            console.log(`Database '${db}' created successfully.`);

            const schema = fs.readFileSync('config/schema.sql', 'utf8');
            await client.query(schema);
            console.log('Schema applied successfully.');

        } else {

            console.log(`Database '${db}' already exists.`);

        }

    } catch (e) {

        console.log(e);
        return;

    } finally {

        await client.end();
        console.log('Disconnected from database');

    }

};

runSchema();