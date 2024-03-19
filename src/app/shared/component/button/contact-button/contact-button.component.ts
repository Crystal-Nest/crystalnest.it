import {Component, Input} from '@angular/core';

/**
 * Contact button component.
 *
 * @export
 * @class ContactButtonComponent
 * @typedef {ContactButtonComponent}
 */
@Component({
  selector: 'cn-contact-button',
  standalone: true,
  imports: [],
  templateUrl: './contact-button.component.html',
  styleUrl: './contact-button.component.scss'
})
export class ContactButtonComponent {
  @Input({required: true})
  public link!: string;

  @Input({required: true})
  public img!: string;

  @Input()
  public text?: string;
}
