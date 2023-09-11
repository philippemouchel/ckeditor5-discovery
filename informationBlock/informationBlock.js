import InformationBlockEditing from './informationBlockEditing';
import InformationBlockUI from './informationBlockUI';
import { Plugin } from '@ckeditor/ckeditor5-core';

export default class InformationBlock extends Plugin {
    static get requires() {
        return [ InformationBlockEditing, InformationBlockUI ];
    }
}