/**
 * caseUserEvent_done.ts
 *
 * @NScriptName Case - User Event - Done
 * @NScriptType UserEventScript
 * @NApiVersion 2.1
 */

import {EntryPoints} from "N/types";
import log = require('N/log');
import runtime = require('N/runtime');

export function beforeSubmit(context: EntryPoints.UserEvent.beforeSubmitContext) {
  log.debug('beforeSubmit', `${runtime.executionContext} ${context.type} case ${context.newRecord.id}`);
  if (context.type == context.UserEventType.CREATE) {
    // This seems to not work very well on most accounts.  Why?  Not sure, but afterSubmit method seems to work better.
    const screenshotId = context.newRecord.getValue('custevent_screenshot_file_id') as string;
    const logsFileId = context.newRecord.getValue('custevent_execution_logs_file_id') as string;
    context.newRecord.setValue({ fieldId: 'custevent_screenshot', value: screenshotId });
    context.newRecord.setValue({ fieldId: 'custevent_execution_logs', value: logsFileId });
  }
}

export function afterSubmit(context: EntryPoints.UserEvent.afterSubmitContext) {
  log.debug('afterSubmit', `${runtime.executionContext} ${context.type} case ${context.newRecord.id}`);
  // if (context.type == context.UserEventType.CREATE) {
  //   const screenshotId = context.newRecord.getValue('custevent_screenshot_file_id') as string;
  //   const logsFileId = context.newRecord.getValue('custevent_execution_logs_file_id') as string;
  //   if (screenshotId || logsFileId)
  //     record.submitFields({ type: 'supportcase', id: context.newRecord.id, values: { custevent_screenshot: screenshotId, custevent_execution_logs: logsFileId } });
  // }
}

