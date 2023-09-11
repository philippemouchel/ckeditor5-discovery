import NoteBlockEditing from './noteBlockEditing';
import NoteBlockUI from './noteBlockUI';
import { Plugin } from '@ckeditor/ckeditor5-core';

export default class NoteBlock extends Plugin {
    static get requires() {
        return [ NoteBlockEditing, NoteBlockUI ];
    }
}