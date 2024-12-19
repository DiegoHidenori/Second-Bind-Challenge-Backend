const { Client } = require('pg');
const fs = require('fs');
require('dotenv').config();

const runSchema = async () => {

    const db = process.env.DATABASE_NAME;

    const defaultClient = new Client ({

        host: process.env.DATABASE_HOST,
        database: 'postgres',
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        port: process.env.DATABASE_PORT,

    });

    try {

        console.log('Connecting to initial database');
        await defaultClient.connect();

        const result = await defaultClient.query(`SELECT 1 FROM pg_database WHERE datname = $1`, [db]);
        if (result.rowCount === 0) {

            console.log(`Database '${db}' does not exist. Creating...`);
            await client.query(`CREATE DATABASE ${db} OWNER ${process.env.DATABASE_USER}`);
            console.log(`Database '${db}' created successfully.`);

        } else {

            console.log(`Database '${db}' already exists.`);

        }

    } catch (e) {

        console.log(e);
        return;

    } finally {

        await defaultClient.end();
        console.log('Disconnected from database');

    }

    const client = new Client({

        host: process.env.DATABASE_HOST,
        database: db,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        port: process.env.DATABASE_PORT,

    });

    try {

        console.log(`Connecting to the database '${db}' to apply the schema...`);
        await client.connect();

        const schema = fs.readFileSync('config/schema.sql', 'utf8');
        await client.query(schema);
        console.log('Schema applied successfully.');

    } catch (e) {

        console.error('Error applying schema:', e.message);

    } finally {

        await client.end();
        console.log('Disconnected from database.');

    }

};

runSchema();