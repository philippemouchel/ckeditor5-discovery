import { View, LabeledFieldView, createLabeledInputText, ButtonView, submitHandler } from '@ckeditor/ckeditor5-ui';
import { icons } from '@ckeditor/ckeditor5-core';

/**
 * Define a form with:
 * - two inputs, for abbr content and title
 * - two buttons, to submit form and cancel.
 */
export default class FormView extends View {
    constructor( locale ) {
        super( locale );

        this.abbrInputView = this._createInput( 'Add abbreviation' );
        this.titleInputView = this._createInput( 'Add title' );

        // Create the "Submit" button.
        this.saveButtonView = this._createButton(
            'Save', icons.check, 'ck-button-save'
        );
        // Set its type to 'submit', to trigger the submit event
        // on entire form when clicked.
        this.saveButtonView.type = 'submit';

        // Create the "Cancel" button.
        this.cancelButtonView = this._createButton(
            'Cancel', icons.cancel, 'ck-button-cancel'
        );
        // Delegate ButtonView#execute to FormView#cancel,
        // to cancel form submission on button click.
        this.cancelButtonView.delegate( 'execute' ).to( this, 'cancel' );

        // Place all those form elements in a view.
        this.childViews = this.createCollection( [
            this.abbrInputView,
            this.titleInputView,
            this.saveButtonView,
            this.cancelButtonView
        ] );

        // Define a <form> template and place the view inside.
        this.setTemplate( {
            tag: 'form',
            attributes: {
                class: [ 'ck', 'ck-abbr-form' ],
                tabindex: '-1'
            },
            children: this.childViews
        } );
    }

    render() {
        super.render();

        // Submit the form when the user clicked the save button
        // or pressed "Enter" in the input.
        submitHandler( {
            view: this
        } );
    }

    focus() {
        this.childViews.first.focus();
    }

    _createInput( label ) {
        const labeledInput = new LabeledFieldView( this.locale, createLabeledInputText );

        labeledInput.label = label;

        return labeledInput;
    }

    _createButton( label, icon, className ) {
        const button = new ButtonView();

        button.set( {
            label,
            icon,
            tooltip: true,
            class: className
        } );

        return button;
    }
}
