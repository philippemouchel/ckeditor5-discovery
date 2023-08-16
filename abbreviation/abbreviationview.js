import { View, LabeledFieldView, createLabeledInputText, ButtonView, submitHandler, FocusCycler } from '@ckeditor/ckeditor5-ui';
import { FocusTracker, KeystrokeHandler } from '@ckeditor/ckeditor5-utils';
import { icons } from '@ckeditor/ckeditor5-core';

/**
 * Define a form with:
 * - two inputs, for abbr content and title
 * - two buttons, to submit form and cancel.
 */
export default class FormView extends View {
    constructor( locale ) {
        super( locale );

        // Accessibility improvement: tracking focus and keystroke.
        this.focusTracker = new FocusTracker();
        this.keystrokes = new KeystrokeHandler();

        // Create the two form fields.
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

        // Add "tab" navigation to the view items.
        this._focusCycler = new FocusCycler( {
            focusables: this.childViews,
            focusTracker: this.focusTracker,
            keystrokeHandler: this.keystrokes,
            actions: {
                // Navigate form fields backwards using the Shift + Tab keystroke.
                focusPrevious: 'shift + tab',

                // Navigate form fields forwards using the Tab key.
                focusNext: 'tab'
            }
        } );

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

    destroy() {
        super.destroy();

        this.focusTracker.destroy();
        this.keystrokes.destroy();
    }

    render() {
        super.render();

        // Submit the form when the user clicked the save button
        // or pressed "Enter" in the input.
        submitHandler( {
            view: this
        } );

        // Register the view items in the focus tracker.
        this.childViews._items.forEach( view => {
            this.focusTracker.add( view.element );
        } );

        // Start listening for the keystrokes coming from #element.
        this.keystrokes.listenTo( this.element );
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
