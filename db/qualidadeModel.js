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
    const [values] = await conn.query('select * from docspro.docs_qualidade order by id desc');
    conn.end();
    return values
}

const insertDocs = async(tipo_doc, data, inspetor, cod_prod, descri, lote_odf, lance, quantidade_metragem, cpnc_numero)=>{
    const conn = await connect();
    await conn.query('INSERT INTO docspro.docs_qualidade (tipo_doc, data, inspetor, cod_prod, descri, lote_odf, lance, quantidade_metragem, cpnc_numero, motivo_nc, tempo_previsto, instrucao_reprocesso, edp_responsavel, edp_data, pcp_odf_retrabalho, pcp_responsavel, pcp_data, pcp_obs, prod_tempo_realizado, prod_insumos, prod_sucata, prod_obs, prod_responsavel, prod_data, prod_status, quali_parecer, quali_responsavel, quali_data, quali_status, motivo_nc_usuario) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "")',
    [tipo_doc, data, inspetor, cod_prod, descri, lote_odf, lance, quantidade_metragem, cpnc_numero]);
    conn.end();
}

const showDoc = async(id)=>{
    const conn = await connect();
    const [values] = await conn.query('select * from docspro.docs_qualidade where id = ?', [id]);
    conn.end();
    return values
}

const camposVaziosEdp = async(id)=>{
    const conn = await connect();
    const [values] = await conn.query('select edp_responsavel, edp_data, tempo_previsto, instrucao_reprocesso from docspro.docs_qualidade where id = ?', [id]);
    conn.end();
    return values
}

const camposVaziosPcp = async(id)=>{
    const conn = await connect();
    const [values] = await conn.query('select pcp_odf_retrabalho, pcp_responsavel, pcp_data, pcp_obs from docspro.docs_qualidade where id = ?', [id]);
    conn.end();
    return values
}

const camposVaziosProducao = async(id)=>{
    const conn = await connect();
    const [values] = await conn.query('select prod_tempo_realizado, prod_insumos, prod_sucata, prod_obs, prod_responsavel, prod_data, prod_status from docspro.docs_qualidade where id = ?', [id]);
    conn.end();
    return values;
}

const camposEdp = async(id)=>{
    const conn = await connect();
    const [values] = await conn.query('select id, tempo_previsto, instrucao_reprocesso, edp_responsavel, edp_data from docspro.docs_qualidade where id = ?', [id]);
    conn.end();
    return values
}

const camposPcp = async(id)=>{
    const conn = await connect();
    const [values] = await conn.query('select id, pcp_odf_retrabalho, pcp_responsavel, pcp_data, pcp_obs from docspro.docs_qualidade where id = ?', [id]);
    conn.end();
    return values
}

const motivoNc = async(id)=>{
    const conn = await connect();
    const [values] = await conn.query('select id, motivo_nc, motivo_nc_usuario from docspro.docs_qualidade where id = ?', [id]);
    conn.end();
    return values
}

const atualizaMotivoNc = async(motivo_nc, logado, id)=>{
    const conn = await connect();
    const [values] = await conn.query('update docspro.docs_qualidade set motivo_nc = ?, motivo_nc_usuario = ? where id = ?', [motivo_nc, logado, id]);
    conn.end();
    return values
}

const camposProd = async(id)=>{
    const conn = await connect();
    const [values] = await conn.query('select id, prod_tempo_realizado, prod_insumos, prod_sucata, prod_obs, prod_responsavel, prod_data, prod_status from docspro.docs_qualidade where id = ?', [id]);
    conn.end();
    return values
}

const camposQuali = async(id)=>{
    const conn = await connect();
    const [values] = await conn.query('select id, quali_parecer, quali_responsavel, quali_data, quali_status from docspro.docs_qualidade where id = ?', [id]);
    conn.end();
    return values
}

