import { video_intercom_subcategories } from './categories/video-intercom';
import { led_displays_subcategories } from './categories/led-displays';
import { turbo_hd_products_subcategories } from './categories/turbo-hd-products';
import { network_products_subcategories } from './categories/network-products';

export interface SubCategory {
  id: string;
  name: string;
  slug: string;
  categorySlug: string;
  categoryId: string;
  image: string;
}

export const subCategories: SubCategory[] = [
  ...video_intercom_subcategories,
  ...led_displays_subcategories,
  ...turbo_hd_products_subcategories,
  ...network_products_subcategories,
];

export {
  video_intercom_subcategories,
  led_displays_subcategories,
  turbo_hd_products_subcategories,
  network_products_subcategories,
};

export default subCategories;
