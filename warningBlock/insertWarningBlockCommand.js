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
    const warningBlockParagraph = writer.createElement( 'warningBlockParagraph' );

    // Build the warning block.
    writer.append( warningBlockParagraph, warningBlock );

    // Fill it with default values.
    writer.appendText('Warning: warning content, to be replaced.', warningBlockParagraph)

    return warningBlock;
}