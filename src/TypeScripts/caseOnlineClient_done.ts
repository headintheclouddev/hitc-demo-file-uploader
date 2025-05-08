/**
 * caseOnlineClient_done.ts
 *
 * @NScriptType ClientScript
 * @NApiVersion 2.1
 */

import {EntryPoints} from "N/types";
import record = require("N/record");

export function pageInit(context: EntryPoints.Client.pageInitContext) {
  console.log('Page Init running');
  addFileUploadHandler(context.currentRecord, 'custevent_screenshot_file_id', '#screenshot');
  addFileUploadHandler(context.currentRecord, 'custevent_execution_logs_file_id', '#logs');
}

function addFileUploadHandler(rec: record.ClientCurrentRecord, fileIdField: string, imageInputId: string): void {
  jQuery(imageInputId).on('change', (event) => {
    const input = event.target as HTMLInputElement;
    if (input.files.length > 0) { // Else maybe they cleared the field
      const reader   = new FileReader();
      const fileName = input.files[0].name;
      const fileType = getFileType(input.files[0]);
      reader.onload = function() {
        const arrayBuff = reader.result as ArrayBuffer;
        const uIntArray = new Uint8Array(arrayBuff);
        let   binaryStr = '';
        for (let i = 0; i < uIntArray.length; i++) binaryStr += String.fromCharCode(uIntArray[i]);
        const base64Str = btoa(binaryStr);
        console.log('Sending file to suitelet', new Date());
        jQuery('#submit-button').prop('disabled', true);
        // const folder = '66557'; // Case attachments
        // This isn't allowed from an online form, which is why we have to hardcode the suitelet URL:
        // const slUrl = url.resolveScript({ scriptId: 'customscript_upload_file_suitelet', deploymentId: 'customdeploy1', returnExternalUrl: true });
        const suiteletURL = 'https://tstdrv1264278.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=1321&deploy=1&compid=TSTDRV1264278&ns-at=AAEJ7tMQvG0dq-ktXOgIC0JUMZRCU1cdL0lkY7hD4aIN4aFVGPc';
        jQuery.ajax({ url: suiteletURL, data: { content: base64Str, name: `${Date.now()} ${fileName}`, fileType }, method: 'POST' }).then((response: string) => {
          console.log('File processed', response, new Date());
          rec.setValue(fileIdField, response);
          jQuery('#submit-button').prop('disabled', false);
        });
      };
      reader.readAsArrayBuffer(input.files[0]);
    }
  });
}

function getFileType(fileObj: File): string {
  console.log('Processing file type', fileObj.type);
  if (fileObj.type == 'application/pdf')  return 'pdf';
  else if (fileObj.type == 'image/png')   return 'png';
  else if (fileObj.type == 'image/jpeg')  return 'jpg';
  else if (fileObj.name.includes('.doc')) return 'doc';
  else if (fileObj.name.includes('.txt')) return 'txt';
  else return 'bin';
}
