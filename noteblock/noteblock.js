import NoteBlockEditing from './noteblockediting';
import NoteBlockUI from './noteblockui';
import { Plugin } from '@ckeditor/ckeditor5-core';

export default class NoteBlock extends Plugin {
    static get requires() {
        return [ NoteBlockEditing, NoteBlockUI ];
    }
}