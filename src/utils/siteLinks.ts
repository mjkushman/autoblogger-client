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
      label: 'Sign in',
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
    { label: "Get started", path: `${siteLinks.auth.path}?mode=signup`, id:'get-started' },
    { label: "Sign in", path: siteLinks.auth.path, id: 'sign-in' }]