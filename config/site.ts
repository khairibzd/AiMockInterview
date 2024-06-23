export type SiteConfig = typeof siteConfig;

export const siteConfig = (isAuthenticated: any) => ({
  name: "Next.js + NextUI",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    ...(isAuthenticated
      ? [
          {
            label: "Upgrade",
            href: "/dashboard/upgrade",
          },
        ]
      : []),
    {
      label: "Questions",
      href: "/questions",
    },
    {
      label: "HowItWorks",
      href: "/howItWorks",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
  ],
  navMenuItems: [
    {
      label: "Home",
      href: "/",
    },
    ...(isAuthenticated
      ? [
          {
            label: "Upgrade",
            href: "/dashboard/upgrade",
          },
        ]
      : []),
    {
      label: "Questions",
      href: "/questions",
    },
    {
      label: "HowItWorks",
      href: "/howItWorks",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
  ],
  links: {
    github: "https://github.com/nextui-org/nextui",
    twitter: "https://twitter.com/getnextui",
    docs: "https://nextui.org",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
});
