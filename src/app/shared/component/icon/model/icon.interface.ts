import {IconSize} from '~cn/core/model/icons.const';

/**
 * Icon.
 *
 * @export
 * @interface Icon
 * @typedef {Icon}
 */
export interface Icon {
  name: string;
  size?: IconSize | number;
}
