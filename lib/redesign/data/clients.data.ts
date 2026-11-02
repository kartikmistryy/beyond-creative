// Clients from our published case studies, with the logos their project pages already use.
type Client = { name: string; logo: string };

const clients: { title: readonly [string, string]; items: Client[] } = {
  title: ["Brands we build with,", "and the ones on their way."],
  items: [
    { name: "Moti Mahal", logo: "/images/paper/61QHQKNZ8RNDB3K55768TV00VE.webp" },
    { name: "IndianCare", logo: "/images/paper/7CWMK4ZE1108NK8VCEAY0AJJNK.webp" },
    { name: "Beta Panels", logo: "/images/paper/20HFX8AX4FZTMMHWY2NQE3ESJH.webp" },
  ],
};

export default clients;
