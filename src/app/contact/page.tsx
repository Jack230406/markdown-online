import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - Markdown Online",
  description:
    "Get in touch with the Markdown Online team. We welcome your feedback, questions, and suggestions about our free online Markdown editor.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-6 text-3xl font-bold">Contact Us</h1>

      <div className="space-y-6 leading-relaxed" style={{ color: "var(--foreground)" }}>
        <p>
          Thank you for using Markdown Online. We value your feedback and are always looking for
          ways to improve your experience. Whether you have a question about how the editor works,
          a suggestion for a new feature, or you have encountered an issue while using the site,
          we would love to hear from you.
        </p>

        <h2 className="text-2xl font-semibold">Get in Touch</h2>
        <p>
          The best way to reach us is by email. Send your message
          to{" "}
          <a
            href="mailto:contact@markdownonline.com"
            className="text-primary underline"
          >
            contact@markdownonline.com
          </a>{" "}
          and we will get back to you as soon as possible. Please include a clear subject line so
          we can route your message to the right person on our team.
        </p>

        <h2 className="text-2xl font-semibold">Feature Requests and Suggestions</h2>
        <p>
          Markdown Online is built for its users, and your input directly shapes the direction of
          the product. If there is a feature you would like to see, a workflow improvement that
          would save you time, or a formatting option that is currently missing, let us know. We
          review every suggestion and prioritize changes based on community feedback. Some of our
          most popular features, including dark mode and the one-click HTML export, were originally
          suggested by users just like you.
        </p>

        <h2 className="text-2xl font-semibold">Bug Reports</h2>
        <p>
          If you have encountered a bug or something is not working as expected, we want to fix it.
          When reporting an issue, it helps to include the following details so we can reproduce and
          resolve the problem quickly:
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>A description of what happened and what you expected to happen</li>
          <li>The browser and operating system you were using</li>
          <li>Steps to reproduce the issue, if possible</li>
          <li>Any error messages or unusual behavior you noticed</li>
        </ul>
        <p>
          Detailed reports help us identify the root cause faster and ship a fix sooner. Even if
          you are not sure whether something is a bug, feel free to reach out. We would rather
          hear about a potential issue than miss a real one.
        </p>

        <h2 className="text-2xl font-semibold">General Inquiries</h2>
        <p>
          For general questions about Markdown Online, including how the editor works, what
          technologies we use, or how your data is handled, you are welcome to email us or visit
          our{" "}
          <a href="/about/" className="text-primary underline">About</a> and{" "}
          <a href="/privacy/" className="text-primary underline">Privacy Policy</a> pages for
          more information. We are committed to transparency and are happy to answer any questions
          about how the site operates.
        </p>

        <h2 className="text-2xl font-semibold">Response Time</h2>
        <p>
          We are a small team, but we do our best to respond to every message within a few business
          days. If your matter is urgent, please indicate that in your subject line and we will
          prioritize it accordingly. We appreciate your patience and your support in helping us
          make Markdown Online better for everyone.
        </p>
      </div>

      {/* Ad placeholder */}
      <div className="ad-placeholder mt-12 flex items-center justify-center rounded border py-8 text-xs" style={{ borderColor: "var(--border)", color: "var(--muted)" }}>
        {/* AdSense content ad slot */}
      </div>
    </div>
  );
}