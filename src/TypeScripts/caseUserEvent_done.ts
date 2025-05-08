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
    context.newRecord.setValue({ fieldId: 'custevent_screenshot', value: context.newRecord.getValue('custevent_screenshot_file_id') });
    context.newRecord.setValue({ fieldId: 'custevent_execution_logs', value: context.newRecord.getValue('custevent_execution_logs_file_id') });
  }
}
