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
import SimpleBox from './simplebox/simplebox';
import NoteBlock from './noteblock/noteblock';
import WarningBlock from './warningblock/warningblock';

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
                tooltip: 'Timestamp (current date)',
                withText: true,
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

// Instantiate editor container and button.
let editorContainer = document.getElementById('editor');
let editorBuilderButton = document.getElementById('build-editor');
let editorDestroyerButton = document.getElementById('destroy-editor');

// Init editor on page load.
buildEditor();

// Attach functions to buttons click event.
editorBuilderButton.onclick = function() { buildEditor() };
editorDestroyerButton.onclick = function() { destroyEditor() };

/**
 * Build the CKEditor in the editor container.
 */
function buildEditor() {
    ClassicEditor
        .create( editorContainer, {
            plugins: [
                Essentials, Heading, Paragraph, List, SourceEditing,
                Bold, Underline, Strikethrough, Italic,
                Timestamp, Abbreviation, SimpleBox,
                NoteBlock, WarningBlock,
            ],
            toolbar: [
                'sourceEditing', '|', 'heading', '|',
                'bold', 'underline', 'strikethrough', 'italic', '|',
                'bulletedList', 'numberedList', '|',
                'abbreviation', 'timestamp', '|', 'simpleBox', '|',
                'noteBlock', 'warningBlock', '|',
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
            window.editor = editor;
            editorBuilderButton.disabled = true;
            editorDestroyerButton.disabled = false;
        } )
        .catch( error => {
            console.error( error.stack );
        } );
}

/**
 * Replace the CKEditor with its data, in the editor container.
 */
function destroyEditor() {
    let editorData = editor.getData();
    editor
        .destroy()
        .then(r => {
            editorBuilderButton.disabled = false;
            editorDestroyerButton.disabled = true;
        } )
        .catch( error => {
            console.error( error.stack );
        } );
    editorContainer.innerHTML = editorData;
}