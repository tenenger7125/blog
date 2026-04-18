'use client';

import { useEffect, useState } from 'react';

interface Line {
  command: string;
  output: string;
}

const LINES: Line[] = [
  {
    command: 'whoami',
    output: '안녕하세요, 타입스크립트 개발자 이동규입니다.',
  },
  {
    command: 'cat interests.txt',
    output: 'Next.js, Nest.js 를 주로 사용합니다.',
  },
  {
    command: 'cat philosophy.txt',
    output: `기능 구현을 넘어 재사용성과 기능 단위 분리를 고민하고,\n내일의 나와 동료가 읽기 편한 코드를 작성하려 합니다.\n초기 설계의 신중함이 프로젝트의 확장성과 안정성을 만든다고 믿습니다.`,
  },
];

const CHO = [
  'ㄱ',
  'ㄲ',
  'ㄴ',
  'ㄷ',
  'ㄸ',
  'ㄹ',
  'ㅁ',
  'ㅂ',
  'ㅃ',
  'ㅅ',
  'ㅆ',
  'ㅇ',
  'ㅈ',
  'ㅉ',
  'ㅊ',
  'ㅋ',
  'ㅌ',
  'ㅍ',
  'ㅎ',
];

const expandToFrames = (text: string): string[] => {
  const frames: string[] = [];
  let built = '';

  for (let i = 0; i < text.length; i++) {
    const char = text[i];

    if (char === '\n') {
      built += '\n';
      frames.push(built);
      continue;
    }

    const code = char.charCodeAt(0) - 0xac00;

    if (code >= 0 && code <= 11171) {
      const cho = Math.floor(code / (21 * 28));
      const jung = Math.floor((code % (21 * 28)) / 28);
      const jong = code % 28;

      frames.push(built + CHO[cho]);
      const choJung = String.fromCharCode(0xac00 + cho * 21 * 28 + jung * 28);
      frames.push(built + choJung);

      if (jong > 0) {
        frames.push(built + char);
      }

      built += char;
    } else {
      built += char;
      frames.push(built);
    }
  }

  return frames;
};

const renderWithLineBreaks = (text: string) =>
  text.split('\n').map((line, i, arr) => (
    <span key={i}>
      {line}
      {i < arr.length - 1 && <br />}
    </span>
  ));

const TYPING_SPEED = 60;
const LINE_DELAY = 500;

