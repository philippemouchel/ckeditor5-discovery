import ReminderBlockEditing from './reminderBlockEditing';
import ReminderBlockUI from './reminderBlockUI';
import { Plugin } from '@ckeditor/ckeditor5-core';

export default class ReminderBlock extends Plugin {
    static get requires() {
        return [ ReminderBlockEditing, ReminderBlockUI ];
    }
}