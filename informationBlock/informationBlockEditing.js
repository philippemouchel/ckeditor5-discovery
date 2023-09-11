import { Plugin } from '@ckeditor/ckeditor5-core';
import { Widget, toWidget, toWidgetEditable } from '@ckeditor/ckeditor5-widget';

import InsertInformationBlockCommand from './insertInformationBlockCommand';

export default class InformationBlockEditing extends Plugin {
    static get requires() {                                                    // ADDED
        return [ Widget ];
    }

    init() {
        this._defineSchema();
        this._defineConverters();

        this.editor.commands.add( 'insertInformationBlock', new InsertInformationBlockCommand( this.editor ) );
    }

    _defineSchema() {
        const schema = this.editor.model.schema;

        // Define the "informationBlock" schema.
        schema.register( 'informationBlockSection', {
            inheritAllFrom: '$blockObject'
        } );

        // Define the "informationBlock icon container" schema.
        schema.register( 'informationBlockIconContainer', {
            allowIn: 'informationBlockSection',
            allowContentOf: '$block',
            isSelectable: false,
        } );

        // Define the "informationBlock icon svg" schema.
        schema.register( 'informationBlockSvg', {
            allowIn: 'informationBlockIconContainer',
            allowContentOf: '$block',
            isSelectable: false,
        } );

        // Define the "informationBlock icon G1" schema.
        schema.register( 'informationBlockSvgG1', {
            allowIn: 'informationBlockSvg',
            // allowContentOf: '$block',
            isSelectable: false,
        } );

        // Define the "informationBlock icon G1 path" schema.
        schema.register( 'informationBlockSvgG1Path', {
            allowIn: 'informationBlockSvgG1',
            isSelectable: false,
        } );

        // Define the "informationBlock icon circle" schema.
        schema.register( 'informationBlockSvgCircle', {
            allowIn: 'informationBlockSvg',
            isSelectable: false,
        } );

        // Define the "informationBlock icon G2" schema.
        schema.register( 'informationBlockSvgG2', {
            allowIn: 'informationBlockSvg',
            // allowContentOf: '$block',
            isSelectable: false,
        } );

        // Define the "informationBlock icon G2 path" schema.
        schema.register( 'informationBlockSvgG2Path', {
            allowIn: 'informationBlockSvgG2',
            isSelectable: false,
        } );

        // Define the "informationBlock body container" schema.
        schema.register( 'informationBlockBodyContainer', {
            allowIn: 'informationBlockSection',
            allowContentOf: '$block',
        } );

        // Define the "informationBlock body paragraph" schema.
        schema.register( 'informationBlockBodyParagraph', {
            // isLimit: true,
            allowIn: 'informationBlockBodyContainer',
            allowContentOf: '$block',
        } );
    }

