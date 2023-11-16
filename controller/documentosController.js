const path = require("path")
const DbDocs = require("../db/qualidadeModel.js")

const docsQualidade = async(req, res)=>{
    try {
        res.render("qualidade/home", {
            docs: await DbDocs.showDocs(),
            contagem: await DbDocs.countDocs()
        });
    } catch (error) {
        console.log(error);
        res.render("error");
    };
};

const newDocsQualidade = async(req, res)=>{
    try {
        if(res.locals.logado.setor != "qualidade"){
            res.send("Acesso exclusivo da qualidade.");
        }else{
            res.render("qualidade/novoDocumento");
        }
    } catch (error) {
        console.log(error);
        res.render("error");
    };
};

const renderizaArquivo = async(req, res)=>{
    try {
        res.sendFile(path.join(__dirname, `../storage/FOR-EDP-025.pdf`));
    } catch (error) {
        console.log(error);
        res.render("error");
    };
};

const editarNovoDocumento = async(req, res)=>{
    try {
        if(res.locals.logado.setor != "qualidade"){
            res.send("Acesso exclusivo da qualidade.");
        }else{
            res.render("qualidade/editarNovoDocumento");
        }
    } catch (error) {
        console.log(error);
        res.render("error");
    };
};

const salvarNovoDocumento = async (req, res)=>{
    try {
        await DbDocs.insertDocs(
            req.body.tipo_doc,
            req.body.data,
            req.body.inspetor,
            req.body.cod_prod,
            req.body.descri,
            req.body.lote_odf,
            req.body.lance,
            req.body.quantidade_metragem,
            req.body.cpnc_numero,
            req.body.motivo_nc,
        )
        res.redirect("/documentos-qualidade");
    } catch (error) {
        console.log(error);
        res.render("error");
    }
}

const mostraDocumento = async(req, res)=>{
    try {
        const doc = await DbDocs.showDoc(req.params.id)
        res.render("qualidade/mostraDocumento", {
            doc: doc[0]
        })
    } catch (error) {
        console.log(error);
        res.render("error");
    }
}


const salvaDocEditado = async(req, res)=>{
    try {
        console.log(req.body)
        await DbDocs.updateDoc(
            req.body.tempo_previsto,
            req.body.instrucao_reprocesso,
            req.body.edp_responsavel,
            req.body.edp_data,
            req.body.pcp_odf_retrabalho,
            req.body.pcp_responsavel,
            req.body.pcp_data,
            req.body.pcp_obs,
            req.body.prod_tempo_realizado,
            req.body.prod_insumos,
            req.body.prod_sucata,
            req.body.prod_obs,
            req.body.prod_responsavel,
            req.body.prod_data,
            req.body.prod_status,
            req.body.quali_parecer,
            req.body.quali_responsavel,
            req.body.quali_data,
            req.body.quali_status,
            req.body.geral_obs,
            req.params.id,
        );

        res.redirect("/documentos-qualidade");
    } catch (error) {
        console.log(error);
        res.render("error");
    }
}

module.exports = {
    docsQualidade,
    newDocsQualidade,
    renderizaArquivo,
    editarNovoDocumento,
    salvarNovoDocumento,
    mostraDocumento,
    salvaDocEditado
}