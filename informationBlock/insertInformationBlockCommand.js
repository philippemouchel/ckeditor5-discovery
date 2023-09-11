import { Command } from '@ckeditor/ckeditor5-core';

export default class InsertInformationBlockCommand extends Command {
    execute() {
        this.editor.model.change( writer => {
            // Insert <informationBlock>*</informationBlock> at the current selection position
            // in a way that will result in creating a valid model structure.
            this.editor.model.insertObject( createInformationBlock( writer ) );
        } );
    }

    refresh() {
        const model = this.editor.model;
        const selection = model.document.selection;
        const allowedIn = model.schema.findAllowedParent( selection.getFirstPosition(), 'informationBlockSection' );

        this.isEnabled = allowedIn !== null;
    }
}

function createInformationBlock( writer ) {
    const informationBlock = writer.createElement( 'informationBlockSection' );

    // Build information icon.
    const informationBlockIconContainer = writer.createElement( 'informationBlockIconContainer' );
    const informationBlockSvg = writer.createElement( 'informationBlockSvg' );
    const informationBlockSvgG1 = writer.createElement( 'informationBlockSvgG1' );
    const informationBlockSvgG1Path = writer.createElement( 'informationBlockSvgG1Path' );
    const informationBlockSvgCircle = writer.createElement( 'informationBlockSvgCircle' );
    const informationBlockSvgG2 = writer.createElement( 'informationBlockSvgG2' );
    const informationBlockSvgG2Path = writer.createElement( 'informationBlockSvgG2Path' );
    writer.append( informationBlockIconContainer, informationBlock );
    writer.append( informationBlockSvg, informationBlockIconContainer );
    writer.append( informationBlockSvgG1, informationBlockSvg );
    writer.append( informationBlockSvgG1Path, informationBlockSvgG1 );
    writer.append( informationBlockSvgCircle, informationBlockSvg );
    writer.append( informationBlockSvgG2, informationBlockSvg );
    writer.append( informationBlockSvgG2Path, informationBlockSvgG2 );

    // Build body and 1 paragraph.
    const informationBlockBodyContainer = writer.createElement( 'informationBlockBodyContainer' );
    const informationBlockBodyParagraph = writer.createElement( 'informationBlockBodyParagraph' );

    writer.append( informationBlockBodyContainer, informationBlock );
    writer.append( informationBlockBodyParagraph, informationBlockBodyContainer );
    writer.insertText( 'Information block content, to be replaced.', informationBlockBodyParagraph );

    return informationBlock;
}