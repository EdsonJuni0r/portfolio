/** Resolve um arquivo de `public/` respeitando a base configurada no Vite. */
export function assetPath(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`
}
