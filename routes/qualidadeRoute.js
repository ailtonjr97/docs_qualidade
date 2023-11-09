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
    salvaDocEditado
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
router.post("/salvar-documento-editado/:id", salvaDocEditado)

module.exports = router;