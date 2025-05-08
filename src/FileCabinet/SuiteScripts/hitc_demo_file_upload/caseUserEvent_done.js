/**
 * caseUserEvent_done.ts
 *
 * @NScriptName Case - User Event - Done
 * @NScriptType UserEventScript
 * @NApiVersion 2.1
 */
define(["require", "exports", "N/log", "N/runtime"], function (require, exports, log, runtime) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.beforeSubmit = beforeSubmit;
    function beforeSubmit(context) {
        log.debug('beforeSubmit', `${runtime.executionContext} ${context.type} case ${context.newRecord.id}`);
        if (context.type == context.UserEventType.CREATE) {
            context.newRecord.setValue({ fieldId: 'custevent_screenshot', value: context.newRecord.getValue('custevent_screenshot_file_id') });
            context.newRecord.setValue({ fieldId: 'custevent_execution_logs', value: context.newRecord.getValue('custevent_execution_logs_file_id') });
        }
    }
});
