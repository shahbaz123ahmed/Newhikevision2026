import { video_intercom_category } from './categories/video-intercom';
import { led_displays_category } from './categories/led-displays';
import { turbo_hd_products_category } from './categories/turbo-hd-products';
import { network_products_category } from './categories/network-products';

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
}

export const categories: Category[] = [
  video_intercom_category,
  led_displays_category,
  turbo_hd_products_category,
  network_products_category,
];

export {
  video_intercom_category,
  led_displays_category,
  turbo_hd_products_category,
  network_products_category,
};

export default categories;
