import services from "./data/services.data";

export default function serviceArtwork(service: (typeof services)[number]) {
  switch (service.slug) {
    case "ai-business-automation":
      return "/images/services/glass-color-hover.png";
    case "branding-design":
      return "/images/services/telephone-color-hover.png";
    case "social-media-management":
      return "/images/services/social-media-color-hover.png";
    case "content-production":
      return "/images/services/pear-color-hover.png";
    default:
      return service.homeImage;
  }
}
