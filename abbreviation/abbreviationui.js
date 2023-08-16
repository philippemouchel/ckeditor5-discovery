import { Plugin } from '@ckeditor/ckeditor5-core';
import { ButtonView } from "@ckeditor/ckeditor5-ui";

export default class AbbreviationUI extends Plugin {
    init() {
        const editor = this.editor;

        // Init a toolbar button.
        editor.ui.componentFactory.add( 'abbreviation', () => {

            // The button and its basic properties.
            const button = new ButtonView();
            button.label = 'Abbr';
            button.tooltip = 'Abbreviation';
            button.withText = true;

            // The button callback.
            this.listenTo( button, 'execute', () => {
                const selection = editor.model.document.selection;
                const title = 'What You See Is What You Get';
                const abbr = 'WYSIWYG';

                // Change the model to insert the abbreviation.
                editor.model.change( writer => {
                    editor.model.insertContent(
                        // Create a text node with the abbreviation attribute.
                        writer.createText( abbr, { abbreviation: title } )
                    );
                } );
            } );

            return button;
        } );
    }
}