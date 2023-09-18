import { Command, Plugin } from '@ckeditor/ckeditor5-core';

class PhilBlockCommand extends Command {
    execute( message ) {

        editor.model.change( writer => {
            const insertPosition = editor.model.document.selection.getFirstPosition();

            const content =
                '<p>A paragraph with <a href="https://ckeditor.com">some link</a>.</p>';
            const viewFragment = editor.data.processor.toView( content );
            const modelFragment = editor.data.toModel( viewFragment );

            editor.model.insertContent( modelFragment, insertPosition );
        } );

    }
}

export default class PhilBlock extends Plugin {
    init() {
        const editor = this.editor;
        console.log( 'Phil' );
        editor.commands.add( 'philCommand', new PhilBlockCommand( editor ) );
    }
}