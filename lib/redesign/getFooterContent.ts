import footer from "./data/footer.data";
import automation from "./data/automation.data";
import navigation from "./data/navigation.data";

export default function getFooterContent(pathname: string) {
  return {
    ...footer,
    links: [navigation[1], navigation[0], ...navigation.slice(2)],
    ...(pathname.includes("ai-business-automation") || pathname === "/ai-automation"
      ? automation.footer
      : {}),
    compact: pathname === "/contact",
  };
}
