import footer from "./data/footer.data";
import automation from "./data/automation.data";
import navigation from "./data/navigation.data";

export default function getFooterContent(pathname: string) {
  const automationPage = pathname.includes("ai-business-automation") || pathname === "/ai-automation";
  const contactPage = pathname === "/contact";
  return {
    ...footer,
    links: navigation,
    ...(automationPage ? automation.footer : {}),
    ...(contactPage ? footer.contact : {}),
    showAction: !contactPage,
    voiceAgent: automationPage,
  };
}
