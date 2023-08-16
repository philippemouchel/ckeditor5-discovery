import { Command } from '@ckeditor/ckeditor5-core';
import { findAttributeRange } from '@ckeditor/ckeditor5-typing';
import { toMap } from '@ckeditor/ckeditor5-utils';

import getRangeText from "./utils";

export default class AbbreviationCommand extends Command {

    refresh() {
        const model = this.editor.model;
        const selection = model.document.selection;
        const firstRange = selection.getFirstRange();

        // When the selection is collapsed, the command has a value
        // if the caret is in an abbreviation.
        if ( firstRange.isCollapsed ) {
            if ( selection.hasAttribute( 'abbreviation' ) ) {
                const attributeValue = selection.getAttribute( 'abbreviation' );

                // Find the entire range containing the abbreviation
                // under the caret position.
                const abbreviationRange = findAttributeRange(
                    selection.getFirstPosition(), 'abbreviation', attributeValue, model
                );

                this.value = {
                    abbr: getRangeText( abbreviationRange ),
                    title: attributeValue,
                    range: abbreviationRange
                };
            } else {
                this.value = null;
            }
        }

        // When the selection is not collapsed, the command has a value if the selection
        // contains a subset of a single abbreviation or an entire abbreviation.
        else {
            if ( selection.hasAttribute( 'abbreviation' ) ) {
                const attributeValue = selection.getAttribute( 'abbreviation' );

                // Find the entire range containing the abbreviation
                // under the caret position.
                const abbreviationRange = findAttributeRange(
                    selection.getFirstPosition(), 'abbreviation', attributeValue, model
                );

                if ( abbreviationRange.containsRange( firstRange, true ) ) {
                    this.value = {
                        abbr: getRangeText( firstRange ),
                        title: attributeValue,
                        range: firstRange
                    };
                } else {
                    this.value = null;
                }
            } else {
                this.value = null;
            }
        }

        // The command is enabled when the "abbreviation" attribute
        // can be set on the current model selection.
        this.isEnabled = model.schema.checkAttributeInSelection(
            selection, 'abbreviation'
        );
    }

    execute( { title, abbr } ) {
        const model = this.editor.model;
        const selection = model.document.selection;

        model.change( writer => {

            // If selection is collapsed then update the selected abbreviation
            // or insert a new one at the place of caret.
            if ( selection.isCollapsed ) {

                // When a collapsed selection is inside text with the "abbreviation" attribute,
                // update its text and title.
                if ( this.value ) {
                    const { end: positionAfter } = model.insertContent(
                        writer.createText( abbr, { abbreviation: title } ),
                        this.value.range
                    );

                    // Put the selection at the end of the inserted abbreviation.
                    writer.setSelection( positionAfter );
                }

                // If the collapsed selection is not in an existing abbreviation,
                // insert a text node with the "abbreviation" attribute
                // in place of the caret.
                // If the abbreviation is empty, don't do anything.
                else if ( abbr !== '' ) {
                    const firstPosition = selection.getFirstPosition();

                    // Collect all attributes of the user selection.
                    const attributes = toMap( selection.getAttributes() );

                    // Put the new attribute to the map of attributes.
                    attributes.set( 'abbreviation', title );

                    // Inject the new text node with the abbreviation text
                    // with all selection attributes.
                    const { end: positionAfter } = model.insertContent(
                        writer.createText( abbr, attributes ), firstPosition
                    );

                    // Put the selection at the end of the inserted abbreviation.
                    writer.setSelection( positionAfter );
                }

                writer.removeSelectionAttribute( 'abbreviation' );
            }

            // If the selection has non-collapsed ranges,
            // change the attribute on nodes inside those ranges
            // omitting nodes where the "abbreviation" attribute is disallowed.
            else {
                const ranges = model.schema.getValidRanges(
                    selection.getRanges(), 'abbreviation'
                );

                for ( const range of ranges ) {
                    writer.setAttribute( 'abbreviation', title, range );
                }
            }
        } );

    }
}
