export const turbo_hd_camera_series = [
  {
    id: "sub_turbo_hd_cameras_with_colorvu",
    name: "Turbo HD Cameras with ColorVu",
    slug: "turbo-hd-cameras-with-colorvu",
    parentSlug: "turbo-hd-cameras",
    categorySlug: "turbo-hd-products",
    categoryId: "cat_turbo_hd_products",
    image: "https://res.cloudinary.com/dywfpe9dw/image/upload/v1778494708/hikvision_uae/subcategories/ewudrvezhkqw7i682bqm.webp"
  },
  {
    id: "sub_turbo_hd_value_series",
    name: "Turbo HD Value Series",
    slug: "turbo-hd-value-series",
    parentSlug: "turbo-hd-cameras",
    categorySlug: "turbo-hd-products",
    categoryId: "cat_turbo_hd_products",
    image: "https://res.cloudinary.com/dywfpe9dw/image/upload/v1778494708/hikvision_uae/subcategories/ewudrvezhkqw7i682bqm.webp"
  }
];

export const main_turbo_hd_subcategories = [
  {
    id: "sub_turbo_hd_cameras",
    name: "Turbo HD Cameras",
    slug: "turbo-hd-cameras",
    categorySlug: "turbo-hd-products",
    categoryId: "cat_turbo_hd_products",
    image: "https://res.cloudinary.com/dywfpe9dw/image/upload/v1778494708/hikvision_uae/subcategories/ewudrvezhkqw7i682bqm.webp",
    children: turbo_hd_camera_series
  }
];

export const turbo_hd_products_subcategories = [
  ...main_turbo_hd_subcategories,
  ...turbo_hd_camera_series
];

export default turbo_hd_products_subcategories;
