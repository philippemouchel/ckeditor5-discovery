import WarningBlockEditing from './warningBlockEditing';
import WarningBlockUI from './warningBlockUI';
import { Plugin } from '@ckeditor/ckeditor5-core';

export default class WarningBlock extends Plugin {
    static get requires() {
        return [ WarningBlockEditing, WarningBlockUI ];
    }
}