    _defineConverters() {
        const conversion = this.editor.conversion;

        // <informationBlockSection> converters
        conversion.for( 'upcast' ).elementToElement( {
            model: 'informationBlockSection',
            view: {
                name: 'section',
                classes: ['information-item', 'mb-3', 'p-4', 'd-flex', 'align-items-center'],
            }
        } );
        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'informationBlockSection',
            view: {
                name: 'section',
                classes: ['information-item', 'mb-3', 'p-4', 'd-flex', 'align-items-center'],
            }
        } );
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'informationBlockSection',
            view: ( modelElement, { writer: viewWriter } ) => {
                const section = viewWriter.createContainerElement( 'section', { class: 'information-item mb-3 p-4 d-flex align-items-center' } );
                return toWidget( section, viewWriter, { label: 'Information block widget' } );
            }
        } );

        // <informationBlockIconContainer> converters
        conversion.for( 'upcast' ).elementToElement( {
            model: 'informationBlockIconContainer',
            view: {
                name: 'div',
                classes: ['flex-start']
            }
        } );
        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'informationBlockIconContainer',
            view: {
                name: 'div',
                classes: ['flex-start']
            }
        } );
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'informationBlockIconContainer',
            view: ( modelElement, { writer: viewWriter } ) => {
                const div = viewWriter.createContainerElement( 'div', { class: 'flex-start' } );
                return toWidget( div, viewWriter );
            }
        } );

        // <informationBlockSvg> converters
        conversion.for( 'upcast' ).elementToElement( {
            model: 'informationBlockSvg',
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
            model: 'informationBlockSvg',
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
            model: 'informationBlockSvg',
            view: ( modelElement, { writer: viewWriter } ) => {
                const svg = viewWriter.createContainerElement( 'svg', {
                    class: 'svg-fill--primary svg-size--2 mr-2',
                    viewBox: '0 0 20.1 20.1',
                    xmlns: 'http://www.w3.org/2000/svg',
                } );
                return toWidget( svg, viewWriter );
            }
        } );

        // <informationBlockSvgG1> converters
        conversion.elementToElement( {
            model: 'informationBlockSvgG1',
            view: {
                name: 'g',
                classes: ['svg-g1'],
            }
        } );

        // <informationBlockSvgG1Path> converters
        conversion.elementToElement( {
            model: 'informationBlockSvgG1Path',
            view: {
                name: 'path',
                classes: ['svg-g1-path'],
                attributes: {
                    d: 'M9.3 6.7c0-.4.3-.7.8-.7.4 0 .7.3.7.7 0 .4-.3.7-.7.7-.5.1-.8-.2-.8-.7zm.3 2.1h1v5.3h-1V8.8z',
                    fill: '_svg-fill',
                }
            }
        } );

        // <informationBlockSvgCircle> converters
        conversion.elementToElement( {
            model: 'informationBlockSvgCircle',
            view: {
                name: 'circle',
                classes: ['svg-circle'],
                attributes: {
                    cx: '10.1',
                    cy: '10.1',
                    fill: '_svg-fill',
                    r: '10.1',
                }
            }
        } );

        // <informationBlockSvgG2> converters
        conversion.elementToElement( {
            model: 'informationBlockSvgG2',
            view: {
                name: 'g',
                classes: ['svg-g2'],
                attributes: {
                    fill: '#1d1d1d',
                }
            }
        } );

        // <informationBlockSvgG2Path> converters
        conversion.elementToElement( {
            model: 'informationBlockSvgG2Path',
            view: {
                name: 'path',
                classes: ['svg-g2-path'],
                attributes: {
                    d: 'M9.3 6.7c0-.4.3-.7.8-.7.4 0 .7.3.7.7 0 .4-.3.7-.7.7-.5.1-.8-.2-.8-.7zm.3 2.1h1v5.3h-1V8.8z',
                }
            }
        } );

        // <informationBlockBodyContainer> converters
        conversion.for( 'upcast' ).elementToElement( {
            model: 'informationBlockBodyContainer',
            view: {
                name: 'div',
                classes: ['information-body']
            }
        } );
        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'informationBlockBodyContainer',
            view: {
                name: 'div',
                classes: ['information-body']
            }
        } );
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'informationBlockBodyContainer',
            view: ( modelElement, { writer: viewWriter } ) => {
                const div = viewWriter.createContainerElement( 'div', { class: 'information-body' } );
                return toWidget( div, viewWriter );
            }
        } );

        // <informationBlockBodyParagraph> converters
        conversion.for( 'upcast' ).elementToElement( {
            model: 'informationBlockBodyParagraph',
            view: {
                name: 'p',
                classes: ['m-0']
            }
        } );
        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'informationBlockBodyParagraph',
            view: {
                name: 'p',
                classes: ['m-0']
            }
        } );
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'informationBlockBodyParagraph',
            view: ( modelElement, { writer: viewWriter } ) => {
                const p = viewWriter.createEditableElement( 'p', { class: 'm-0' } );
                return toWidgetEditable( p, viewWriter );
            }
        } );
    }
}