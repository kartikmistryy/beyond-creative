import Link from "next/link";
import type home from "@/lib/redesign/data/home.data";
import type previews from "@/lib/redesign/data/projectPreviews.data";
import Eyebrow from "./Eyebrow";
import HomeWorkCard from "./HomeWorkCard";

type Props = { content: typeof home.work; projects: readonly (typeof previews)[number][] };

export default function SelectedWork({ content, projects }: Props) {
  const [first, second, third] = projects;
  return (
    <section aria-labelledby="home-work-title" className="flex flex-col gap-6 bg-black px-7 pb-30 font-body font-normal text-white">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="flex flex-col gap-3">
          <Eyebrow index="02">{content.label}</Eyebrow>
          <h2 id="home-work-title" className="font-display text-home-work text-studio-orange uppercase">
            {content.title}
          </h2>
        </div>
        <Link
          data-motion-hover="action"
          href="/projects"
          className="group inline-flex min-h-11 items-center gap-7 self-start rounded-full border border-studio-orange px-6.25 py-3.25 text-sm leading-4.5 uppercase transition-colors hover:bg-studio-orange hover:text-black focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white md:self-auto"
        >
          {content.action}
          <span aria-hidden="true" data-motion-arrow="right" className="text-lg leading-5.5 text-studio-orange group-hover:text-black">
            ⟶
          </span>
        </Link>
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        <HomeWorkCard project={first} view={content.view} className="md:col-span-2" />
        <HomeWorkCard project={second} view={content.view} />
        <div className="flex flex-col justify-between gap-6 py-1 md:h-105 md:pr-4.5">
          <span aria-hidden="true" className="text-xl leading-5 text-studio-orange">
            +
          </span>
          <p className="text-lg leading-6.5">{content.description}</p>
        </div>
        <HomeWorkCard project={third} view={content.view} className="md:col-span-2" />
      </div>
    </section>
  );
}
