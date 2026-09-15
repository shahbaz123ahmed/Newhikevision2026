export const ip_video_intercom_series = [
  {
    id: "sub_video_intercom_pro_series",
    name: "Video Intercom Pro Series",
    slug: "video-intercom-pro-series",
    parentSlug: "ip-video-intercom-systems",
    categorySlug: "video-intercom",
    categoryId: "cat_video_intercom",
    image: "https://res.cloudinary.com/dywfpe9dw/image/upload/v1778494711/hikvision_uae/subcategories/pra3sx2turjajygv8k0h.webp"
  }
];

export const two_wire_series = [
  {
    id: "sub_2_wire_pro_series",
    name: "2-Wire Pro Series",
    slug: "2-wire-pro-series",
    parentSlug: "2-wire-series",
    categorySlug: "video-intercom",
    categoryId: "cat_video_intercom",
    image: "https://res.cloudinary.com/dywfpe9dw/image/upload/v1778494711/hikvision_uae/subcategories/pra3sx2turjajygv8k0h.webp"
  }
];

export const main_video_intercom_subcategories = [
  {
    id: "sub_ip_video_intercom_systems",
    name: "IP Video Intercom Systems",
    slug: "ip-video-intercom-systems",
    categorySlug: "video-intercom",
    categoryId: "cat_video_intercom",
    image: "https://res.cloudinary.com/dywfpe9dw/image/upload/v1778494711/hikvision_uae/subcategories/pra3sx2turjajygv8k0h.webp",
    children: ip_video_intercom_series
  },
  {
    id: "sub_2_wire_series",
    name: "2-Wire Series",
    slug: "2-wire-series",
    categorySlug: "video-intercom",
    categoryId: "cat_video_intercom",
    image: "https://res.cloudinary.com/dywfpe9dw/image/upload/v1778494711/hikvision_uae/subcategories/pra3sx2turjajygv8k0h.webp",
    children: two_wire_series
  }
];

export const video_intercom_subcategories = [
  ...main_video_intercom_subcategories,
  ...ip_video_intercom_series,
  ...two_wire_series
];

export default video_intercom_subcategories;
