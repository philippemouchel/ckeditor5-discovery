import { Plugin } from '@ckeditor/ckeditor5-core';
import { Widget, toWidget, toWidgetEditable } from '@ckeditor/ckeditor5-widget';

import InsertNoteBlockCommand from './insertNoteBlockCommand';

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
        schema.register( 'noteBlockSection', {
            // Behaves like a self-contained block object (e.g. a block image)
            // allowed in places where other blocks are allowed (e.g. directly in the root).
            inheritAllFrom: '$blockObject'
        } );

        // Define the "noteBlock paragraph" schema.
        schema.register( 'noteBlockParagraph', {
            // isLimit: true,
            allowIn: 'noteBlockSection',
            allowContentOf: '$block',
        } );
    }

    _defineConverters() {
        const conversion = this.editor.conversion;

        // <noteBlockSection> converters
        conversion.for( 'upcast' ).elementToElement( {
            model: 'noteBlockSection',
            view: {
                name: 'section',
                classes: ['note-block', 'border-left--vui-yellow', 'border-width-2', 'pl-3'],
            }
        } );
        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'noteBlockSection',
            view: {
                name: 'section',
                classes: ['note-block', 'border-left--vui-yellow', 'border-width-2', 'pl-3'],
            }
        } );
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'noteBlockSection',
            view: ( modelElement, { writer: viewWriter } ) => {
                const section = viewWriter.createContainerElement( 'section', { class: 'note-block border-left--vui-yellow border-width-2 pl-3' } );
                return toWidget( section, viewWriter, { label: 'Note block widget' } );
            }
        } );

        // <noteBlockParagraph> converters
        conversion.for( 'upcast' ).elementToElement( {
            model: 'noteBlockParagraph',
            view: {
                name: 'p',
                classes: ['note-block-paragraph', 'small']
            }
        } );
        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'noteBlockParagraph',
            view: {
                name: 'p',
                classes: ['note-block-paragraph', 'small']
            }
        } );
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'noteBlockParagraph',
            view: ( modelElement, { writer: viewWriter } ) => {
                const p = viewWriter.createEditableElement( 'p', { class: 'note-block-paragraph small' } );
                return toWidgetEditable( p, viewWriter );
            }
        } );
    }
}