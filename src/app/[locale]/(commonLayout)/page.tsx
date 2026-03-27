import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("HomePage");

  return (
    <div className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8 lg:px-6">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        {t("title")}
      </h1>
      <p className="mt-4 max-w-xl text-slate-600">{t("description")}</p>
    </div>
  );
}
