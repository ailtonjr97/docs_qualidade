const express = require("express");
const router = express.Router();
const multer = require('multer');

const {
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
} = require('../controller/documentosController.js');

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

//documentos teste Maria
router.get("/documentos-qualidade", docsQualidade);
router.get("/novo-documento-qualidade", newDocsQualidade);
router.get("/enviar-documento-qualidade", renderizaArquivo);
router.get("/editar-novo-documento", editarNovoDocumento);
router.post("/salvar-novo-documento", salvarNovoDocumento);
router.get("/mostra-documento/:id", mostraDocumento);
router.post("/salvar-documento-editado/:id", salvaDocEditado);
router.get("/acessa-edp/:id", acessaEdp);
router.post("/atualiza-edp/:id", atualizaEdp);
router.get("/acessa-pcp/:id", acessaPcp);
router.post("/atualiza-pcp/:id", atualizaPcp);
router.get("/acessa-prod/:id", acessaProd);
router.post("/atualiza-prod/:id", atualizaProd);
router.get("/acessa-quali/:id", acessaQuali);
router.post("/atualiza-quali/:id", atualizaQuali);
router.get("/motivo-nc/:id", motivoNc);
router.post("/motivo-nc/:id", atualizaMotivoNc);

module.exports = router;