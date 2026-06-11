import { Container } from "@/components/primitives/Container";
import { Grain } from "@/components/primitives/Grain";
import { InstantScrollTop } from "@/components/legal/InstantScrollTop";
import { Card } from "@/components/ui/card";
import type { LegalPageContent } from "@/lib/content/legal";

export function LegalContentPage({ page }: { page: LegalPageContent }) {
  return (
    <main id="main" className="relative overflow-hidden bg-black">
      <InstantScrollTop />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(70% 38% at 50% 0%, rgba(201,160,61,0.18) 0%, rgba(201,160,61,0.05) 42%, rgba(0,0,0,0) 74%)",
        }}
      />
      <Grain />

      <section className="relative pb-10 pt-28 sm:pb-12 sm:pt-32 lg:pt-36">
        <Container size="narrow">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-card/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-foreground/85 backdrop-blur-md">
              <span className="block h-1.5 w-1.5 rounded-full bg-primary" />
              Legal
            </span>
            <h1 className="mt-6 text-h1 font-medium text-foreground">
              {page.title}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-foreground/72 sm:text-lg sm:leading-8">
              {page.description}
            </p>
            <p className="mt-5 text-sm font-medium text-primary">
              Last updated: {page.lastUpdated}
            </p>
          </div>
        </Container>
      </section>

      <section className="relative pb-16 sm:pb-20 lg:pb-28">
        <Container size="narrow">
          <Card className="border-primary/16 bg-black/70 p-5 shadow-[0_30px_100px_-80px_rgba(212,168,83,0.95)] sm:p-8 lg:p-10">
            <article className="space-y-10">
              <p className="border-l-2 border-primary/55 pl-4 text-sm leading-7 text-foreground/78 sm:text-base sm:leading-8">
                {page.introduction}
              </p>

              {page.sections.map((section) => (
                <section
                  key={section.title}
                  aria-labelledby={section.id}
                  className="scroll-mt-28"
                >
                  <h2
                    id={section.id}
                    className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl"
                  >
                    {section.title}
                  </h2>
                  <div className="mt-4 space-y-4 text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
                    {section.blocks.map((block, index) => {
                      if (block.type === "list") {
                        return (
                          <ul
                            key={index}
                            className="space-y-2 pl-0"
                          >
                            {block.items.map((item) => (
                              <li key={item} className="flex gap-3">
                                <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/80" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        );
                      }

                      if (block.type === "contact") {
                        return (
                          <div
                            key={index}
                            className="rounded-xl border border-primary/14 bg-primary/5 p-4"
                          >
                            {block.items.map((item) => (
                              <p key={item.label}>
                                <span className="font-semibold text-foreground/82">
                                  {item.label}:
                                </span>{" "}
                                {item.value}
                              </p>
                            ))}
                          </div>
                        );
                      }

                      return <p key={index}>{block.text}</p>;
                    })}
                  </div>
                </section>
              ))}
            </article>
          </Card>
        </Container>
      </section>
    </main>
  );
}
