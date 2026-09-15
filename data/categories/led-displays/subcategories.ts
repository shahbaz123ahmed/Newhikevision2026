export const indoor_led_series = [
  {
    id: "sub_indoor_flex_series",
    name: "Indoor Flex Series",
    slug: "indoor-flex-series",
    parentSlug: "indoor-led-displays",
    categorySlug: "led-displays",
    categoryId: "cat_led_displays",
    image: "https://res.cloudinary.com/dywfpe9dw/image/upload/v1778494704/hikvision_uae/categories/tnqer5itg2m8daeg8yvu.jpg"
  },
  {
    id: "sub_indoor_solid_plus_series",
    name: "Indoor Solid Plus Series",
    slug: "indoor-solid-plus-series",
    parentSlug: "indoor-led-displays",
    categorySlug: "led-displays",
    categoryId: "cat_led_displays",
    image: "https://res.cloudinary.com/dywfpe9dw/image/upload/v1778494704/hikvision_uae/categories/tnqer5itg2m8daeg8yvu.jpg"
  },
  {
    id: "sub_indoor_solid_series",
    name: "Indoor Solid Series",
    slug: "indoor-solid-series",
    parentSlug: "indoor-led-displays",
    categorySlug: "led-displays",
    categoryId: "cat_led_displays",
    image: "https://res.cloudinary.com/dywfpe9dw/image/upload/v1778494704/hikvision_uae/categories/tnqer5itg2m8daeg8yvu.jpg"
  },
  {
    id: "sub_indoor_ultra_series",
    name: "Indoor Ultra Series",
    slug: "indoor-ultra-series",
    parentSlug: "indoor-led-displays",
    categorySlug: "led-displays",
    categoryId: "cat_led_displays",
    image: "https://res.cloudinary.com/dywfpe9dw/image/upload/v1778494704/hikvision_uae/categories/tnqer5itg2m8daeg8yvu.jpg"
  },
  {
    id: "sub_indoor_value_series",
    name: "Indoor Value Series",
    slug: "indoor-value-series",
    parentSlug: "indoor-led-displays",
    categorySlug: "led-displays",
    categoryId: "cat_led_displays",
    image: "https://res.cloudinary.com/dywfpe9dw/image/upload/v1778494704/hikvision_uae/categories/tnqer5itg2m8daeg8yvu.jpg"
  }
];

export const outdoor_led_series = [
  {
    id: "sub_lumifit_series",
    name: "LumiFit Series",
    slug: "lumifit-series",
    parentSlug: "outdoor-led-displays",
    categorySlug: "led-displays",
    categoryId: "cat_led_displays",
    image: "https://res.cloudinary.com/dywfpe9dw/image/upload/v1778494704/hikvision_uae/categories/tnqer5itg2m8daeg8yvu.jpg"
  },
  {
    id: "sub_lumisquare_series",
    name: "LumiSquare Series",
    slug: "lumisquare-series",
    parentSlug: "outdoor-led-displays",
    categorySlug: "led-displays",
    categoryId: "cat_led_displays",
    image: "https://res.cloudinary.com/dywfpe9dw/image/upload/v1778494704/hikvision_uae/categories/tnqer5itg2m8daeg8yvu.jpg"
  },
  {
    id: "sub_lumiultra_series",
    name: "LumiUltra Series",
    slug: "lumiultra-series",
    parentSlug: "outdoor-led-displays",
    categorySlug: "led-displays",
    categoryId: "cat_led_displays",
    image: "https://res.cloudinary.com/dywfpe9dw/image/upload/v1778494704/hikvision_uae/categories/tnqer5itg2m8daeg8yvu.jpg"
  }
];

export const indoor_standard_series = [
  {
    id: "sub_led_all_in_one_display",
    name: "LED All-in-one Display",
    slug: "led-all-in-one-display",
    parentSlug: "indoor-standard-displays",
    categorySlug: "led-displays",
    categoryId: "cat_led_displays",
    image: "https://res.cloudinary.com/dywfpe9dw/image/upload/v1778494704/hikvision_uae/categories/tnqer5itg2m8daeg8yvu.jpg"
  },
  {
    id: "sub_led_poster_display",
    name: "LED Poster Display",
    slug: "led-poster-display",
    parentSlug: "indoor-standard-displays",
    categorySlug: "led-displays",
    categoryId: "cat_led_displays",
    image: "https://res.cloudinary.com/dywfpe9dw/image/upload/v1778494704/hikvision_uae/categories/tnqer5itg2m8daeg8yvu.jpg"
  }
];

export const main_led_displays_subcategories = [
  {
    id: "sub_indoor_led_displays",
    name: "Indoor LED Displays",
    slug: "indoor-led-displays",
    categorySlug: "led-displays",
    categoryId: "cat_led_displays",
    image: "https://res.cloudinary.com/dywfpe9dw/image/upload/v1778494704/hikvision_uae/categories/tnqer5itg2m8daeg8yvu.jpg",
    children: indoor_led_series
  },
  {
    id: "sub_outdoor_led_displays",
    name: "Outdoor LED Displays",
    slug: "outdoor-led-displays",
    categorySlug: "led-displays",
    categoryId: "cat_led_displays",
    image: "https://res.cloudinary.com/dywfpe9dw/image/upload/v1778494704/hikvision_uae/categories/tnqer5itg2m8daeg8yvu.jpg",
    children: outdoor_led_series
  },
  {
    id: "sub_indoor_standard_displays",
    name: "Indoor Standard Displays",
    slug: "indoor-standard-displays",
    categorySlug: "led-displays",
    categoryId: "cat_led_displays",
    image: "https://res.cloudinary.com/dywfpe9dw/image/upload/v1778494704/hikvision_uae/categories/tnqer5itg2m8daeg8yvu.jpg",
    children: indoor_standard_series
  }
];

export const led_displays_subcategories = [
  ...main_led_displays_subcategories,
  ...indoor_led_series,
  ...outdoor_led_series,
  ...indoor_standard_series
];

export default led_displays_subcategories;
