import { Plugin } from '@ckeditor/ckeditor5-core';
import { ButtonView, clickOutsideHandler, ContextualBalloon } from '@ckeditor/ckeditor5-ui';

import FormView from './abbreviationview';
import '../styles.css';
import getRangeText from './utils.js';

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

        // Close the panel on "ESC" key press when the form has focus.
        formView.keystrokes.set( 'Esc', ( data, cancel ) => {
            this._hideUI();
            cancel();
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
        const selection = this.editor.model.document.selection;

        this._balloon.add( {
            view: this.formView,
            position: this._getBalloonPositionData()
        } );

        // Disable the input when the selection is not collapsed.
        this.formView.abbrInputView.isEnabled = selection.getFirstRange().isCollapsed;

        const selectedText = getRangeText( selection.getFirstRange() );
        this.formView.abbrInputView.fieldView.value = selectedText;
        this.formView.titleInputView.fieldView.value = '';

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