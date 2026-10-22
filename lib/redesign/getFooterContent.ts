import footer from "./data/footer.data";
import automation from "./data/automation.data";
import navigation from "./data/navigation.data";

export default function getFooterContent(pathname: string) {
  const automationPage = pathname.includes("ai-business-automation") || pathname === "/ai-automation";
  return {
    ...footer,
    links: [navigation[1], navigation[0], ...navigation.slice(2)],
    ...(automationPage ? automation.footer : {}),
    compact: pathname === "/contact",
    voiceAgent: automationPage,
  };
}
