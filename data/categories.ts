export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
}

export const categories: Category[] = [
  {
    "id": "cat_video_intercom",
    "name": "Video Intercom",
    "slug": "video-intercom",
    "image": "https://res.cloudinary.com/dywfpe9dw/image/upload/v1778494703/hikvision_uae/categories/mtc610enhqri9taiiptc.webp"
  },
  {
    "id": "cat_led_displays",
    "name": "LED Displays",
    "slug": "led-displays",
    "image": "https://res.cloudinary.com/dywfpe9dw/image/upload/v1778494704/hikvision_uae/categories/tnqer5itg2m8daeg8yvu.jpg"
  },
  {
    "id": "cat_turbo_hd_products",
    "name": "Turbo-HD Products",
    "slug": "turbo-hd-products",
    "image": "https://res.cloudinary.com/dywfpe9dw/image/upload/v1778494701/hikvision_uae/categories/fjjbfs8jq0sjqe4hcxkn.jpg"
  },
  {
    "id": "cat_network_products",
    "name": "Network Products",
    "slug": "network-products",
    "image": "https://res.cloudinary.com/dywfpe9dw/image/upload/v1778494698/hikvision_uae/categories/pu7sqfzvvhqd2wnoowhr.png"
  }
];
