import { Client } from 'pg'

export interface PostgresConnectOptions {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
}

const options = {
    host: process.env.POSTGRES_HOST || "",
    port: Number(process.env.POSTGRES_PORT) || 5432,
    user: process.env.POSTGRES_USER || "",
    password: process.env.POSTGRES_PASSWORD || "",
    database: process.env.POSTGRES_DATABASE || "",
}

// Create a singleton where the database connection is stored
let connection: any = null;

// Create connection to database
export const connect = async (options: PostgresConnectOptions) => {
    console.log('Connecting to database...');

    // Create connection to database
    const client = new Client(options);
    await client.connect();

    // Store connection
    connection = client;

    console.log('Connected to database');
    return true;
}


export const get_connection = async () => {
    if (!connection) {
        await connect(options);
    }

    return connection;
}

connect(options);