import React from "react";
import Link from "next/link";
import { Locale } from "@/lib/data";
import { TilingWindow } from "@/components/ui/TilingWindow";
import { Calendar, Clock, ArrowUpRight } from "lucide-react";
import POSTS from "@/../data/posts.json";

export default function WritingPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = (params.locale === "en" ? "en" : "id") as Locale;

  return (
    <div className="space-y-4">
      <div className="pb-2 border-b border-border">
        <h2 className="font-heading text-2xl font-bold text-text">
          {locale === "id" ? "Catatan Teknis & Riset" : "Technical Notes & Research"}
        </h2>
        <p className="font-mono text-xs text-text-muted mt-0.5">
          {`// WORKSPACE 六: ${POSTS.length} ENTRIES INDEXED`}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {POSTS.map((post) => {
          const postTitle = typeof post.title === "string" ? post.title : post.title[locale];
          const postDate = typeof post.date === "string" ? post.date : post.date[locale];
          const postReadTime = typeof post.readTime === "string" ? post.readTime : post.readTime[locale];
          const postSummary = typeof post.summary === "string" ? post.summary : post.summary[locale];

          return (
            <Link
              key={post.slug}
              href={`/${locale}/post/${post.slug}`}
              className="group block"
            >
              <TilingWindow
                title={post.slug.toUpperCase()}
                badge={`${locale.toUpperCase()} // ${postReadTime}`}
                className="flex flex-col justify-between h-full group-hover:border-accent/40 transition-colors"
              >
                <div className="space-y-3">
                  <h3 className="font-heading text-base font-bold text-text group-hover:text-accent transition-colors flex items-start justify-between gap-2">
                    <span>{postTitle}</span>
                    <ArrowUpRight className="w-4 h-4 text-text-muted group-hover:text-accent shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </h3>

                  <div className="flex items-center gap-3 font-mono text-[11px] text-text-muted">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-accent" />
                      {postDate}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3 h-3 text-sage" />
                      {postReadTime}
                    </span>
                  </div>

                  <p className="text-xs text-text-muted leading-relaxed line-clamp-3">
                    {postSummary}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-border/60">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 bg-base border border-border text-text-muted font-mono text-[10px] rounded-sharp"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </TilingWindow>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
