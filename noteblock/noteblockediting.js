import { Plugin } from '@ckeditor/ckeditor5-core';
import { Widget, toWidget, toWidgetEditable } from '@ckeditor/ckeditor5-widget';

import InsertNoteBlockCommand from './insertnoteblockcommand';

export default class NoteBlockEditing extends Plugin {
    static get requires() {                                                    // ADDED
        return [ Widget ];
    }

    init() {
        this._defineSchema();
        this._defineConverters();

        this.editor.commands.add( 'insertNoteBlock', new InsertNoteBlockCommand( this.editor ) );
    }

    _defineSchema() {
        const schema = this.editor.model.schema;

        // Define the "noteBlock" schema.
        schema.register( 'noteBlock', {
            // Behaves like a self-contained block object (e.g. a block image)
            // allowed in places where other blocks are allowed (e.g. directly in the root).
            inheritAllFrom: '$blockObject'
        } );

        // Define the "noteBlockParagraph" schema.
        schema.register( 'noteBlockParagraph', {
            // Behaves like a self-contained block object (e.g. a block image)
            // allowed in places where other blocks are allowed (e.g. directly in the root).
            inheritAllFrom: '$block'
        } );

        // Define the "noteBlock title" schema.
        schema.register( 'noteBlockLabel', {
            allowIn: 'noteBlock',
            isLimit: true,
            allowContentOf: '$block',
            allowChildren: '$text',
        } );

        // Define the "noteBlock description" schema.
        schema.register( 'noteBlockContent', {
            allowIn: 'noteBlock',
            allowContentOf: '$block',
            allowChildren: '$text',
        } );
    }

    _defineConverters() {
        const conversion = this.editor.conversion;

        // <noteBlock> converters
        conversion.elementToElement( {
            model: 'noteBlock',
            view: {
                name: 'div',
                classes: 'border-left--vui-yellow border-width-2 pl-3',
            }
        } );

        // <noteBlockParagraph> converters.
        conversion.elementToElement( {
            model: 'noteBlockParagraph',
            view: {
                name: 'p',
                classes: 'small'
            }
        } );

        // <noteBlockLabel> converters
        conversion.elementToElement( {
            model: 'noteBlockLabel',
            view: {
                name: 'span',
            }
        } );

        // <noteBlockContent> converters
        conversion.for( 'upcast' ).elementToElement( {
            model: 'noteBlockContent',
            view: {
                name: 'div',
                classes: 'note-block-description'
            }
        } );
    }
}