const TerminalIntro = ({ fixedHeight = false }: { fixedHeight?: boolean }) => {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [typedCommand, setTypedCommand] = useState<string>('');
  const [typedOutput, setTypedOutput] = useState<string>('');
  const [showFinalOutput, setShowFinalOutput] = useState<boolean>(false);
  const [isTypingCommand, setIsTypingCommand] = useState<boolean>(false);
  const [isTypingOutput, setIsTypingOutput] = useState<boolean>(false);
  const [isDone, setIsDone] = useState<boolean>(false);

  useEffect(() => {
    if (visibleLines >= LINES.length) {
      setIsDone(true);
      return undefined;
    }

    const currentLine = LINES[visibleLines];
    setTypedCommand('');
    setTypedOutput('');
    setShowFinalOutput(false);
    setIsTypingCommand(true);
    setIsTypingOutput(false);

    let charIndex = 0;

    const commandInterval = setInterval(() => {
      charIndex += 1;
      setTypedCommand(currentLine.command.slice(0, charIndex));

      if (charIndex >= currentLine.command.length) {
        clearInterval(commandInterval);
        setIsTypingCommand(false);

        setTimeout(() => {
          setIsTypingOutput(true);
          const frames = expandToFrames(currentLine.output);
          let frameIndex = 0;

          const outputInterval = setInterval(() => {
            frameIndex += 1;
            setTypedOutput(frames[frameIndex - 1] ?? '');

            if (frameIndex >= frames.length) {
              clearInterval(outputInterval);
              setIsTypingOutput(false);
              setShowFinalOutput(true);

              setTimeout(() => {
                setShowFinalOutput(false);
                setTypedCommand('');
                setTypedOutput('');
                setVisibleLines(prev => prev + 1);
              }, LINE_DELAY);
            }
          }, TYPING_SPEED);
        }, 300);
      }
    }, 80);

    return () => clearInterval(commandInterval);
  }, [visibleLines]);

  return (
    <>
      <style>{`
        @keyframes termBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .term-cursor {
          display: inline-block;
          width: 7px;
          height: 14px;
          background: #f8f8f2;
          margin-left: 2px;
          vertical-align: middle;
          transform: translateY(1px);
        }
        .term-cursor--blink {
          animation: termBlink 1s ease-in-out infinite;
        }
      `}</style>

      <div className="font-mono rounded-xl border border-dracula-border bg-dracula-bg p-5 text-sm">
        <TerminalBar />
        {fixedHeight ? (
          <div className="relative mt-4">
            {/* 최종 상태 기준으로 높이 고정 */}
            <div
              aria-hidden="true"
              className="pointer-events-none select-none space-y-3"
              style={{ visibility: 'hidden' }}>
              {LINES.map((line, i) => (
                <div key={i} className="space-y-0.5">
                  <p className="text-dracula-comment">
                    <Prompt />
                    <span className="text-dracula-text">{line.command}</span>
                  </p>
                  <p className="pl-4 text-dracula-purple">{renderWithLineBreaks(line.output)}</p>
                </div>
              ))}
            </div>
            <div className="absolute inset-0 space-y-3">
              <AnimatedContent
                isDone={isDone}
                isTypingCommand={isTypingCommand}
                isTypingOutput={isTypingOutput}
                showFinalOutput={showFinalOutput}
                typedCommand={typedCommand}
                typedOutput={typedOutput}
                visibleLines={visibleLines}
              />
            </div>
          </div>
        ) : (
          <div className="mt-4 space-y-3">
            <AnimatedContent
              isDone={isDone}
              isTypingCommand={isTypingCommand}
              isTypingOutput={isTypingOutput}
              showFinalOutput={showFinalOutput}
              typedCommand={typedCommand}
              typedOutput={typedOutput}
              visibleLines={visibleLines}
            />
          </div>
        )}
      </div>
    </>
  );
};

interface AnimatedContentProps {
  isDone: boolean;
  isTypingCommand: boolean;
  isTypingOutput: boolean;
  showFinalOutput: boolean;
  typedCommand: string;
  typedOutput: string;
  visibleLines: number;
}

const AnimatedContent = ({
  isDone,
  isTypingCommand,
  isTypingOutput,
  showFinalOutput,
  typedCommand,
  typedOutput,
  visibleLines,
}: AnimatedContentProps) => (
  <>
    {LINES.slice(0, visibleLines).map((line, i) => (
      <CompletedLine key={i} line={line} showCursor={isDone && i === LINES.length - 1} />
    ))}

    {visibleLines < LINES.length && (
      <div className="space-y-0.5">
        <p className="text-dracula-comment">
          <Prompt />
          <span className="text-dracula-text">{typedCommand}</span>
          {isTypingCommand && <span className="term-cursor" />}
        </p>
        {(isTypingOutput || showFinalOutput) && (
          <p className="pl-4 text-dracula-purple">
            {showFinalOutput ? renderWithLineBreaks(LINES[visibleLines].output) : renderWithLineBreaks(typedOutput)}
            {isTypingOutput && <span className="term-cursor" />}
          </p>
        )}
      </div>
    )}
  </>
);

const TerminalBar = () => (
  <div className="flex items-center gap-1.5">
    <span className="h-3 w-3 rounded-full bg-red-400" />
    <span className="h-3 w-3 rounded-full bg-yellow-400" />
    <span className="h-3 w-3 rounded-full bg-green-400" />
  </div>
);

const CompletedLine = ({ line, showCursor }: { line: Line; showCursor: boolean }) => (
  <div className="space-y-0.5">
    <p className="text-dracula-comment">
      <Prompt />
      <span className="text-dracula-text">{line.command}</span>
    </p>
    <p className="pl-4 text-dracula-purple">
      {renderWithLineBreaks(line.output)}
      {showCursor && <span className="term-cursor term-cursor--blink" />}
    </p>
  </div>
);

const Prompt = () => <span className="mr-2 text-dracula-green">~$</span>;

export default TerminalIntro;
