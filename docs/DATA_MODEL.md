# Data Model & Content Schemas

Semua data konten dikelola dalam bentuk file terpisah (JSON, TS, atau MDX frontmatter) di folder `data/`.

## 1. Project Schema (`data/projects/*.mdx` atau `.json`)

```typescript
export interface ProjectItem {
  slug: string;
  title: Record<'id' | 'en', string>;
  description: Record<'id' | 'en', string>;
  featured: boolean;
  order: number;
  tags: string[];          // e.g. ['web', 'security', 'mobile']
  status: 'completed' | 'wip';
  links: {
    demo?: string;
    repo?: string;
  };
  metrics?: {
    label: string;
    value: string;
  }[];
  // Detail studi kasus ada di body MDX:
  // - Masalah (Problem Statement)
  // - Peran (My Role)
  // - Keputusan Teknis (Architectural Decisions)
  // - Hasil (Outcomes & Screenshots)
}
```

## 2. Writing Schema (`data/writing/[slug]/[locale].mdx`)

Sesuai FR-25, satu tulisan boleh memiliki satu bahasa saja.

```typescript
export interface WritingFrontmatter {
  title: string;
  publishedAt: string;     // ISO Date: 'YYYY-MM-DD'
  summary: string;
  tags: string[];
  lang: 'id' | 'en';
  readingTimeMinutes: number;
  alternateSlug?: string;  // Slug versi bahasa seberang jika tersedia
}
```

## 3. Experience Schema (`data/experience.json`)

```typescript
export interface ExperienceItem {
  id: string;
  role: Record<'id' | 'en', string>;
  organization: string;
  period: {
    start: string;
    end: string | 'present';
  };
  type: 'internship' | 'organization' | 'committee' | 'certification';
  highlights: Record<'id' | 'en', string[]>;
}
```

## 4. Skills Schema (`data/skills.json`)

```typescript
export interface SkillCategory {
  category: Record<'id' | 'en', string>;
  items: {
    name: string;
    level?: 'core' | 'familiar' | 'learning';
    icon?: string;
  }[];
}
```

## 5. Site Configuration Schema (`data/site-config.json`)

```typescript
export interface SiteConfig {
  ownerName: string;
  status: {
    id: string;            // e.g. "Terbuka untuk peluang magang"
    en: string;            // e.g. "Open to internship opportunities"
    type: 'available' | 'busy';
  };
  cv: {
    idPath: string;        // Path file PDF versi Indonesia
    enPath: string;        // Path file PDF versi English
  };
  socialLinks: {
    github: string;
    linkedin: string;
    emailUser: string;     // Bagian depan username email untuk obfuscation
    emailDomain: string;   // Domain email
  };
}
```
