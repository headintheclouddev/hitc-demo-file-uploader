/**
 * uploadFileSuitelet_done.ts
 *
 * @NScriptName Upload File Suitelet - Done
 * @NScriptType Suitelet
 * @NApiVersion 2.1
 */
define(["require", "exports", "N/file", "N/log"], function (require, exports, file, log) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.onRequest = onRequest;
    function onRequest(context) {
        const fileContent = context.request.parameters['content'];
        const fileName = context.request.parameters['name'];
        const type = context.request.parameters['fileType'];
        const folder = context.request.parameters['folder'] || -10; // -10 is Attachments Received
        log.debug(context.request.method, `Received data for fileName ${fileName}, type ${type}, folder ${folder}, data: ${fileContent.length}`);
        if (context.request.method == 'POST' && fileContent && fileName) {
            const FileTypes = { 'pdf': file.Type.PDF, 'doc': file.Type.WORD, 'png': file.Type.PNGIMAGE, 'jpg': file.Type.JPGIMAGE, 'csv': file.Type.CSV };
            const fileType = FileTypes[type] || file.Type.PLAINTEXT;
            let fileId = 0;
            try {
                const fileObj = file.create({ fileType, name: fileName, contents: fileContent, folder });
                fileObj.isOnline = true;
                fileId = fileObj.save();
                log.debug('createFile', `Created file ID: ${fileId}, type ${fileType} (from type ${type}).`);
            }
            catch (e) { // [CSI-258] Probably too large (> 10MB)
                log.error('createFile', `Failed to create file: ${e.message}`);
                return '0';
            }
            context.response.write({ output: String(fileId) });
        }
    }
});
