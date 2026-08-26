/* ============================================================
   THE ONE FILE.

   The whole site is one screen. Everything on it is an object in
   DESK. Click an object and its panel opens.

   Add anything?  Add one object to DESK. Nothing else to touch.

   icon:  a name from js/icons.js
   color: cream · pink · powder · olive
   body:  array of paragraphs shown in the panel
   `draft: true` marks words I wrote for you as a starting point.
   Rewrite them in your own voice and delete the flag.
   ============================================================ */

window.SITE = {

  name:     'Work in Progress',
  blocks:   ['Q', 'U', 'Ỳ', 'N', 'H', '♥'],
  tagline:  'a mom, a marketer, and a small pile of apps that weren’t supposed to work',

  desk: [
    /* ---------- the story ---------- */
    {
      id: 'about', icon: 'face', color: 'pink', label: 'about me',
      title: 'Once upon a time, the app didn’t exist. So I made it.',
      draft: true,
      body: [
        'I was a new mom, sleep-deprived, refreshing app stores at 3 a.m. for something that actually helped. Everything was ugly, creepy about my data, or clearly built by someone who’d never held a baby at 3 a.m. So I built my own.',
        'I spent years making other people’s products sound good. Then I made my own, and found out that the marketer’s eye for what people actually need is the same eye you build with.',
        'Still figuring out motherhood and building at the same time. Here’s what I’ve stacked so far.',
      ],
    },

    /* ---------- the things she built ---------- */
    {
      id: 'wonderling', icon: 'bottle', color: 'powder', label: 'Wonderling',
      title: 'Wonderling',
      tag: 'web app · july 2026',
      body: ['A baby tracker that works with the wifi off, and a 3 a.m. advisor that tells you NORMAL, WATCH, or CALL NOW before it says anything else.'],
      note: 'It reads your own logs, so it answers about your baby and not a baby. A hard-coded interceptor catches emergencies before the AI is ever asked.',
      draft: true,
    },
    {
      id: 'balloon-pop', icon: 'balloon', color: 'pink', label: 'Balloon Pop',
      title: 'Balloon Pop Party',
      tag: 'webcam game · july 2026',
      body: ['Swipe your hand through the air to pop balloons. Grab the milk bottle for double points. Do not touch the dirty diaper.'],
      note: 'Built for Ryan’s first birthday. It had to work in a loud room full of people who would not read a single instruction, so there are none.',
      playUrl: 'https://captainnhunhu-gif.github.io/balloon-pop/',
      repoUrl: 'https://github.com/captainnhunhu-gif/balloon-pop',
      draft: true,
    },
    {
      id: 'flappy-face', icon: 'bird', color: 'olive', label: 'Flappy Face',
      title: 'Flappy Face',
      tag: 'webcam game · july 2026',
      body: ['Open your mouth to fly. Tilt your head to steer. Nobody has to explain it, because the instruction is the control.'],
      note: 'Started the same day as Balloon Pop. Watching grown adults gape their mouths open at a big screen turned out to be the entire point.',
      playUrl: 'https://captainnhunhu-gif.github.io/flappy-face/',
      repoUrl: 'https://github.com/captainnhunhu-gif/flappy-face',
      draft: true,
    },
    {
      id: 'photobooth', icon: 'camera', color: 'cream', label: 'Photobooth',
      title: 'Photobooth',
      tag: 'desktop app · june 2026',
      body: ['Four shots, composed into one filmstrip over my own background art, printed straight out of a Canon over USB. No cloud, no waiting.'],
      note: 'The hardest part was not the camera or the compositing. It was making a printer print silently, with no dialog box, in front of a queue of guests.',
      draft: true,
    },
    {
      id: 'baby-wall', icon: 'frame', color: 'powder', label: 'Baby Wall',
      title: 'Baby Wall',
      tag: 'web app · june 2026',
      body: ['A wall of the people who love him, for a baby who can’t read yet. Every name in Vietnamese and English.'],
      note: 'The first thing I ever built. It is not the best one, and I am leaving it here on purpose.',
      repoUrl: 'https://github.com/captainnhunhu-gif/baby-wall',
      draft: true,
    },

    /* ---------- the numbers ---------- */
    {
      id: 'receipts', icon: 'receipt', color: 'olive', label: 'the receipts',
      title: 'the receipts.',
      body: ['Sweet story. I’m a marketer, though, so I kept the numbers too.'],
      /* every figure checked against the real repos. if you can't prove it, it doesn't go here. */
      numbers: [
        { n: '5',  cap: 'apps built' },
        { n: '36', cap: 'days from the first one to the last' },
        { n: '3',  cap: 'of them for a single birthday party' },
        { n: '2',  cap: 'games started on the very same day' },
        { n: '0',  cap: 'abandoned' },
        { n: '0',  cap: 'of the games need the internet' },
      ],
      note: 'June 6 to July 12, 2026. There was an eleven-month-old in the house learning to walk the whole time.',
    },

    /* ---------- her stuff ---------- */
    {
      id: 'ryan', icon: 'heart', color: 'pink', label: 'Ryan',
      title: 'Ryan',
      body: ['One, and busy. The reason three of these exist.',
             'This whole thing is really for him, and for whoever comes after him. They won’t read it for years.'],
      draft: true,
    },
    {
      id: 'fuel', icon: 'coffee', color: 'olive', label: 'fuel',
      title: 'fuel',
      body: ['Oat flat white, extra shot, reheated twice.'],
      draft: true,
    },
    {
      id: 'nightstand', icon: 'books', color: 'cream', label: 'nightstand',
      title: 'on the nightstand',
      body: ['Three books, none of them finished.'],
      draft: true,
    },
    {
      id: 'onrepeat', icon: 'music', color: 'pink', label: 'on repeat',
      title: 'on repeat',
      body: ['Something quiet, so the baby stays down.'],
      draft: true,
    },
    {
      id: 'threeam', icon: 'clock', color: 'powder', label: '3 a.m.',
      title: '3 a.m.',
      body: ['The hour most of this got built.',
             'Also the hour I most wanted an app that already existed, which is how half of these started.'],
    },
    {
      id: 'wishlist', icon: 'sparkle', color: 'olive', label: 'wish list',
      title: 'apps I wish existed',
      body: ['One that folds laundry. A snooze button for teething. More hours, same pay.'],
      draft: true,
    },

    {
      id: 'next', icon: 'plant', color: 'powder', label: 'what’s next',
      title: 'what’s next',
      body: [
        'More apps for the 3 a.m. problems nobody has bothered to solve. Most of them start as something I needed myself at a bad hour and couldn’t find anywhere.',
        'If one of them turns out to help another mom, that’s the whole point of putting them here.',
      ],
      draft: true,
    },

    /* ---------- say hi ---------- */
    {
      id: 'hello', icon: 'envelope', color: 'cream', label: 'say hi',
      title: 'To be continued — with you, maybe.',
      body: ['Thanks for poking around. Most people don’t. I like you already.'],
      email: 'captainnhunhu@gmail.com',
      cta: 'start the next chapter',
    },
  ],

  footer: '© 2026 QUỲNH NGUYỄN',
};
