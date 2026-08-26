/* ============================================================
   THE ONE FILE.

   Everything you'll ever want to change lives here.
   Add an app?  Add one object to PROJECTS.
   Add a kid?   Add one object to KIDS.
   Nothing else in this site needs touching, ever.

   `draft: true` marks words I wrote for you as a starting point.
   Rewrite them in your own voice and delete the flag.
   ============================================================ */

window.SITE = {

  /* ---------- the cover ---------- */
  hero: {
    eyebrow: 'A portfolio you can knock over',
    titleA: 'Work in ',
    titleB: 'Progress',
    subtitle: 'A mom, a marketer, and a small pile of apps that weren’t supposed to work. (They did.)',
    blocks: ['Q', 'U', 'Ỳ', 'N', 'H', '♥'],
  },

  /* ---------- chapter one ---------- */
  origin: {
    heading: 'Once upon a time, the app didn’t exist. So I made it.',
    draft: true,
    paragraphs: [
      'I was a new mom, sleep-deprived, refreshing app stores at 3 a.m. for something that actually helped. Everything was ugly, creepy about my data, or clearly built by someone who’d never held a baby at 3 a.m. So I built my own.',
      'I spent years making other people’s products sound good. Then I made my own, and found out that the marketer’s eye for what people actually need is the same eye you build with.',
    ],
    whisper: 'Still figuring out motherhood and building at the same time. Here’s what I’ve stacked so far.',
  },

  /* ---------- chapter two ---------- */
  projects: [
    {
      id: 'wonderling',
      name: 'Wonderling',
      kicker: 'Web app · July 2026',
      blurb: 'A baby tracker that works with the wifi off, and a 3 a.m. advisor that tells you NORMAL, WATCH, or CALL NOW before it says anything else.',
      status: 'soon',
      playUrl: null,
      repoUrl: null,
      color: 'b4',
      marginNote: 'The advisor reads your own logs, so it answers about your baby and not a baby. A hard-coded interceptor catches emergencies before the AI is ever asked — some questions should never wait for a model to think.',
      draft: true,
    },
    {
      id: 'balloon-pop',
      name: 'Balloon Pop Party',
      kicker: 'Webcam game · July 2026',
      blurb: 'Swipe your hand through the air to pop balloons. Grab the milk bottle for double points. Do not touch the dirty diaper.',
      status: 'playable',
      playUrl: 'https://captainnhunhu-gif.github.io/balloon-pop/',
      repoUrl: 'https://github.com/captainnhunhu-gif/balloon-pop',
      color: 'b1',
      marginNote: 'Built for Ryan’s first birthday. It had to work in a loud room full of people who would not read a single instruction, so there are none.',
      draft: true,
    },
    {
      id: 'flappy-face',
      name: 'Flappy Face',
      kicker: 'Webcam game · July 2026',
      blurb: 'Open your mouth to fly. Tilt your head to steer. Nobody has to explain it, because the instruction is the control.',
      status: 'playable',
      playUrl: 'https://captainnhunhu-gif.github.io/flappy-face/',
      repoUrl: 'https://github.com/captainnhunhu-gif/flappy-face',
      color: 'b3',
      marginNote: 'Started the same day as Balloon Pop. Watching grown adults gape their mouths open at a big screen turned out to be the entire point.',
      draft: true,
    },
    {
      id: 'photobooth',
      name: 'Photobooth',
      kicker: 'Desktop app · June 2026',
      blurb: 'Four shots, composed into one filmstrip over my own background art, printed straight out of a Canon over USB. No cloud, no waiting.',
      status: 'soon',
      playUrl: null,
      repoUrl: null,
      color: 'b2',
      marginNote: 'The hardest part was not the camera or the compositing. It was making a printer print silently, without a dialog box, in front of a queue of guests.',
      draft: true,
    },
    {
      id: 'baby-wall',
      name: 'Baby Wall',
      kicker: 'Web app · June 2026',
      blurb: 'A wall of the people who love him, for a baby who can’t read yet. Every name in Vietnamese and English.',
      status: 'code',
      playUrl: null,
      repoUrl: 'https://github.com/captainnhunhu-gif/baby-wall',
      color: 'b4',
      marginNote: 'The first thing I ever built. It is not the best one, and I am leaving it here on purpose.',
      draft: true,
    },
  ],

  /* ---------- chapter three: only verified numbers ----------
     Every figure below is checked against the actual repos.
     If you cannot prove it, it does not go on this page.      */
  numbers: [
    { n: '5',  cap: 'apps built' },
    { n: '36', cap: 'days from the first one to the last' },
    { n: '3',  cap: 'of them for a single birthday party' },
    { n: '2',  cap: 'games started on the very same day' },
    { n: '0',  cap: 'abandoned' },
    { n: '0',  cap: 'of the games need the internet to run' },
  ],
  numbersLead: 'Sweet story. I’m a marketer, though, so I kept the numbers too.',
  numbersFoot: 'June 6 to July 12, 2026. There was an eleven-month-old in the house learning to walk the whole time.',

  /* ---------- the kids this is really for ----------
     Add a row when a new one arrives. Nothing else changes. */
  kids: [
    { name: 'Ryan', since: '2025', note: 'The reason three of these exist.' },
  ],

  /* ---------- the end ---------- */
  end: {
    big: 'To be ',
    bigEm: 'continued',
    bigAfter: ' — with you, maybe.',
    email: 'captainnhunhu@gmail.com',
    cta: 'Start the next chapter',
    footer: 'Thanks for reading to the end. Most people don’t. I like you already.',
    copyright: '© 2026 QUỲNH NGUYỄN',
  },
};
