export interface Step {
  label: string;
  hasBack?: () => boolean;
  hasNext?: () => boolean;
  isVisible?: () => boolean;
}
