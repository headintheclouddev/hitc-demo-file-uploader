/**
 * caseUserEvent_done.ts
 *
 * @NScriptName Case - User Event - Done
 * @NScriptType UserEventScript
 * @NApiVersion 2.1
 */
define(["require", "exports", "N/log", "N/record", "N/runtime"], function (require, exports, log, record, runtime) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.beforeSubmit = beforeSubmit;
    exports.afterSubmit = afterSubmit;
    function beforeSubmit(context) {
        log.debug('beforeSubmit', `${runtime.executionContext} ${context.type} case ${context.newRecord.id}`);
        if (context.type == context.UserEventType.CREATE) {
            // This seems to not work very well on most accounts.  Why?  Not sure, but afterSubmit method seems to work better.
            // const screenshotId = context.newRecord.getValue('custevent_screenshot_file_id') as string;
            // const logsFileId = context.newRecord.getValue('custevent_execution_logs_file_id') as string;
            // context.newRecord.setValue({ fieldId: 'custevent_screenshot', value: screenshotId });
            // context.newRecord.setValue({ fieldId: 'custevent_execution_logs', value: logsFileId });
        }
    }
    function afterSubmit(context) {
        log.debug('afterSubmit', `${runtime.executionContext} ${context.type} case ${context.newRecord.id}`);
        if (context.type == context.UserEventType.CREATE) {
            const screenshotId = context.newRecord.getValue('custevent_screenshot_file_id');
            const logsFileId = context.newRecord.getValue('custevent_execution_logs_file_id');
            if (screenshotId || logsFileId)
                record.submitFields({ type: 'supportcase', id: context.newRecord.id, values: { custevent_screenshot: screenshotId, custevent_execution_logs: logsFileId } });
        }
    }
});
