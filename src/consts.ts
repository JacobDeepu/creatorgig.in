// Central config — swap these when wiring the real app/domain.

export const SITE = {
  name: 'creatorgig',
  url: 'https://creatorgig.in',
  title: 'creatorgig — Where Creators Get Paid | India’s Creator Marketplace',
  description:
    'Connect with brands, create gig offerings, and get paid. creatorgig is India’s creator marketplace for influencers and businesses. Free to join.',
  keywords:
    'creator marketplace India, influencer marketing platform, brand deals for creators, influencer marketplace, get paid as influencer',
  ogImage: '/og-image.png',
  locale: 'en_IN',
} as const;

// Auth / app lives on the app subdomain.
export const APP = {
  signup: 'https://app.creatorgig.in/signup',
  login: 'https://app.creatorgig.in/login',
  postBrief: 'https://app.creatorgig.in/signup?as=business',
} as const;

export const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'How it works', href: '#how' },
  { label: 'AI', href: '#ai' },
  { label: 'For business', href: '#for-business' },
] as const;

export const PLATFORMS = ['Instagram', 'YouTube', 'Facebook'] as const;
