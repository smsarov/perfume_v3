interface HeaderTabsProps {
  tabs: { href: string; label: string }[];
}

export default function HeaderTabs({ tabs }: HeaderTabsProps) {
  return (
    <nav className="w-full mx-4">
      <ul className="flex flex-row w-full justify-around items-center">
        {tabs.map(({ href, label }) => (
          <li key={`${label}-${href}`}>
            <a href={href}>
              <span>{label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
