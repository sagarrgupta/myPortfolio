export interface Link {
  title: string;
  href: string;
  thumbnail: string;
  /** Light mode preview; used when theme is light */
  thumbnailLight?: string;
  target?: string;
}
