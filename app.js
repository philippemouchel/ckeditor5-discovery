import CKEditorInspector from '@ckeditor/ckeditor5-inspector';

import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic';
import { Bold, Underline, Strikethrough, Italic } from '@ckeditor/ckeditor5-basic-styles';
import { Essentials } from '@ckeditor/ckeditor5-essentials';
import { Heading } from '@ckeditor/ckeditor5-heading';
import { Paragraph } from '@ckeditor/ckeditor5-paragraph';
import { List } from '@ckeditor/ckeditor5-list';
import { SourceEditing } from '@ckeditor/ckeditor5-source-editing';

import { Plugin } from '@ckeditor/ckeditor5-core';
import { ButtonView } from '@ckeditor/ckeditor5-ui';

import Abbreviation from './abbreviation/abbreviation';

class Timestamp extends Plugin {
    init() {
        const editor = this.editor;
        // The button must be registered among the UI components of the editor
        // to be displayed in the toolbar.
        editor.ui.componentFactory.add( 'timestamp', () => {
            // The button will be an instance of ButtonView.
            const button = new ButtonView();
            button.set( {
                label: 'Ts',
                withText: true
            } );

            // Execute a callback function when the button is clicked.
            button.on( 'execute', () => {
                const now = new Date();

                // Change the model using the model writer.
                editor.model.change( writer => {

                    // Insert the text at the user's current position.
                    editor.model.insertContent( writer.createText( now.toString() ) );
                } );
            } );

            return button;
        } );
    }
}

ClassicEditor
    .create( document.querySelector( '#editor' ), {
        plugins: [
            Essentials, Heading, Paragraph, List, SourceEditing,
            Bold, Underline, Strikethrough, Italic,
            Timestamp, Abbreviation,
        ],
        toolbar: [
            'sourceEditing', '|',
            'bold', 'underline', 'strikethrough', 'italic', 'abbreviation', '|',
            'heading', '|',
            'bulletedList', 'numberedList', '|',
            'timestamp', '|',

        ],
        heading: {
            options: [
                { model: 'heading2', view: 'h2', title: 'Heading 2' },
                { model: 'heading3', view: 'h3', title: 'Heading 3' },
                { model: 'heading4', view: 'h4', title: 'Heading 4' },
                { model: 'paragraph', title: 'Paragraph' },
            ]
        }
    } )
    .then( editor => {
        CKEditorInspector.attach( editor );
        console.log( 'Editor was initialized, with CKEditorInspector', editor );
    } )
    .catch( error => {
        console.error( error.stack );
    } );
