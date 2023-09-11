import { Command } from '@ckeditor/ckeditor5-core';

export default class InsertNoteBlockCommand extends Command {
    execute() {
        this.editor.model.change( writer => {
            // Insert <noteBlock>*</noteBlock> at the current selection position
            // in a way that will result in creating a valid model structure.
            this.editor.model.insertObject( createNoteBlock( writer ) );
        } );
    }

    refresh() {
        const model = this.editor.model;
        const selection = model.document.selection;
        const allowedIn = model.schema.findAllowedParent( selection.getFirstPosition(), 'noteBlockSection' );

        this.isEnabled = allowedIn !== null;
    }
}

function createNoteBlock( writer ) {
    const noteBlock = writer.createElement( 'noteBlockSection' );
    const noteBlockParagraph = writer.createElement( 'noteBlockParagraph' );

    // Build the note block.
    writer.append( noteBlockParagraph, noteBlock );

    // Fill it with default values.
    writer.appendText('Note: note content, to be replaced.', noteBlockParagraph)

    return noteBlock;
}