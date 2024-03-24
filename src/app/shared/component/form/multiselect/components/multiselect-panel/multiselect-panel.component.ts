import {ConnectedPosition, Overlay, OverlayConfig, OverlayRef} from '@angular/cdk/overlay';
import {CdkPortal, PortalModule} from '@angular/cdk/portal';
import {ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, OnDestroy, Output, ViewChild} from '@angular/core';

/**
 * Crystal Nest multiSelect panel component.
 *
 * @export
 * @class MultiSelectPanelComponent
 * @typedef {MultiSelectPanelComponent}
 * @implements {OnDestroy}
 */
@Component({
  selector: 'cn-multiselect-panel',
  standalone: true,
  imports: [PortalModule],
  templateUrl: './multiselect-panel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultiSelectPanelComponent implements OnDestroy {
  /**
   * Multiselect field parent element.
   *
   * @public
   * @type {!HTMLElement}
   */
  @Input()
  public field!: HTMLElement;

  /**
   * Emits the `panel toggle` event.
   *
   * @public
   * @readonly
   * @type {EventEmitter<boolean>}
   */
  @Output()
  public readonly panelToggle: EventEmitter<boolean> = new EventEmitter();

  /**
   * Emits the `panel click` event.
   *
   * @public
   * @readonly
   * @type {EventEmitter<MouseEvent>}
   */
  @Output()
  public readonly panelClick: EventEmitter<MouseEvent> = new EventEmitter();

  /**
   * `CdkPortal` child element.
   *
   * @public
   * @type {?CdkPortal}
   */
  @ViewChild(CdkPortal)
  public content?: CdkPortal;

  /**
   * Overlay reference.
   *
   * @protected
   * @type {?OverlayRef}
   */
  private overlayRef?: OverlayRef;

  /**
   * Positions for the overlay configuration.
   *
   * @private
   * @readonly
   * @type {ConnectedPosition[]}
   */
  private readonly positions: ConnectedPosition[] = [
    {
      originX: 'start',
      originY: 'bottom',
      overlayX: 'start',
      overlayY: 'top'
    },
    {
      originX: 'start',
      originY: 'top',
      overlayX: 'start',
      overlayY: 'bottom'
    }
  ];

  /**
   * Overlay configuration.
   *
   * @private
   * @readonly
   * @type {OverlayConfig}
   */
  private get overlayConfig(): OverlayConfig {
    return new OverlayConfig({
      positionStrategy: this.overlay.position().flexibleConnectedTo(this.field).withPush(false).withPositions(this.positions),
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      hasBackdrop: false
    });
  }

  /**
   * @constructor
   * @public
   * @param {Overlay} overlay
   */
  public constructor(protected readonly overlay: Overlay) {}

  /**
   * Handles the `document:click` event.
   *
   * @public
   * @param {MouseEvent} event
   */
  @HostListener('document:click', ['$event'])
  public onDocumentClick(event: MouseEvent) {
    if (this.overlayRef && !this.overlayRef.overlayElement.contains(event.target as Node)) {
      this.panelClick.emit(event);
    } else {
      this.panelClick.emit();
    }
  }

  /**
   * Syncs the width of the panel with the width of the field element.
   *
   * @private
   */
  @HostListener('window:resize')
  public syncPanelWidth() {
    if (this.overlayRef) {
      this.overlayRef.updateSize({width: this.field.getBoundingClientRect().width});
    }
  }

  /**
   * @inheritdoc
   */
  public ngOnDestroy() {
    this.closePanel();
  }

  /**
   * Opens the overlay panel.
   *
   * @public
   */
  public openPanel() {
    this.overlayRef = this.overlay.create(this.overlayConfig);
    this.overlayRef.attach(this.content);
    this.panelToggle.emit(true);
    this.syncPanelWidth();
  }

  /**
   * Closes the overlay panel.
   *
   * @public
   */
  public closePanel() {
    if (this.overlayRef) {
      this.overlayRef.detach();
      this.overlayRef = undefined;
    }
    this.panelToggle.emit(false);
  }
}