const atualizaEdp = async(
    tempo_previsto,
    instrucao_reprocesso,
    edp_responsavel,
    edp_data,
    parameter
)=>{
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

const atualizaPcp = async(
    pcp_odf_retrabalho,
    pcp_responsavel,
    pcp_data,
    pcp_obs,
    parameter
)=>{
const conn = await connect();
await conn.query("update docspro.docs_qualidade set pcp_odf_retrabalho = ?, pcp_responsavel = ?, pcp_data = ?, pcp_obs = ? where id = ?", [
    pcp_odf_retrabalho,
    pcp_responsavel,
    pcp_data,
    pcp_obs,
    parameter
]);
conn.end();
}

const atualizaProd = async(
    prod_tempo_realizado,
    prod_insumos,
    prod_sucata,
    prod_obs,
    prod_responsavel,
    prod_data,
    prod_status,
    parameter
)=>{
const conn = await connect();
await conn.query("update docspro.docs_qualidade set prod_tempo_realizado = ?, prod_insumos = ?, prod_sucata = ?, prod_obs = ?, prod_responsavel = ?, prod_data = ?, prod_status = ? where id = ?", [
    prod_tempo_realizado,
    prod_insumos,
    prod_sucata,
    prod_obs,
    prod_responsavel,
    prod_data,
    prod_status,
    parameter
]);
conn.end();
}

const atualizaQuali = async(
    quali_parecer,
    quali_responsavel,
    quali_data,
    quali_status,
    parameter
)=>{
const conn = await connect();
await conn.query("update docspro.docs_qualidade set quali_parecer = ?, quali_responsavel = ?, quali_data = ?, quali_status = ? where id = ?", [
    quali_parecer,
    quali_responsavel,
    quali_data,
    quali_status,
    parameter
]);
conn.end();
}


const countDocs = async()=>{
    const conn = await connect();
    const [values] = await conn.query('select count(id) as contagem from docspro.docs_qualidade');
    conn.end();
    return values[0].contagem
}

const updateDoc = async(
        tempo_previsto,
        instrucao_reprocesso,
        edp_responsavel,
        edp_data,
        pcp_odf_retrabalho,
        pcp_responsavel,
        pcp_data,
        pcp_obs,
        prod_tempo_realizado,
        prod_insumos,
        prod_sucata,
        prod_obs,
        prod_responsavel,
        prod_data,
        prod_status,
        quali_parecer,
        quali_responsavel,
        quali_data,
        quali_status,
        geral_obs,
        parameter
    )=>{
    const conn = await connect();
    await conn.query("update docspro.docs_qualidade set tempo_previsto = ?, instrucao_reprocesso = ?, edp_responsavel = ?, edp_data = ?, pcp_odf_retrabalho = ?, pcp_responsavel = ?, pcp_data = ?, pcp_obs = ?, prod_tempo_realizado = ?, prod_insumos = ?, prod_sucata = ?, prod_obs = ?, prod_responsavel = ?, prod_data = ?, prod_status = ?, quali_parecer = ?, quali_responsavel = ?, quali_data = ?, quali_status = ?, geral_obs = ? where id = ?", [
        tempo_previsto,
        instrucao_reprocesso,
        edp_responsavel,
        edp_data,
        pcp_odf_retrabalho,
        pcp_responsavel,
        pcp_data,
        pcp_obs,
        prod_tempo_realizado,
        prod_insumos,
        prod_sucata,
        prod_obs,
        prod_responsavel,
        prod_data,
        prod_status,
        quali_parecer,
        quali_responsavel,
        quali_data,
        quali_status,
        geral_obs,
        parameter
    ]);
    conn.end();
}


module.exports = {
    insertDocs,
    showDocs,
    showDoc,
    countDocs,
    updateDoc,
    camposVaziosEdp,
    camposVaziosPcp,
    camposEdp,
    atualizaEdp,
    camposPcp,
    atualizaPcp,
    camposProd,
    atualizaProd,
    camposQuali,
    atualizaQuali,
    camposVaziosProducao,
    motivoNc,
    atualizaMotivoNc
}