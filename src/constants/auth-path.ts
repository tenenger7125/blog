import { PATH } from './path';

export const AUTH_REQUIRED_PATHS = [PATH.POST_NEW];
export const AUTH_REQUIRED_REGEX_PATHS = [/^\/post\/[^/]+\/edit$/];
export const AUTH_EXEMPT_PATHS = [PATH.LOGIN, PATH.SIGNUP];
