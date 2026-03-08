import { SOCIAL_LINKS } from "@/data/social-links";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="site-footer-links">
          {SOCIAL_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
            >
              {label}
            </a>
          ))}
          <a href="/feed.xml" target="_blank" rel="noopener noreferrer">
            RSS
          </a>
        </div>
        <p>
          &copy; {year} Jimmy&apos;s Blog
        </p>
      </div>
    </footer>
  );
}
