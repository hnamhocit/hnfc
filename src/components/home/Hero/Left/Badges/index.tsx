import { useTranslations } from "next-intl";
import FeatureBadge from "./FeatureBadge";

const badges = ["minimal", "fastReviews", "crossPlatform"];

export default function Badges() {
  const t = useTranslations("home.hero");

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {badges.map((badge) => (
        <FeatureBadge key={badge}>{t(`badge.${badge}`)}</FeatureBadge>
      ))}
    </div>
  );
}
