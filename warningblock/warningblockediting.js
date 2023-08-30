import { Plugin } from '@ckeditor/ckeditor5-core';
import { Widget, toWidget, toWidgetEditable } from '@ckeditor/ckeditor5-widget';

import InsertWarningBlockCommand from './insertwarningblockcommand';

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
            inheritAllFrom: '$blockObject'
        } );

        // Define the "warningBlock icon container" schema.
        schema.register( 'warningBlockIconContainer', {
            allowIn: 'warningBlockSection',
            allowContentOf: '$block',
            isSelectable: false,
        } );

        // Define the "warningBlock icon svg" schema.
        schema.register( 'warningBlockSvg', {
            allowIn: 'warningBlockIconContainer',
            allowContentOf: '$block',
            isSelectable: false,
        } );

        // Define the "warningBlock icon G1" schema.
        schema.register( 'warningBlockSvgG1', {
            allowIn: 'warningBlockSvg',
            allowContentOf: '$block',
            isSelectable: false,
        } );

        // Define the "warningBlock icon G1 path" schema.
        schema.register( 'warningBlockSvgG1Path', {
            allowIn: 'warningBlockG1',
            isSelectable: false,
        } );

        // Define the "warningBlock icon circle" schema.
        schema.register( 'warningBlockSvgCircle', {
            allowIn: 'warningBlockSvg',
            isSelectable: false,
        } );

        // Define the "warningBlock icon G2" schema.
        schema.register( 'warningBlockSvgG2', {
            allowIn: 'warningBlockSvg',
            allowContentOf: '$block',
            isSelectable: false,
        } );

        // Define the "warningBlock icon G2 path" schema.
        schema.register( 'warningBlockSvgG2Path', {
            allowIn: 'warningBlockG2',
            isSelectable: false,
        } );

        // Define the "warningBlock body container" schema.
        schema.register( 'warningBlockBodyContainer', {
            allowIn: 'warningBlockSection',
            allowContentOf: '$block',
        } );

        // Define the "warningBlock body paragraph" schema.
        schema.register( 'warningBlockBodyParagraph', {
            // isLimit: true,
            allowIn: 'warningBlockBodyContainer',
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
                classes: ['information-item', 'mb-3', 'p-4', 'd-flex', 'align-items-center'],
            }
        } );
        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'warningBlockSection',
            view: {
                name: 'section',
                classes: ['information-item', 'mb-3', 'p-4', 'd-flex', 'align-items-center'],
            }
        } );
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'warningBlockSection',
            view: ( modelElement, { writer: viewWriter } ) => {
                const section = viewWriter.createContainerElement( 'section', { class: 'information-item mb-3 p-4 d-flex align-items-center' } );
                return toWidget( section, viewWriter, { label: 'Warning block widget' } );
            }
        } );

        // <warningBlockIconContainer> converters
        conversion.for( 'upcast' ).elementToElement( {
            model: 'warningBlockIconContainer',
            view: {
                name: 'div',
                classes: ['flex-start']
            }
        } );
        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'warningBlockIconContainer',
            view: {
                name: 'div',
                classes: ['flex-start']
            }
        } );
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'warningBlockIconContainer',
            view: ( modelElement, { writer: viewWriter } ) => {
                const div = viewWriter.createContainerElement( 'div', { class: 'flex-start' } );
                return toWidget( div, viewWriter );
            }
        } );

        // <warningBlockSvg> converters
        conversion.for( 'upcast' ).elementToElement( {
            model: 'warningBlockSvg',
            view: {
                name: 'svg',
                classes: ['svg-fill--primary', 'svg-size--2', 'mr-2'],
                attributes: {
                    viewBox: '0 0 20.1 20.1',
                    xmlns: 'http://www.w3.org/2000/svg',
                },
            }
        } );
        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'warningBlockSvg',
            view: {
                name: 'svg',
                classes: ['svg-fill--primary', 'svg-size--2', 'mr-2'],
                attributes: {
                    viewBox: '0 0 20.1 20.1',
                    xmlns: 'http://www.w3.org/2000/svg',
                },
            }
        } );
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'warningBlockSvg',
            view: ( modelElement, { writer: viewWriter } ) => {
                const svg = viewWriter.createContainerElement( 'svg', {
                    class: 'svg-fill--primary svg-size--2 mr-2',
                    viewBox: '0 0 20.1 20.1',
                    xmlns: 'http://www.w3.org/2000/svg',
                } );
                return toWidget( svg, viewWriter );
            }
        } );

        // <warningBlockSvgG1> converters
        conversion.elementToElement( {
            model: 'warningBlockSvgG1',
            view: {
                name: 'g',
            }
        } );

        // <warningBlockSvgG1Path> converters
        conversion.elementToElement( {
            model: 'warningBlockSvgG1Path',
            view: {
                name: 'path',
                attributes: {
                    d: 'M9.3 6.7c0-.4.3-.7.8-.7.4 0 .7.3.7.7 0 .4-.3.7-.7.7-.5.1-.8-.2-.8-.7zm.3 2.1h1v5.3h-1V8.8z',
                    fill: '_svg-fill',
                }
            }
        } );

        // <warningBlockSvgCircle> converters
        conversion.elementToElement( {
            model: 'warningBlockSvgCircle',
            view: {
                name: 'circle',
                attributes: {
                    cx: '10.1',
                    cy: '10.1',
                    fill: '_svg-fill',
                    r: '10.1',
                }
            }
        } );

        // <warningBlockSvgG2> converters
        conversion.elementToElement( {
            model: 'warningBlockSvgG2',
            view: {
                name: 'g',
                attributes: {
                    fill: '#1d1d1d',
                }
            }
        } );

        // <warningBlockSvgG2Path> converters
        conversion.elementToElement( {
            model: 'warningBlockSvgG2Path',
            view: {
                name: 'path',
                attributes: {
                    d: 'M9.3 6.7c0-.4.3-.7.8-.7.4 0 .7.3.7.7 0 .4-.3.7-.7.7-.5.1-.8-.2-.8-.7zm.3 2.1h1v5.3h-1V8.8z',
                }
            }
        } );

        // <warningBlockBodyContainer> converters
        conversion.for( 'upcast' ).elementToElement( {
            model: 'warningBlockBodyContainer',
            view: {
                name: 'div',
                classes: ['information-body']
            }
        } );
        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'warningBlockBodyContainer',
            view: {
                name: 'div',
                classes: ['information-body']
            }
        } );
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'warningBlockBodyContainer',
            view: ( modelElement, { writer: viewWriter } ) => {
                const div = viewWriter.createContainerElement( 'div', { class: 'information-body' } );
                return toWidget( div, viewWriter );
            }
        } );

        // <warningBlockBodyParagraph> converters
        conversion.for( 'upcast' ).elementToElement( {
            model: 'warningBlockBodyParagraph',
            view: {
                name: 'p',
                classes: ['m-0']
            }
        } );
        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'warningBlockBodyParagraph',
            view: {
                name: 'p',
                classes: ['m-0']
            }
        } );
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'warningBlockBodyParagraph',
            view: ( modelElement, { writer: viewWriter } ) => {
                const p = viewWriter.createEditableElement( 'p', { class: 'm-0' } );
                return toWidgetEditable( p, viewWriter );
            }
        } );
    }
}