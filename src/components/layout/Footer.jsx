import { SITE } from '../../constants/site'

export default function Footer({ version = 'v0.1.0' }) {
  return (
    // Extra bottom padding on phones so this content clears the fixed
    // BottomNav tab bar instead of being hidden under it when scrolled down.
    <footer className="border-t border-slate-800 bg-slate-900 pt-4 pb-20 md:pb-4">
      <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 text-xs text-slate-400">
        <span>{SITE.copyright}</span>
        <span>
          Emergency numbers do not replace the emergency services — SAPS 10111 · Ambulance 10177 · GBV Command
          Centre 0800 428 428 · {version}
        </span>
      </div>
    </footer>
  )
}
