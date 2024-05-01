import mariadb from 'mariadb';

let cachedPool = undefined;

async function connectionPool() {
    if (cachedPool) return cachedPool;
    return cachedPool = mariadb.createPool({
        host: "127.0.0.1",
        port: 3306,
        user: "root",
        password: "Csd01j?@JUUzWyhmC&!",
        database: "swgoh",
        connectionLimit: 2,
        idleTimeout: 300,
        minimumIdle: 1,
    });
}

export async function select(query: string, values: {}) {
    let connection;
    try {
        const pool = await connectionPool();
        connection = await pool.getConnection();
        return await connection.query({
            namedPlaceholders: true,
            sql: query,
            values: values,
        });
    } catch (error) {
        throw error;
    } finally {
        if (connection) {
            connection.release();
        }
    }
}
export async function execute(query: string, values) {
    let connection;
    try {
        const pool = await connectionPool();
        connection = await pool.getConnection();
        return await connection.query({
            lastInsertId: true,
            sql: query,
            supportBigNumbers: true,
            insertIdAsNumber: true,
        }, values);
    } catch (error) {
        throw error;
    } finally {
        if (connection) {
            connection.release();
        }
    }
}