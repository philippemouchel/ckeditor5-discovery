import { Plugin } from '@ckeditor/ckeditor5-core';

import AbbreviationEditing from './abbreviationediting';
import AbbreviationUI from './abbreviationui';

export default class Abbreviation extends Plugin {
    static get requires() {
        return [ AbbreviationEditing, AbbreviationUI ];
    }
}