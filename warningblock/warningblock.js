import WarningBlockEditing from './warningblockediting';
import WarningBlockUI from './warningblockui';
import { Plugin } from '@ckeditor/ckeditor5-core';

export default class WarningBlock extends Plugin {
    static get requires() {
        return [ WarningBlockEditing, WarningBlockUI ];
    }
}