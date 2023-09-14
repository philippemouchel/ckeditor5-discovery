import { Plugin } from '@ckeditor/ckeditor5-core';
import { Widget, toWidget, toWidgetEditable } from '@ckeditor/ckeditor5-widget';

import InsertReminderBlockCommand from './insertReminderBlockCommand';

export default class ReminderBlockEditing extends Plugin {
    static get requires() {                                                    // ADDED
        return [ Widget ];
    }

    init() {
        this._defineSchema();
        this._defineConverters();

        this.editor.commands.add( 'insertReminderBlock', new InsertReminderBlockCommand( this.editor ) );
    }

    _defineSchema() {
        const schema = this.editor.model.schema;

        // Define the "reminderBlock" schema.
        schema.register( 'reminderBlockSection', {
            // Behaves like a self-contained block object (e.g. a block image)
            // allowed in places where other blocks are allowed (e.g. directly in the root).
            inheritAllFrom: '$blockObject'
        } );

        // Define the "reminderBlock paragraph" schema.
        schema.register( 'reminderBlockParagraph', {
            // isLimit: true,
            allowIn: 'reminderBlockSection',
            allowContentOf: '$block',
        } );

        // Define the "reminderBlock list" schema.
        schema.register( 'reminderBlockList', {
            // isLimit: true,
            allowIn: 'reminderBlockSection',
        } );

        // Define the "reminderBlock list item" schema.
        schema.register( 'reminderBlockListItem', {
            // isLimit: true,
            allowIn: 'reminderBlockList',
            allowContentOf: '$block',
        } );
    }

    _defineConverters() {
        const conversion = this.editor.conversion;

        // <reminderBlockSection> converters
        conversion.for( 'upcast' ).elementToElement( {
            model: 'reminderBlockSection',
            view: {
                name: 'section',
                classes: ['reminder-item', 'small'],
            }
        } );
        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'reminderBlockSection',
            view: {
                name: 'section',
                classes: ['reminder-item', 'small'],
            }
        } );
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'reminderBlockSection',
            view: ( modelElement, { writer: viewWriter } ) => {
                const section = viewWriter.createContainerElement( 'section', { class: 'reminder-item small' } );
                return toWidget( section, viewWriter, { label: 'Reminder block widget' } );
            }
        } );

        // <reminderBlockParagraph> converters
        conversion.for( 'upcast' ).elementToElement( {
            model: 'reminderBlockParagraph',
            view: {
                name: 'p',
                classes: ['font-weight-medium', 'mb-2']
            }
        } );
        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'reminderBlockParagraph',
            view: {
                name: 'p',
                classes: ['font-weight-medium', 'mb-2']
            }
        } );
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'reminderBlockParagraph',
            view: ( modelElement, { writer: viewWriter } ) => {
                const p = viewWriter.createEditableElement( 'p', { class: 'font-weight-medium mb-2' } );
                return toWidgetEditable( p, viewWriter );
            }
        } );

        // <reminderBlockList> converters
        // conversion.elementToElement( {
        //     model: 'reminderBlockList',
        //     view: {
        //         name: 'ul',
        //         classes: ['reminder-list', 'ml-2'],
        //     }
        // } );
        conversion.for( 'upcast' ).elementToElement( {
            model: 'reminderBlockList',
            view: {
                name: 'ul',
                classes: ['reminder-list', 'ml-2'],
            }
        } );
        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'reminderBlockList',
            view: {
                name: 'ul',
                classes: ['reminder-list', 'ml-2'],
            }
        } );
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'reminderBlockList',
            view: ( modelElement, { writer: viewWriter } ) => {
                const ul = viewWriter.createEditableElement( 'ul', { class: 'reminder-list ml-2' } );
                return toWidgetEditable( ul, viewWriter );
            }
        } );

        // <reminderBlockListItem> converters
        conversion.for( 'upcast' ).elementToElement( {
            model: 'reminderBlockListItem',
            view: {
                name: 'li',
                classes: ['reminder-list-item'],
            }
        } );
        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'reminderBlockListItem',
            view: {
                name: 'li',
                classes: ['reminder-list-item'],
            }
        } );
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'reminderBlockListItem',
            view: ( modelElement, { writer: viewWriter } ) => {
                const li = viewWriter.createEditableElement( 'li', { class: 'reminder-list-item' } );
                return toWidgetEditable( li, viewWriter );
            }
        } );
    }
}