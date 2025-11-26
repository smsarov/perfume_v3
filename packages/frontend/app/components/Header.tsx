import BagIcon from "@public/icons/bag.svg";
import HeartIcon from "@public/icons/heart.svg";
import LogoIcon from "@public/icons/logo.svg";
import SearchIcon from "@public/icons/search.svg";
import ProfileIcon from "@public/icons/profile.svg";
import HeaderTabs from "./HeaderTabs";

const tabs = [
  { href: "", label: "Каталог" },
  { href: "", label: "Бренды" },
  { href: "", label: "Идеи для подарков" },
  { href: "", label: "Подарочный сертификат" },
  { href: "", label: "Aroma box" },
  { href: "", label: "Beauty talk" },
];

export default function Header() {
  return (
    <header className="flex flex-row justify-between items-center px-12 text bg-accent text-background text-2xl">
      <LogoIcon className="min-w-fit scale-75"/>
      <HeaderTabs tabs={tabs} />
      <ul className="flex flex-row gap-8">
        <li>
          <SearchIcon width={30} height={30} />
        </li>
        <li>
          <ProfileIcon width={30} height={30} />
        </li>
        <li>
          <HeartIcon width={30} height={30} />
        </li>
        <li>
          <BagIcon width={30} height={30} />
        </li>
      </ul>
    </header>
  );
}
