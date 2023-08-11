import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic';
import { Bold, Underline, Strikethrough, Italic } from '@ckeditor/ckeditor5-basic-styles';
import { Essentials } from '@ckeditor/ckeditor5-essentials';
import { Heading } from '@ckeditor/ckeditor5-heading';
import { Paragraph } from '@ckeditor/ckeditor5-paragraph';
import { List } from '@ckeditor/ckeditor5-list';
import { SourceEditing } from '@ckeditor/ckeditor5-source-editing';

ClassicEditor
    .create( document.querySelector( '#editor' ), {
        plugins: [
            Essentials, Heading, Paragraph, List, SourceEditing,
            Bold, Underline, Strikethrough, Italic,
        ],
        toolbar: [
            'bold', 'underline', 'strikethrough', 'italic', '|',
            'heading', '|', 'bulletedList', 'numberedList', '|', 'sourceEditing',
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
        console.log( 'Editor was initialized', editor );
    } )
    .catch( error => {
        console.error( error.stack );
    } );
