const { Client } = require('pg');
const fs = require('fs');
require('dotenv').config();

const runSchema = async () => {

    const client = new Client({

        connectionString: process.env.DATABASE_URL,
        ssl: {

            rejectUnauthorized: false

        }

    })

    try {

        console.log('Connecting to the database...');
        await client.connect();

        const tableCheckQuery = `
            SELECT 1 
            FROM information_schema.tables 
            WHERE table_schema = 'public' AND table_name = 'inventory';
        `;
        const result = await client.query(tableCheckQuery);

        if (result.rowCount === 0) {

            console.log('Table does not exist. Applying schema...');
            const schema = fs.readFileSync('config/schema.sql', 'utf8');
            await client.query(schema);
            console.log('Schema applied successfully.');

        } else {

            console.log('Table already exists.');

        }
    } catch (e) {

        console.error('Error during setup:', e.message);

    } finally {

        await client.end();
        console.log('Disconnected from the database.');

    }

};

runSchema();