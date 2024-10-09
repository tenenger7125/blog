module.exports = {
  disableEmoji: false,
  format: '[{scope}@{type}]: {subject}',
  list: ['feat', 'fix', 'docs', 'style', 'refactor', 'test', 'chore', 'config', 'rename', 'ci', 'perf', 'type', 'init'],
  maxMessageLength: 64,
  minMessageLength: 3,
  questions: ['type', 'scope', 'subject'],
  scopes: ['blog'],
  types: {
    init: {
      description: 'Initialize a new project or module',
      emoji: '🎉',
      value: 'init',
    },
    feat: {
      description: 'Add a new feature',
      emoji: '🎸',
      value: 'feat',
    },
    fix: {
      description: 'Modify production, UI,UX code',
      emoji: '🐛',
      value: 'fix',
    },
    docs: {
      description: 'Add or update documentation',
      emoji: '✏️ ',
      value: 'docs',
    },
    style: {
      description: 'Add or update code format (not updation production, UI,UX code)',
      emoji: '💄',
      value: 'style',
    },
    refactor: {
      description: 'Code change that neither fixes a bug nor adds a feature',
      emoji: '💡',
      value: 'refactor',
    },
    test: {
      description: 'Code change related with tests cases',
      emoji: '💍',
      value: 'test',
    },
    chore: {
      description: 'Changes to the build process or auxiliary tools and libraries such as documentation generation',
      emoji: '🤖',
      value: 'chore',
    },
    config: {
      description: 'Changes to configuration files or settings',
      emoji: '🔧',
      value: 'config',
    },
    rename: {
      description: 'Rename files or directories without changing the code',
      emoji: '🔄',
      value: 'rename',
    },
    ci: {
      description: 'CI related changes',
      emoji: '🎡',
      value: 'ci',
    },
    perf: {
      description: 'A code change that improves performance',
      emoji: '⚡️',
      value: 'perf',
    },
    type: {
      description: 'add or update type',
      emoji: '🏷️',
      value: 'type',
    },
    messages: {
      type: "Select the type of change that you're committing:",
      customScope: 'Select the scope this component affects:',
      subject: 'Write a short, imperative mood description of the change:\n',
      body: 'Provide a longer description of the change:\n ',
      breaking: 'List any breaking changes:\n',
      footer: 'Issues this commit closes, e.g #123:',
      confirmCommit: 'The packages that this commit has affected\n',
    },
  },
};
