export type SiteLink = {
    id: string;
    label: string;
    path: string;
  };
  
  export const siteLinks: Record<string, SiteLink> = {
    home: {
      id: 'home',
      label: 'Home',
      path: '/',
    },
    api: {
      id: 'api',
      label: 'API',
      path: '/api',
    },
    auth: {
      id: 'auth',
      label: 'auth',
      path: '/auth',
    },
  };

  export const navLinks: SiteLink[] = [
    siteLinks.home,
    siteLinks.api,
  ];

  export const signedInNavLinks: SiteLink[] = [
    { label: "Dashboard", path: "/account", id:"account" },
  ];
  export const signedOutNavLinks: SiteLink[] = [
    { label: "Get Started", path: siteLinks.auth.path, id:'get-started' },
    { label: "Sign In", path: siteLinks.auth.path, id: 'sign-in' }]