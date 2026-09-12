import { video_intercom_products } from './categories/video-intercom';
import { led_displays_products } from './categories/led-displays';
import { turbo_hd_products_products } from './categories/turbo-hd-products';
import { network_products_products } from './categories/network-products';

export interface ProductSpecification {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  _id?: string;
  name: string;
  slug: string;
  subTitle?: string;
  categorySlug: string;
  categoryId?: string;
  categoryName?: string;
  subCategorySlug: string;
  subCategoryId?: string;
  subCategoryName?: string;
  images: string[];
  rating: number;
  isFeatured: boolean;
  description: string;
  features: string[];
  keyFeatures: string[];
  specifications: any;
  overview?: string;
  model?: string;
  stockStatus?: string;
  price?: number;
  datasheetUrl?: string;
}

export const products: Product[] = [
  ...(video_intercom_products as unknown as Product[]),
  ...(led_displays_products as unknown as Product[]),
  ...(turbo_hd_products_products as unknown as Product[]),
  ...(network_products_products as unknown as Product[]),
];

export {
  video_intercom_products,
  led_displays_products,
  turbo_hd_products_products,
  network_products_products,
};

export default products;
