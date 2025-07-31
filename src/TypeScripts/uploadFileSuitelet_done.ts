/**
 * uploadFileSuitelet_done.ts
 *
 * @NScriptName Upload File Suitelet - Done
 * @NScriptType Suitelet
 * @NApiVersion 2.1
 */

import {EntryPoints} from "N/types";
import file = require('N/file');
import log = require('N/log');

export function onRequest(context: EntryPoints.Suitelet.onRequestContext) {
  const fileContent = context.request.parameters['content'] as string || '';
  const fileName = context.request.parameters['name'] as string;
  const type = context.request.parameters['fileType'] as string;
  const folder = context.request.parameters['folder'] as number || -10; // -10 is the Attachments Received folder
  log.debug(context.request.method, `Received data for fileName ${fileName}, type ${type}, folder ${folder}, data: ${fileContent.length}`);
  if (context.request.method == 'POST' && fileContent && fileName) {
    const FileTypes = { 'pdf': file.Type.PDF, 'doc': file.Type.WORD, 'png': file.Type.PNGIMAGE, 'jpg': file.Type.JPGIMAGE, 'csv': file.Type.CSV };
    const fileType = FileTypes[type] || file.Type.PLAINTEXT;
    let fileId = 0;
    try {
      const fileObj = file.create({ fileType, name: fileName, contents: fileContent, folder, isOnline: true });
      fileId           = fileObj.save();
      log.debug('createFile', `Created file ID: ${fileId}, type ${fileType} (from type ${type}).`);
    } catch(e) { // Probably too large (> 10MB)
      log.error('createFile', `Failed to create file: ${e.message}`);
      return '0';
    }
    context.response.write({ output: String(fileId) });
  }
}
