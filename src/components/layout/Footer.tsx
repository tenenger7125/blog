import { Icon } from 'dotori-icons';
import { getNowMonthDate } from 'dotori-utils';

const Footer = () => {
  const { year } = getNowMonthDate();

  return (
    <footer className="relative z-[1] h-48 w-full bg-gray-0 text-xs shadow-inner dark:bg-gray-900 dark:text-gray-400">
      <div className="m-auto max-w-8xl">
        <div className="h-inherit fixed bottom-0 z-[5] mx-auto flex w-full max-w-8xl flex-wrap items-center justify-between gap-4 px-3 py-4">
          <div className="flex w-full justify-between">
            <div className="flex flex-col gap-2">
              <h4 className="typo-xs700">
                <span>동그라미 블로그</span>
              </h4>
              <div>
                &copy; <span>{year} LEE_DONG_GYU, All rights reserved.</span>
              </div>
            </div>
            <div>
              <a href="https://github.com/tenenger7125/blog" rel="noopener noreferrer">
                <Icon icon="github" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
