import { Plugin } from '@ckeditor/ckeditor5-core';
import {ButtonView, clickOutsideHandler, ContextualBalloon} from '@ckeditor/ckeditor5-ui';
import FormView from './abbreviationview';
import '../styles.css';

export default class AbbreviationUI extends Plugin {

    static get requires() {
        return [ ContextualBalloon ];
    }

    init() {
        const editor = this.editor;

        // Create the balloon (modal form) and the form view.
        this._balloon = this.editor.plugins.get( ContextualBalloon );
        this.formView = this._createFormView();

        // Init a toolbar button.
        editor.ui.componentFactory.add( 'abbreviation', () => {

            // The button and its basic properties.
            const button = new ButtonView();
            button.label = 'Abbr';
            button.tooltip = 'Abbreviation';
            button.withText = true;

            // Show the UI on button click.
            this.listenTo( button, 'execute', () => {
                this._showUI();
            } );

            return button;
        } );
    }

    _createFormView() {
        const editor = this.editor;
        const formView = new FormView( editor.locale );

        this.listenTo( formView, 'submit', () => {

            // Setting texts: title and abbreviation.
            const title = formView.titleInputView.fieldView.element.value;
            const abbr = formView.abbrInputView.fieldView.element.value;

            editor.model.change( writer => {
                editor.model.insertContent(
                    writer.createText( abbr, { abbreviation: title } )
                );
            } );

            // Hide the form view after submit.
            this._hideUI();

        } );

        // Hide the form view after clicking the "Cancel" button.
        this.listenTo( formView, 'cancel', () => {
            this._hideUI();
        } );

        // Hide the form view when clicking outside the balloon.
        clickOutsideHandler( {
            emitter: formView,
            activator: () => this._balloon.visibleView === formView,
            contextElements: [ this._balloon.view.element ],
            callback: () => this._hideUI()
        } );

        return formView;
    }

    _getBalloonPositionData() {
        const view = this.editor.editing.view;
        const viewDocument = view.document;
        let target = null;

        // Set a target position by converting view selection range to DOM.
        target = () => view.domConverter.viewRangeToDom(
            viewDocument.selection.getFirstRange()
        );

        return {
            target
        };
    }

    _showUI() {
        this._balloon.add( {
            view: this.formView,
            position: this._getBalloonPositionData()
        } );

        this.formView.focus();
    }

    _hideUI() {
        this.formView.abbrInputView.fieldView.value = '';
        this.formView.titleInputView.fieldView.value = '';
        this.formView.element.reset();

        this._balloon.remove( this.formView );

        // Focus the editing view after closing the form view.
        this.editor.editing.view.focus();
    }
}