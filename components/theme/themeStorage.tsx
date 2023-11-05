// import { NextApiRequest, NextApiResponse } from 'next';
// import { serialize, parse } from 'cookie';

// const THEME_COOKIE_KEY = 'theme';

// export const getStoredTheme = (req: NextApiRequest): string | null => {
//   const cookies = parse(req.headers.cookie || '');
//   return cookies[THEME_COOKIE_KEY] || null;
// };

// export const setTheme = (res: NextApiResponse, theme: string): void => {
//   const serializedCookie = serialize(THEME_COOKIE_KEY, theme, {
//     path: '/',
//     maxAge: 31536000,
//   });
//   res.setHeader('Set-Cookie', serializedCookie);
// };
