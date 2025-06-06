'use client';

import { cn } from 'dotori-utils';
import Image from 'next/image';
import Link from 'next/link';

import armyIcon from '@/assets/career/army.jpeg';
import crystarIcon from '@/assets/career/crystar_lightmode 2.png';
import HufsIcon from '@/assets/career/hufs.svg';
import jinhakapplyIcon from '@/assets/career/jinhakapply.png';
import KNUIcon from '@/assets/career/knu.svg';
import wantedIcon from '@/assets/career/wanted.png';
import zerobaseIcon from '@/assets/career/zb.png';

const contents = [
  {
    company: '크리스타비전',
    iconSrc: crystarIcon.src,
    date: '2024.12 ~ 2025.04',
    job: '프론트엔드',
    children: [
      {
        title: '안과 의사를 위한 안저 질환 AI 판별 웹사이트',
        descriptions: [
          '기술스택 : Next.js 14, Typescript, Tailwindcss, React-Query, Zustand, React-Hook-Form, Zod, React-i18next, Cypress, Husky, Commitzen, Eslint, Prettier, Docker, Jenkins',
        ],
      },
      {
        title: '[로그인/회원가입 페이지]',
        descriptions: [
          '`React-Hook-Form` 와 `Zod` 를 활용하여 Form 처리 및 유효성 검증',
          '`React-i18next`를 사용하여 `SSR`과 `CSR` 환경에서 동작가능한 커스텀 훅 설계하여 다국어 기능 구현',
          '`Zustand`를 활용하여 로그인 시 입력한 아이디를 기억하는 기능',
        ],
      },
      {
        title: '[메인 페이지]',
        descriptions: [
          'Dicom, Image 파일 업로드 기능',
          '체크박스를 통해 `다중 항목을 선택`하여 선택된 데이터 삭제 및 AI 분석 기능',
          'AI 분석 결과와 의사 진단결과를 `CSV` 및 `PDF` 파일로 저장',
          '검사 및 AI 분석 날짜, 진단명, 환자ID, 처리상태 값을 이용해 검색 `필터링`',
          '검사날짜 값을 이용해 데이터 `정렬`',
          '`API Route`를 사용해 인가된 사용자만 안저 사진 조회',
          '마우스 휠 스크롤 및 버튼 이용한 안저 사진 `확대/축소` 기능',
        ],
      },
      {
        title: '[메인 페이지]',
        descriptions: [
          'Dicom, Image 파일 업로드 기능',
          '체크박스를 통해 `다중 항목을 선택`하여 선택된 데이터 삭제 및 AI 분석 기능',
          'AI 분석 결과와 의사 진단결과를 `CSV` 및 `PDF` 파일로 저장',
          '검사 및 AI 분석 날짜, 진단명, 환자ID, 처리상태 값을 이용해 검색 `필터링`',
          '검사날짜 값을 이용해 데이터 `정렬`',
          '`API Route`를 사용해 인가된 사용자만 안저 사진 조회',
          '마우스 휠 스크롤 및 버튼 이용한 안저 사진 `확대/축소` 기능',
        ],
      },
      {
        title: '[대시보드 페이지]',
        descriptions: [
          '마우스로 드래그하여 가로 스크롤을 이동할 수 있는 `Drag to Scroll` 기능',
          '`Polling` 방식을 사용하여 5초 마다 GPU Health Status를 주기적으로 확인하는 기능',
          'AI 분석 모델의 혼동행렬 값을 `Recharts` 라이브러리를 활용해 통계 그래프 구현',
        ],
      },
      {
        title: '[인증/보안]',
        descriptions: [
          '`middleware`를 추가하여 페이지 이동간 인가된 사용자를 체크한 후 로그인 또는 메인페이지로 리다이렉트',
          '`Axios Instance` 를 활용해 `Request` 요청시 `AccessToken`은 만료되었고 `RefreshToken`이 유효하면 `AccessToken` 재생성 후 재요청',
        ],
      },
      {
        title: '[테스트 코드]',
        descriptions: [
          '마우스로 드래그하여 가로 스크롤을 이동할 수 있는 `Drag to Scroll` 기능',
          '`Cypress` 를 활용하여 로그인, 회원가입, 다국어, 파일 업로드 E2E 테스트 진행',
        ],
      },
      {
        title: '[인프라 환경]',
        descriptions: ['리눅스 온프레미스 환경에서 `Docker`와 `Jenkins`를 활용하여 코드 푸쉬되면 자동 배포'],
      },
    ],
  },
  {
    company: '진학어플라이',
    iconSrc: jinhakapplyIcon.src,
    date: '2023.08 ~ 2024.09',
    job: '프론트엔드',
    children: [
      {
        title: '대학 입학관리 프로그램, SQL 프로시저, 출력물 유지보수',
        descriptions: ['기술스택 : C#, .Net, Oracle, MSSQL, Cystal Report'],
      },
      { title: '디자인 시스템 구축', descriptions: ['기술스택 : React, Tailwindcss, Storybook'] },
    ],
  },
  {
    company: '원티드 프리온보딩 프론트엔드',
    iconSrc: wantedIcon.src,
    date: '2023.06 ~ 2023.07',
    job: '교육생',
    children: [
      {
        title: '프론트엔드 교육 프로그램 참여',
        descriptions: [
          '개인 과제 : API 호출을 최소화한 캐시 기능으로 성능을 고려한 효율적인 개발',
          '팀 과제 : 프론트엔드 개발자들간의 협업, Best Pratice 공유',
        ],
      },
    ],
  },
  {
    company: '제로베이스 프론트엔드 부트캠프',
    date: '2023.01 ~ 2023.05',
    job: '교육생',
    iconSrc: zerobaseIcon.src,
    children: [
      {
        title: '프론트엔드 교육 부트캠프 참여',
        descriptions: ['모던 자바스크립트 책 학습', '바닐라 자바스크립트 및 리액트 페어 프로그래밍'],
      },
      {
        title: '신발 쇼핑몰 팀 프로젝트',
        descriptions: ['기술스택 : React, Javascript, Styled-Components, Mantine, React-Query, Express, Mongodb, AWS'],
      },
    ],
  },
  {
    company: '한국외국어대학교',
    job: '프론트엔드',
    icon: <HufsIcon />,
    date: '2022.04 ~ 2022.12',
    children: [{ title: '대학교 홈페이지 유지보수', descriptions: ['기술스택 : HTML, CSS, Javascript'] }],
  },
  {
    company: '군 복무',
    iconSrc: armyIcon.src,
    date: '2019.03 ~ 2021.06',
    children: [{ title: 'ROTC 화생방 장교', descriptions: ['27사단 포병여단'] }],
  },
  {
    company: '강원대학교',
    icon: <KNUIcon />,
    date: '2015.03 ~ 2019.02',
    children: [{ title: '생명과학 졸업', descriptions: [] }],
  },
];

