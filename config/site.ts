export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "Dev Stater",
	description: "Semaless development experience for your next project.",
	navItems: [
		{
			label: "Home",
			href: "/",
		},
    {
      label: "Applications",
      href: "/applications",
    },
    {
      label: "Packages",
      href: "/packages",
    },
    // {
    //   label: "Blog",
    //   href: "/blog",
    // },
    {
      label: "About",
      href: "/about",
    }
	],
	navMenuItems: [
	],
	links: {
		packages: "/packages",
		applications: "/applications",
	},
};
