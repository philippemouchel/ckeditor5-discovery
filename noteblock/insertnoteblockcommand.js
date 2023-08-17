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
        const allowedIn = model.schema.findAllowedParent( selection.getFirstPosition(), 'noteBlock' );

        this.isEnabled = allowedIn !== null;
    }
}

function createNoteBlock( writer ) {
    const noteBlock = writer.createElement( 'noteBlock' );
    const noteBlockParagraph = writer.createElement( 'noteBlockParagraph' );
    const noteBlockLabel = writer.createElement( 'noteBlockLabel' );
    const noteBlockContent = writer.createElement( 'noteBlockContent' );

    writer.append( noteBlockParagraph, noteBlock );
    writer.append( noteBlockLabel, noteBlockParagraph );
    writer.append( noteBlockContent, noteBlockParagraph );

    return noteBlock;
}