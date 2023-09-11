import { Plugin } from '@ckeditor/ckeditor5-core';
import { Widget, toWidget, toWidgetEditable } from '@ckeditor/ckeditor5-widget';

import InsertWarningBlockCommand from './insertWarningBlockCommand';

export default class WarningBlockEditing extends Plugin {
    static get requires() {                                                    // ADDED
        return [ Widget ];
    }

    init() {
        this._defineSchema();
        this._defineConverters();

        this.editor.commands.add( 'insertWarningBlock', new InsertWarningBlockCommand( this.editor ) );
    }

    _defineSchema() {
        const schema = this.editor.model.schema;

        // Define the "warningBlock" schema.
        schema.register( 'warningBlockSection', {
            // Behaves like a self-contained block object (e.g. a block image)
            // allowed in places where other blocks are allowed (e.g. directly in the root).
            inheritAllFrom: '$blockObject'
        } );

        // Define the "warningBlock paragraph" schema.
        schema.register( 'warningBlockParagraph', {
            // isLimit: true,
            allowIn: 'warningBlockSection',
            allowContentOf: '$block',
        } );
    }

    _defineConverters() {
        const conversion = this.editor.conversion;

        // <warningBlockSection> converters
        conversion.for( 'upcast' ).elementToElement( {
            model: 'warningBlockSection',
            view: {
                name: 'section',
                classes: ['warning-item'],
            }
        } );
        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'warningBlockSection',
            view: {
                name: 'section',
                classes: ['warning-item'],
            }
        } );
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'warningBlockSection',
            view: ( modelElement, { writer: viewWriter } ) => {
                const section = viewWriter.createContainerElement( 'section', { class: 'warning-item' } );
                return toWidget( section, viewWriter, { label: 'Warning block widget' } );
            }
        } );

        // <warningBlockParagraph> converters
        conversion.for( 'upcast' ).elementToElement( {
            model: 'warningBlockParagraph',
            view: {
                name: 'p',
                classes: ['alert-danger', 'color--dark', 'p-2', 'pl-3', 'pr-3'],
            }
        } );
        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'warningBlockParagraph',
            view: {
                name: 'p',
                classes: ['alert-danger', 'color--dark', 'p-2', 'pl-3', 'pr-3'],
            }
        } );
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'warningBlockParagraph',
            view: ( modelElement, { writer: viewWriter } ) => {
                const p = viewWriter.createEditableElement( 'p', { class: 'alert-danger color--dark p-2 pl-3 pr-3' } );
                return toWidgetEditable( p, viewWriter );
            }
        } );
    }
}