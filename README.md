# Upright Solutions Website

A premium, futuristic corporate website for Upright Solutions and Systems Consultancy Corp., built with Next.js 16, TypeScript, and Tailwind CSS 4.

## 🚀 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com)
- **Fonts**: [Sora](https://fonts.google.com/specimen/Sora) (Headings), [Outfit](https://fonts.google.com/specimen/Outfit) (Body)
- **Icons**: [Lucide React](https://lucide.dev)

## 📂 Project Structure

```
├── app/                  # Next.js App Router pages
│   ├── globals.css       # Global styles & Tailwind theme
│   ├── layout.tsx        # Root layout with fonts & providers
│   └── page.tsx          # Homepage composition
├── components/
│   ├── layout/           # Header, Footer
│   ├── sections/         # Page-specific sections (Hero, Services, etc.)
│   └── ui/               # Reusable UI components (Button, Typography)
├── config/               # Structured content & configuration
│   ├── company.ts        # Company info (History, Services, CEO)
│   └── site.ts           # Site-wide config (Nav, SEO)
├── lib/                  # Utilities (cn, etc.)
└── public/               # Static assets
```

## 🛠️ Getting Started

1.  **Install dependencies**:

    ```bash
    npm install
    ```

2.  **Run the development server**:

    ```bash
    npm run dev
    ```

3.  **Open the browser**:
    Navigate to [http://localhost:3000](http://localhost:3000) to view the site.

## 🎨 Design System

- **Colors**:

  - Primary Yellow: `#F2D04E`
  - Primary Blue: `#0000a1`
  - Dark Background: `#24221B`
  - Light Beige: `#e4dfd8`

- **Typography**:
  - Headings: `Sora`
  - Body: `Outfit`

## 📝 Content Management

Content is decoupled from the UI and stored in `config/company.ts`. To update company information, services, or CEO details, simply edit this file.
