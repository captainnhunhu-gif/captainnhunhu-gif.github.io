# Work in Progress

My storybook. A mom, a marketer, and a small pile of apps that weren't supposed to work.

**Live:** https://captainnhunhu-gif.github.io

## To change anything

Everything editable lives in one file: [`content/site.js`](content/site.js).

- **New app, or anything else for the wall?** Add one object to `wall`.
  Set `size: 'big'` for a project, `'small'` for a little object.
  `icon:` is any name from `js/icons.js`; `color:` is cream, pink, powder or olive.
- **New kid?** Add one row to `kids`.
- **New number?** Add one to `numbers`.

Nothing else needs touching. The page builds itself from that file.

Lines marked `draft: true` are placeholder words waiting to be replaced with my own.

## How it's built

Plain HTML, CSS, and JavaScript. No build step, no framework, no package manager,
no webfonts, no dependencies of any kind. Open `index.html` in a browser and it runs.

That's deliberate. My kids are going to open this in fifteen years, and a plain
HTML file still opens in fifteen years. A pile of packages does not.

| File | What it does |
|------|--------------|
| `content/site.js` | All the content. The only file you normally edit. |
| `index.html` | The page skeleton and the mount points. |
| `css/storybook.css` | Palette, type, layout, day/night. |
| `js/render.js` | Reads `site.js`, builds the page, handles the theme toggle. |
| `js/icons.js` | The hand-drawn icons. Add one here to use it on the wall. |
| `js/blocks.js` | Hand-rolled toy-block physics for the tower. No library. |

## The tower

The blocks spelling QUỲNH are a real physics simulation — gravity, bouncing,
collisions, grab-and-fling. Roughly 200 lines of vanilla JavaScript.
Squares that collide as circles, because at that size nobody can tell.
