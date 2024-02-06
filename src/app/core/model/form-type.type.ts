import {FormControl} from '@angular/forms';

/**
 * Form type that transforms all the keys in the given type to form controls of the same subtypes.
 *
 * @export
 * @typedef {FormType}
 * @template T
 */
export type FormType<T> = {[K in keyof T]: FormControl<T[K]>};
