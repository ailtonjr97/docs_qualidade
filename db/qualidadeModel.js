const dotenv = require("dotenv");
dotenv.config();

async function connect(){
    const mysql = require("mysql2/promise");
    const pool = mysql.createPool({
        host: process.env.SQLHOST,
        port: '3306',
        user: process.env.SQLUSER,
        password: process.env.SQLPASSWORD,
        database: process.env.SQLDATABASE,
        waitForConnections: true,
        connectionLimit: 100,
        maxIdle: 100, // max idle connections, the default value is the same as `connectionLimit`
        idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
        queueLimit: 0,
        enableKeepAlive: true,
        keepAliveInitialDelay: 10000
      });
    return pool;
}

connect();

const showDocs = async()=>{
    const conn = await connect();
    const [values] = await conn.query('select * from docspro.docs_qualidade');
    conn.end();
    return values
}

const insertDocs = async(tipo_doc, data, inspetor, cod_prod, descri, lote_odf, lance, quantidade_metragem, cpnc_numero, motivo_nc)=>{
    const conn = await connect();
    await conn.query('INSERT INTO docspro.docs_qualidade (tipo_doc, data, inspetor, cod_prod, descri, lote_odf, lance, quantidade_metragem, cpnc_numero, motivo_nc) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [tipo_doc, data, inspetor, cod_prod, descri, lote_odf, lance, quantidade_metragem, cpnc_numero, motivo_nc]);
    conn.end();
}

const showDoc = async(id)=>{
    const conn = await connect();
    const [values] = await conn.query('select * from docspro.docs_qualidade where id = ?', [id]);
    conn.end();
    return values
}

const countDocs = async()=>{
    const conn = await connect();
    const [values] = await conn.query('select count(id) as contagem from docspro.docs_qualidade');
    conn.end();
    return values[0].contagem
}

const updateDoc = async()=>{
    const conn = await connect();
    await conn.query("update docspro.docs_qualidade set tempo_previsto = ?, instrucao_reprocesso = ?, edp_responsavel = ?, edp_data = ? where id = ?", [
        tempo_previsto,
        instrucao_reprocesso,
        edp_responsavel,
        edp_data,
        parameter
    ]);
    conn.end();
}


module.exports = {
    insertDocs,
    showDocs,
    showDoc,
    countDocs,
    updateDoc
}