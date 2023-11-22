const path = require("path")
const DbDocs = require("../db/qualidadeModel.js")
const Usuarios = require("../db/users.js")

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
        const inspetores = await Usuarios.responsaveis("qualidade")
        if(res.locals.logado.setor != "qualidade"){
            res.send("Acesso exclusivo da qualidade.");
        }else{
            res.render("qualidade/editarNovoDocumento", {
                inspetores: inspetores
            });
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
            doc: doc[0],
        })

    } catch (error) {
        console.log(error);
        res.render("error");
    }
}


const salvaDocEditado = async(req, res)=>{
    try {
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

const acessaEdp = async(req, res)=>{
    try {
        const logado = res.locals.logado;

        const respEdp = await Usuarios.responsaveis("edp");
        const camposEdp = await DbDocs.camposEdp(req.params.id);
        res.render("qualidade/acessaEdp", {
            camposEdp: camposEdp[0],
            respsEdp: respEdp,
            logado: logado
        })
    } catch (error) {
        console.log(error);
        res.render("error");
    }
}

const atualizaEdp = async(req, res)=>{
    try {
        await DbDocs.atualizaEdp(
            req.body.tempo_previsto,
            req.body.instrucao_reprocesso,
            req.body.edp_responsavel,
            req.body.edp_data,
            parseInt(req.params.id)
        )

        res.redirect("/documentos-qualidade");
    } catch (error) {
        console.log(error);
        res.render("error");
    }
}

const acessaPcp = async(req, res)=>{
    try {
        const logado = res.locals.logado;

        const camposVaziosEdp = await DbDocs.camposVaziosEdp(req.params.id)
        let camposVazios

        for (const [key, value] of Object.entries(camposVaziosEdp[0])) {
            if(value == ""){
                camposVazios = true;
                break;
            }else{
                camposVazios = false
            }
        }

        const respPcp = await Usuarios.responsaveis("pcp");
        const camposPcp = await DbDocs.camposPcp(req.params.id)
        res.render("qualidade/acessaPcp", {
            camposPcp: camposPcp[0],
            respPcp: respPcp,
            camposVazios: camposVazios,
            logado: logado
        })
    } catch (error) {
        console.log(error);
        res.render("error");
    }
}

const atualizaPcp = async(req, res)=>{
    try {
        await DbDocs.atualizaPcp(
            req.body.pcp_odf_retrabalho,
            req.body.pcp_responsavel,
            req.body.pcp_data,
            req.body.pcp_obs,
            parseInt(req.params.id)
        )

        res.redirect("/documentos-qualidade");
    } catch (error) {
        console.log(error);
        res.render("error");
    }
}

const acessaProd = async(req, res)=>{
    try {
        const logado = res.locals.logado;
        const camposVaziosPcp = await DbDocs.camposVaziosPcp(req.params.id)
        let camposVazios

        for (const [key, value] of Object.entries(camposVaziosPcp[0])) {
            if(value == ""){
                camposVazios = true;
                break;
            }else{
                camposVazios = false
            }
        }

        const respProd = await Usuarios.responsaveis("producao");
        const camposProd = await DbDocs.camposProd(req.params.id)
        res.render("qualidade/acessaProd", {
            camposProd: camposProd[0],
            respProd: respProd,
            camposVazios: camposVazios,
            logado: logado
        })
    } catch (error) {
        console.log(error);
        res.render("error");
    }
}

const atualizaProd = async(req, res)=>{
    try {
        await DbDocs.atualizaProd(
            req.body.prod_tempo_realizado,
            req.body.prod_insumos,
            req.body.prod_sucata,
            req.body.prod_obs,
            req.body.prod_responsavel,
            req.body.prod_data,
            req.body.prod_status,
            parseInt(req.params.id)
        )

        res.redirect("/documentos-qualidade");
    } catch (error) {
        console.log(error);
        res.render("error");
    }
}

const acessaQuali = async(req, res)=>{
    try {
        const logado = res.locals.logado;
        const camposVaziosProducao = await DbDocs.camposVaziosProducao(req.params.id)
        let camposVazios

        for (const [key, value] of Object.entries(camposVaziosProducao[0])) {
            if(value == ""){
                camposVazios = true;
                break;
            }else{
                camposVazios = false
            }
        }


        const respQuali = await Usuarios.responsaveis("qualidade");
        const camposQuali = await DbDocs.camposQuali(req.params.id)
        res.render("qualidade/acessaQuali", {
            camposQuali: camposQuali[0],
            respQuali: respQuali,
            camposVazios: camposVazios,
            logado: logado
        })
    } catch (error) {
        console.log(error);
        res.render("error");
    }
}

const atualizaQuali = async(req, res)=>{
    try {
        await DbDocs.atualizaQuali(
            req.body.quali_parecer,
            req.body.quali_responsavel,
            req.body.quali_data,
            req.body.quali_status,
            parseInt(req.params.id)
        )

        res.redirect("/documentos-qualidade");
    } catch (error) {
        console.log(error);
        res.render("error");
    }
}

const motivoNc = async(req, res)=>{
    try {
        const motivoNc = await DbDocs.motivoNc(req.params.id)

        res.render('qualidade/motivoNc', {
            motivoNc: motivoNc[0]
        })
    } catch (error) {
        console.log(error);
        res.render("error");
    }
}

const atualizaMotivoNc = async(req, res)=>{
    try {
        await DbDocs.atualizaMotivoNc(req.body.motivo_nc, res.locals.logado.name, req.params.id)

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
    salvaDocEditado,
    acessaEdp,
    atualizaEdp,
    acessaPcp,
    atualizaPcp,
    acessaProd,
    atualizaProd,
    acessaQuali,
    atualizaQuali,
    motivoNc,
    atualizaMotivoNc
}