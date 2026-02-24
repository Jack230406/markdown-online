import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for Markdown Online. Learn how we handle your data, cookies, and third-party services like Google Analytics and AdSense.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-6 text-3xl font-bold">Privacy Policy</h1>
      <p className="mb-4 text-sm" style={{ color: "var(--muted)" }}>
        Last updated: February 2026
      </p>

      <div className="space-y-6 leading-relaxed" style={{ color: "var(--foreground)" }}>
        <p>
          At Markdown Online (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), we are committed
          to protecting your privacy. This Privacy Policy explains how we collect, use, and
          safeguard information when you visit our website at markdownonline.com (the
          &quot;Site&quot;). By using the Site, you agree to the practices described in this policy.
        </p>

        <h2 className="text-2xl font-semibold">Information We Collect</h2>
        <p>
          Markdown Online is designed with privacy in mind. The editor runs entirely in your
          browser, and we do not collect, store, or transmit any of the content you write. Your
          Markdown documents are saved only in your browser&apos;s local storage on your own device.
        </p>
        <p>
          However, we may collect certain non-personal information automatically when you visit
          the Site, including:
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>Browser type and version</li>
          <li>Operating system</li>
          <li>Referring website</li>
          <li>Pages visited and time spent on the Site</li>
          <li>Approximate geographic location (country/region level)</li>
          <li>Device type (desktop, mobile, tablet)</li>
        </ul>

        <h2 className="text-2xl font-semibold">Cookies and Tracking Technologies</h2>
        <p>
          We use cookies and similar tracking technologies to improve your experience on the Site.
          Cookies are small text files stored on your device by your browser. We use the following
          types of cookies:
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>Essential Cookies:</strong> Required for the Site to function properly, such as
            remembering your dark mode preference.
          </li>
          <li>
            <strong>Analytics Cookies:</strong> Used by Google Analytics to help us understand how
            visitors interact with the Site. These cookies collect information anonymously.
          </li>
          <li>
            <strong>Advertising Cookies:</strong> Used by Google AdSense to display relevant
            advertisements. These cookies may track your browsing activity across different websites.
          </li>
        </ul>
        <p>
          You can control cookies through your browser settings. Most browsers allow you to block
          or delete cookies. However, disabling cookies may affect the functionality of the Site.
        </p>

        <h2 className="text-2xl font-semibold">Google Analytics</h2>
        <p>
          We use Google Analytics to analyze traffic and usage patterns on the Site. Google Analytics
          uses cookies to collect anonymous information about how visitors use the Site. The
          information generated is transmitted to and stored by Google on servers in the United
          States. Google may use this data to contextualize and personalize ads within its own
          advertising network. For more information, visit Google&apos;s Privacy Policy.
        </p>

        <h2 className="text-2xl font-semibold">Google AdSense</h2>
        <p>
          We use Google AdSense to display advertisements on the Site. Google AdSense uses cookies
          to serve ads based on your prior visits to this Site and other websites. Google&apos;s use
          of advertising cookies enables it and its partners to serve ads based on your browsing
          history. You may opt out of personalized advertising by visiting Google&apos;s Ads
          Settings.
        </p>

        <h2 className="text-2xl font-semibold">Local Storage</h2>
        <p>
          The Site uses your browser&apos;s local storage to save your Markdown content
          automatically. This data is stored entirely on your device and is never transmitted to
          our servers or any third party. You can clear this data at any time through your
          browser&apos;s settings.
        </p>

        <h2 className="text-2xl font-semibold">Third-Party Links</h2>
        <p>
          The Site may contain links to third-party websites. We are not responsible for the
          privacy practices or content of those websites. We encourage you to review the privacy
          policies of any third-party sites you visit.
        </p>

        <h2 className="text-2xl font-semibold">Children&apos;s Privacy</h2>
        <p>
          The Site is not directed at children under the age of 13. We do not knowingly collect
          personal information from children. If you believe a child has provided us with personal
          information, please contact us so we can take appropriate action.
        </p>

        <h2 className="text-2xl font-semibold">Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Any changes will be posted on this
          page with an updated revision date. We encourage you to review this policy periodically
          to stay informed about how we protect your information.
        </p>

        <h2 className="text-2xl font-semibold">Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please visit
          our <a href="/contact/" className="text-primary underline">Contact page</a>.
        </p>
      </div>

      {/* Ad placeholder */}
      <div className="ad-placeholder mt-12 flex items-center justify-center rounded border py-8 text-xs" style={{ borderColor: "var(--border)", color: "var(--muted)" }}>
        {/* AdSense content ad slot */}
      </div>
    </div>
  );
}
