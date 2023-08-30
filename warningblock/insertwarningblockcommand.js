import { Command } from '@ckeditor/ckeditor5-core';

export default class InsertWarningBlockCommand extends Command {
    execute() {
        this.editor.model.change( writer => {
            // Insert <warningBlock>*</warningBlock> at the current selection position
            // in a way that will result in creating a valid model structure.
            this.editor.model.insertObject( createWarningBlock( writer ) );
        } );
    }

    refresh() {
        const model = this.editor.model;
        const selection = model.document.selection;
        const allowedIn = model.schema.findAllowedParent( selection.getFirstPosition(), 'warningBlockSection' );

        this.isEnabled = allowedIn !== null;
    }
}

function createWarningBlock( writer ) {
    const warningBlock = writer.createElement( 'warningBlockSection' );

    // Build warning icon.
    const warningBlockIconContainer = writer.createElement( 'warningBlockIconContainer' );
    const warningBlockSvg = writer.createElement( 'warningBlockSvg' );
    writer.append( warningBlockIconContainer, warningBlock );
    writer.append( warningBlockSvg, warningBlockIconContainer );

    // Build body and 1 paragraph.
    const warningBlockBodyContainer = writer.createElement( 'warningBlockBodyContainer' );
    const warningBlockBodyParagraph = writer.createElement( 'warningBlockBodyParagraph' );

    writer.append( warningBlockBodyContainer, warningBlock );
    writer.append( warningBlockBodyParagraph, warningBlockBodyContainer );
    writer.insertText( 'Warning block content, to be replaced.', warningBlockBodyParagraph );

    return warningBlock;
}