const AboutPage = () => (
  <div className="flex w-full flex-col gap-5 dark:text-gray-500">
    <div className="flex flex-col gap-2">
      <h2 className="text-3xl font-bold">이동규</h2>

      <span>
        <Link href="mailto:tenenger7125@gmail.com">✉️ tenenger7125@gmail.com</Link>
      </span>
      <span>
        <Link href="tel:010-3113-4985">📱 010-3113-4985</Link>
      </span>
    </div>
    <div>
      <h2 className="text-2xl font-bold">타임라인</h2>
      <div className="flex flex-col gap-2">
        {contents.map((content, index) => (
          <VerticalTimelineElement {...content} key={index} position={index % 2 === 0 ? 'left' : 'right'}>
            <div className="flex flex-col gap-2 p-4">
              {content.children.map(({ title, descriptions }) => (
                <div key={title}>
                  <p className="text-lg font-semibold">{title}</p>
                  {descriptions.map(description => (
                    <p key={description}>{description}</p>
                  ))}
                </div>
              ))}
            </div>
          </VerticalTimelineElement>
        ))}
      </div>
    </div>
  </div>
);

const VerticalTimelineElement = ({
  position,
  company,
  children,
  icon,
  iconSrc,
  date,
  alt,
  job,
}: VerticalTimelineElementProps) => (
  <div>
    <div className={verticalTimelineElementStyle({ position })}>
      <div className="flex-1">
        <div className={cardStyle({ position, isShow: position === 'left' })}>{children}</div>
      </div>
      <div className="p-2 font-bold text-gray-600">
        <div className={iconStyle()}>
          {icon || (
            <Image
              alt={alt || company}
              className="h-full w-full rounded-full"
              height={0}
              src={iconSrc || ''}
              width={0}
            />
          )}
          <div className={dateStyle({ position })}>
            <div>{[company, job].filter(Boolean).join(' / ')}</div>
            <div>{date}</div>
          </div>
        </div>
      </div>
      <div className="flex-1">
        <div className={cardStyle({ position, isShow: position === 'right' })}>{children}</div>
      </div>
    </div>
  </div>
);

interface VerticalTimelineElementProps {
  position: 'left' | 'right';
  company: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconSrc?: string;
  date: string;
  alt?: string;
  job?: string;
}

const verticalTimelineElementStyle = cn('flex p-5 lg:flex', {
  variants: {
    position: {
      left: 'max-lg:flex-col-reverse',
      right: 'max-lg:flex-col',
    },
  },
});

const cardStyle = cn('bg-gray-100 dark:bg-gray-900', {
  variants: {
    position: {
      left: 'ml-auto',
      right: 'mr-auto',
    },
    isShow: {
      true: 'block',
      false: 'hidden',
    },
  },
});

const dateStyle = cn('absolute top-1/2 -translate-y-1/2 text-nowrap', {
  variants: {
    position: {
      left: 'left-full translate-x-4 lg:left-full lg:translate-x-4',
      right: 'max-lg:left-full translate-x-4 lg:right-full lg:-translate-x-4',
    },
  },
});

const iconStyle = cn('relative h-12 w-12 rounded-full border-2 border-gray-400 bg-white p-1');

export default AboutPage;
