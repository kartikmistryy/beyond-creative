import home from "./data/home.data";
import services from "./data/services.data";
import projects from "./data/projectPreviews.data";

export default function loadHomePage() {
  return { content: home, projects, services: [...services.slice(1), services[0]] };
}
