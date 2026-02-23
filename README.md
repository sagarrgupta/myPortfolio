# Portfolio

> **Free to use!** This portfolio is open source. If you use it, a credit/link back would be really appreciated 🙏

This portfolio is based on the open source template created by Naresh Khatri. I copied their repository and used it as the starting point for my own site. It includes interactive 3D animations, smooth transitions, and a space themed design. It also has a 3D keyboard where each key represents a skill.

Credit: https://github.com/Naresh-Khatri/3d-portfolio

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/sagarrgupta/myPortfolio)

![Portfolio Preview](https://github.com/sagarrgupta/myPortfolio/blob/main/public/assets/nav-link-previews/landing.png?raw=true)

## ✨ Features

- **Interactive 3D Keyboard** — Custom Spline keyboard where each keycap represents a skill, revealing titles and descriptions on hover/press
- **Buttery Animations** — GSAP + Framer Motion powered scroll, hover, and reveal animations
- **Space Theme** — Floating particles on a dark canvas for a cosmic vibe
- **Light & Dark Mode** — Full theme support with cheeky disclaimer toasts
- **Responsive** — Works across all screen sizes
- **Contact Form** — Email delivery via Resend
- **Publications** — Dedicated section and page for peer-reviewed work with modal details
- **Projects** — Dedicated `/projects` page with project showcases
- **Realtime** _(optional)_ — Live cursors, presence, and chat when `NEXT_PUBLIC_WS_URL` is set
- **Analytics** _(optional)_ — Umami analytics integration

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| **Framework** | Next.js 16, React 19, TypeScript |
| **Styling** | Tailwind CSS, SCSS modules, Radix UI, Aceternity UI |
| **Animation** | GSAP, Framer Motion |
| **3D** | Spline Runtime (@splinetool/react-spline) |
| **Email** | Resend |
| **Misc** | Lenis (smooth scroll), Zod, next-themes, Socket.io client (realtime) |

---

## 📁 Project Structure

```
myPortfolio/
├── public/
│   ├── assets/
│   │   ├── skills-keyboard.spline      # 3D keyboard scene
│   │   ├── keycap-sounds/              # Press/release sounds
│   │   ├── projects-screenshots/       # Project images
│   │   ├── nav-link-previews/          # Nav preview images
│   │   └── seo/                        # OG image, etc.
│   ├── 404.spline
│   └── ...
├── src/
│   ├── app/                            # Next.js App Router
│   │   ├── layout.tsx                  # Root layout, fonts, metadata, providers
│   │   ├── page.tsx                    # Home: hero, skills, experience, projects, publications, contact
│   │   ├── globals.css
│   │   ├── error.tsx
│   │   ├── not-found.tsx
│   │   ├── projects/page.tsx           # Projects page
│   │   └── api/
│   │       └── send/route.ts           # Resend contact form API
│   ├── components/
│   │   ├── header/                     # Nav, nav body, footer, config
│   │   ├── footer/
│   │   ├── sections/                   # hero, skills, experience, projects, publications, contact
│   │   ├── realtime/                   # remote-cursors, chat, online-users, Socket.io UI
│   │   ├── ui/                         # Button, card, dialog, toast, floating-dock, etc.
│   │   ├── radial-menu/
│   │   ├── theme/                      # Theme provider, funny-theme-toggle
│   │   ├── preloader/
│   │   ├── animated-background.tsx
│   │   ├── smooth-scroll.tsx
│   │   ├── ContactForm.tsx
│   │   └── ...
│   ├── data/
│   │   ├── config.ts                   # Site title, SEO, social links, author
│   │   ├── constants.ts                # SKILLS, work experience
│   │   └── projects.tsx                # Project definitions
│   ├── lib/                            # utils, lenis, skill-icons, avatar
│   ├── hooks/                          # use-mouse, use-media-query, use-throttle, use-devtools-open
│   ├── contexts/                       # socketio
│   ├── types/
│   └── utils/
├── .env.example
├── package.json
├── tailwind.config.ts
├── next.config.mjs
└── tsconfig.json
```

**Key entry points**

- **Home** (`src/app/page.tsx`) — Composes `SmoothScroll`, `AnimatedBackground`, and lazy-loaded sections: Hero, Skills, Experience, Projects, Publications, Contact.
- **Config** (`src/data/config.ts`) — Central place for site title, description, author, social links, and GitHub repo for the stars button.
- **Skills & keyboard** — `src/data/constants.ts` defines `SKILLS` and work experience; keycap names in the Spline file must match skill names in constants.

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- pnpm (recommended), npm, or yarn

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/sagarrgupta/myPortfolio.git
    cd myPortfolio
    ```

2. **Install dependencies:**

    ```bash
    pnpm install
    ```

3. **Set up environment variables:**

    Copy `.env.example` to `.env.local` and fill in the values:

    ```bash
    cp .env.example .env.local
    ```

    | Variable | Required | Description |
    |---|---|---|
    | `RESEND_API_KEY` | Yes | API key from [Resend](https://resend.com) for the contact form |
    | `NEXT_PUBLIC_WS_URL` | No | WebSocket server URL for realtime features (cursors, chat, presence) |
    | `UMAMI_DOMAIN` | No | Umami analytics script URL |
    | `UMAMI_SITE_ID` | No | Umami website ID |

4. **Run the development server:**

    ```bash
    pnpm dev
    ```

5. Open [http://localhost:3000](http://localhost:3000) and see the magic ✨

---

## 🎨 Make It Your Own

All personal info is centralized in [`src/data/config.ts`](src/data/config.ts). Edit this single file to rebrand the portfolio:

```ts
const config = {
  title: "Your Name | Your Title",
  description: {
    long: "Your long description for SEO...",
    short: "Your short description...",
  },
  keywords: ["your", "keywords"],
  author: "Your Name",
  email: "you@example.com",
  site: "https://yoursite.com",

  // GitHub stars button in the header
  githubUsername: "your-github-username",
  githubRepo: "your-repo-name",

  social: {
    twitter: "https://x.com/you",
    linkedin: "https://linkedin.com/in/you",
    instagram: "https://instagram.com/you",
    facebook: "https://facebook.com/you",
    github: "https://github.com/you",
  },
};
```

Other files you'll want to customize:

| File | What to change |
|---|---|
| `src/data/projects.tsx` | Your projects, screenshots, descriptions, and tech stacks |
| `src/data/constants.ts` | Skills list (name, description, icon) and work experience |
| `src/components/sections/publications.tsx` | Publication entries (title, link, publisher, skills) |
| `public/assets/` | Your images, OG image, and project screenshots |

---

## ⌨️ Updating the 3D Keyboard Skills

The 3D keyboard keycaps are baked into a Spline file. To update the skills displayed on the keyboard:

1. **Import** the `public/assets/skills-keyboard.spline` file into [Spline](https://spline.design/)
2. **Unhide** the keycap objects you want to edit
3. **Update** the logo images on each keycap to your new skill icons
4. **Rename** each keycap object to match the skill's `name` field in `src/data/constants.ts` (e.g. `js`, `react`, `docker`)
5. **Hide** all keycap objects again
6. **Export** the scene and overwrite `public/assets/skills-keyboard.spline`

After updating the Spline file, make sure `src/data/constants.ts` has matching entries for every skill on the keyboard:

```ts
// Each keycap object name in Spline must match a key in SKILLS
export const SKILLS: Record<SkillNames, Skill> = {
  js: { name: "js", label: "JavaScript", shortDescription: "...", ... },
  react: { name: "react", label: "React", shortDescription: "...", ... },
  // ... add/remove entries to match your keyboard
};
```

The `SkillNames` enum, `SKILLS` record, and the Spline keycap names must all stay in sync for the keyboard interactions to work correctly.

---

## 🔌 Realtime Features (Optional)

The portfolio supports optional realtime features powered by a **separate backend API**:

- 🖱️ **Live cursors** — See other visitors' cursors in realtime
- 👥 **Online presence** — Shows who's currently on the site
- 💬 **Chat** — Live chat between visitors

These features activate automatically when the `NEXT_PUBLIC_WS_URL` environment variable is set. Without it, the portfolio works perfectly fine as a static site — no realtime features, no backend dependency.

> [!NOTE]
> The backend API is **not open source**. This is intentional! Too many people have cloned the portfolio and claimed they built it from scratch. The realtime server stays private to keep the live experience unique make make it standout.


---

## 🚀 Deployment

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/sagarrgupta/myPortfolio)

This site is deployed on **Vercel**. To deploy your own:

1. Push your code to a GitHub repository
2. Connect the repository to [Vercel](https://vercel.com)
3. Add your environment variables in the Vercel dashboard
4. Vercel handles the rest — automatic deployments on every push

---

## 🤝 Contributing

If you'd like to contribute or suggest improvements, feel free to open an issue or submit a pull request. All contributions are welcome!

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

If you use this portfolio, a credit or link back to this [repo](https://github.com/sagarrgupta/myPortfolio) would be much appreciated ❤️
