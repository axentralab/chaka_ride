"use client";

import { motion } from "framer-motion";
import {
  HeartHandshake,
  MapPinned,
  Shield,
  Users,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { FaWhatsapp } from "react-icons/fa6";
import Image from "next/image";

const headlineContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.06 } },
} as const;

const headlineLine = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
} as const;

const cardReveal = {
  hidden: { opacity: 0, y: 26, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.52, ease: [0.22, 1, 0.36, 1] as const },
  },
} as const;

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
} as const;

function StatCard({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <motion.div
      variants={cardReveal}
      className="flex flex-col items-center gap-1.5 rounded-2xl border border-(--brand-primary)/10 bg-white/80 px-6 py-6 shadow-sm backdrop-blur-sm"
    >
      <span className="text-3xl font-extrabold tracking-tight text-(--brand-primary) sm:text-4xl">
        {value}
      </span>
      <span className="text-sm font-medium text-slate-600">{label}</span>
    </motion.div>
  );
}

function ValueCard({
  icon: Icon,
  title,
  body,
}: {
  icon: LucideIcon;
  title: string;
  body: string;
}) {
  return (
    <motion.div
      variants={cardReveal}
      whileHover={{
        y: -3,
        transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
      }}
      className="flex gap-4 rounded-2xl border border-(--brand-primary)/10 bg-white/80 p-5 shadow-sm backdrop-blur-sm transition-[box-shadow,border-color] duration-300 hover:border-(--brand-primary)/18 hover:shadow-md sm:p-6"
    >
      <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-(--brand-primary)/12 bg-white shadow-sm ring-1 ring-(--brand-primary)/6 sm:size-14">
        <Icon
          className="size-6 text-(--brand-primary) sm:size-7"
          strokeWidth={1.65}
          aria-hidden
        />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="text-lg font-bold text-slate-900 sm:text-xl">
          {title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-[15px]">
          {body}
        </p>
      </div>
    </motion.div>
  );
}

const VALUE_ICONS: LucideIcon[] = [Shield, HeartHandshake, Users, MapPinned];

export default function AboutPage() {
  const t = useTranslations("AboutPage");
  const tFooter = useTranslations("Footer");

  return (
    <>
      {/* Hero banner */}
      <section className="relative w-full overflow-hidden bg-(--hero-bg) pb-12 sm:pb-16 lg:pb-20">
        <div
          className="pointer-events-none absolute top-1/4 left-1/2 z-0 h-72 w-[min(100vw,48rem)] -translate-x-1/2 rounded-full opacity-[0.4] blur-3xl"
          style={{
            background:
              "radial-gradient(ellipse 65% 50% at 50% 50%, color-mix(in srgb, var(--brand-primary) 32%, transparent), transparent 72%)",
          }}
          aria-hidden
        />

        <div className="relative z-10 mx-auto max-w-4xl px-4 pt-14 text-center sm:px-6 sm:pt-20 lg:pt-24">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={headlineContainer}
          >
            <motion.p
              variants={headlineLine}
              className="flex items-center justify-center gap-2 text-base font-medium tracking-tight text-slate-600 sm:text-lg"
            >
              <span className="font-semibold text-orange-600">
                {t("eyebrow")}
              </span>
            </motion.p>
            <motion.span
              variants={headlineLine}
              className="mx-auto mt-3 mb-3 block h-0.5 w-14 rounded-full bg-linear-to-r from-transparent via-(--brand-primary) to-transparent opacity-90 sm:mt-4 sm:mb-4 sm:w-20"
              aria-hidden
            />
            <motion.h1
              variants={headlineLine}
              className="text-balance text-3xl leading-[1.12] font-extrabold tracking-tight sm:text-4xl sm:leading-[1.1] lg:text-5xl lg:leading-[1.08]"
            >
              <span className="bg-linear-to-br from-[#0f2744] from-25% via-[#1e4a8c] via-55% to-[#2d7dd2] bg-clip-text text-transparent">
                {t("title")}
              </span>
            </motion.h1>
            <motion.p
              variants={headlineLine}
              className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-slate-600 sm:text-lg"
            >
              {t("intro")}
            </motion.p>
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          className="relative z-10 mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-4 px-4 sm:mt-16 sm:grid-cols-4 sm:gap-6 sm:px-6"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <StatCard value={t("stat1Value")} label={t("stat1Label")} />
          <StatCard value={t("stat2Value")} label={t("stat2Label")} />
          <StatCard value={t("stat3Value")} label={t("stat3Label")} />
          <StatCard value={t("stat4Value")} label={t("stat4Label")} />
        </motion.div>
      </section>

      {/* Mission section */}
      <section className="relative w-full overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-72px" }}
              variants={headlineContainer}
            >
              <motion.p
                variants={headlineLine}
                className="text-base font-semibold text-orange-600 sm:text-lg"
              >
                {t("missionEyebrow")}
              </motion.p>
              <motion.h2
                variants={headlineLine}
                className="mt-3 text-balance text-2xl leading-[1.15] font-extrabold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl"
              >
                {t("missionTitle")}
              </motion.h2>
              <motion.p
                variants={headlineLine}
                className="mt-5 max-w-lg text-pretty text-[15px] leading-relaxed text-slate-600 sm:text-base"
              >
                {t("missionBody")}
              </motion.p>
            </motion.div>

            <motion.div
              className="relative mx-auto w-full max-w-md lg:max-w-none"
              initial={{ opacity: 0, y: 36, filter: "blur(8px)" }}
              whileInView={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                transition: {
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                },
              }}
              viewport={{ once: true, margin: "-40px" }}
            >
              <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-100 shadow-lg">
                <Image
                  src="/assets/images/why_chose_us/purbachal.jpg"
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <Image
                src="/assets/images/why_chose_us/car-png.png"
                alt=""
                width={640}
                height={340}
                className="pointer-events-none absolute -bottom-6 left-1/2 z-10 h-auto w-[85%] max-w-none -translate-x-1/2 object-contain drop-shadow-[0_20px_40px_rgba(15,23,42,0.22)]"
                sizes="(max-width: 1024px) 80vw, 400px"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values section */}
      <section className="relative w-full overflow-hidden bg-(--hero-bg) py-16 sm:py-20 lg:py-24">
        <div
          className="pointer-events-none absolute bottom-0 left-1/2 z-0 h-80 w-[min(100vw,52rem)] -translate-x-1/2 rounded-full opacity-[0.35] blur-3xl"
          style={{
            background:
              "radial-gradient(ellipse 65% 50% at 50% 50%, color-mix(in srgb, var(--brand-primary) 28%, transparent), transparent 72%)",
          }}
          aria-hidden
        />

        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-10">
          <motion.header
            className="mx-auto mb-12 max-w-3xl text-center sm:mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-72px" }}
            variants={headlineContainer}
          >
            <motion.p
              variants={headlineLine}
              className="text-base font-semibold text-orange-600 sm:text-lg"
            >
              {t("valuesEyebrow")}
            </motion.p>
            <motion.span
              variants={headlineLine}
              className="mx-auto mt-3 mb-3 block h-0.5 w-14 rounded-full bg-linear-to-r from-transparent via-(--brand-primary) to-transparent opacity-90 sm:mt-4 sm:mb-4 sm:w-20"
              aria-hidden
            />
            <motion.h2
              variants={headlineLine}
              className="text-balance text-2xl leading-[1.15] font-extrabold tracking-tight sm:text-3xl lg:text-4xl"
            >
              <span className="bg-linear-to-br from-[#0f2744] from-25% via-[#1e4a8c] via-55% to-[#2d7dd2] bg-clip-text text-transparent">
                {t("valuesTitle")}
              </span>
            </motion.h2>
          </motion.header>

          <motion.div
            className="grid gap-6 sm:grid-cols-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={staggerContainer}
          >
            {([1, 2, 3, 4] as const).map((n) => (
              <ValueCard
                key={n}
                icon={VALUE_ICONS[n - 1]}
                title={t(`value${n}Title`)}
                body={t(`value${n}Body`)}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA section */}
      <section className="relative w-full overflow-hidden bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-72px" }}
            variants={headlineContainer}
          >
            <motion.h2
              variants={headlineLine}
              className="text-balance text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl"
            >
              {t("ctaTitle")}
            </motion.h2>
            <motion.p
              variants={headlineLine}
              className="mx-auto mt-4 max-w-lg text-pretty text-[15px] leading-relaxed text-slate-600 sm:text-base"
            >
              {t("ctaBody")}
            </motion.p>
            <motion.div variants={headlineLine} className="mt-8">
              <a
                href={tFooter("socialWhatsapp")}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-wa-cta inline-flex items-center gap-2.5 rounded-full bg-(--brand-primary) px-7 py-3 text-base font-semibold text-white shadow-md transition-colors hover:bg-(--brand-primary-hover)"
              >
                {t("ctaButton")}
                <span className="nav-wa-cta__icon-ring flex size-9 items-center justify-center rounded-full bg-white transition-colors">
                  <FaWhatsapp
                    className="nav-wa-cta__icon size-[18px] text-(--brand-primary) transition-colors"
                    aria-hidden
                  />
                </span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
