import { Command } from '@ckeditor/ckeditor5-core';

export default class InsertReminderBlockCommand extends Command {
    execute() {
        this.editor.model.change( writer => {
            // Insert <reminderBlock>*</reminderBlock> at the current selection position
            // in a way that will result in creating a valid model structure.
            this.editor.model.insertObject( createReminderBlock( writer ) );
        } );
    }

    refresh() {
        const model = this.editor.model;
        const selection = model.document.selection;
        const allowedIn = model.schema.findAllowedParent( selection.getFirstPosition(), 'reminderBlockSection' );

        this.isEnabled = allowedIn !== null;
    }
}

function createReminderBlock( writer ) {
    const reminderBlock = writer.createElement( 'reminderBlockSection' );
    const reminderBlockParagraph = writer.createElement( 'reminderBlockParagraph' );
    const reminderBlockList = writer.createElement( 'reminderBlockList' );
    const reminderBlockListItem = writer.createElement( 'reminderBlockListItem' );

    // Build the reminder block.
    writer.append( reminderBlockParagraph, reminderBlock );
    writer.append( reminderBlockList, reminderBlock );
    writer.append( reminderBlockListItem, reminderBlockList );

    // Fill it with default values.
    writer.appendText('Keep in mind:', reminderBlockParagraph);
    writer.appendText('List item', reminderBlockListItem);

    return reminderBlock;
}