export default async function CookiePolicy() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Cookies Policy</h1>
      <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>

      <section className="mb-6">
        <h2 className="mb-3 text-2xl font-semibold">1. Introduction</h2>
        <p>
          PlaylistPal (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;)
          uses cookies and similar technologies to enhance your experience on
          our web app. This Cookies Policy explains what cookies are, the types
          of cookies we use, and how you can control them.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="mb-3 text-2xl font-semibold">2. What Are Cookies?</h2>
        <p>
          Cookies are small text files placed on your device (computer, tablet,
          or mobile) by websites you visit. They store information about your
          browsing activity, which helps enhance your experience and provides
          insights for site improvements.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="mb-3 text-2xl font-semibold">
          3. Types of Cookies We Use
        </h2>
        <h3 className="mb-2 mt-4 text-xl font-medium">a. Essential Cookies</h3>
        <p>
          These cookies are necessary for the web app to function correctly and
          provide features such as user authentication and secure access.
          Without these cookies, some parts of the app may not be accessible.
        </p>
        <h3 className="mb-2 mt-4 text-xl font-medium">b. Functional Cookies</h3>
        <p>
          Functional cookies help improve your experience by remembering your
          preferences, such as language settings or previous interactions with
          the app. They make your experience more personalized and efficient.
        </p>
        <h3 className="mb-2 mt-4 text-xl font-medium">
          c. Performance and Analytics Cookies
        </h3>
        <p>
          These cookies collect data on how users interact with the app, such as
          which pages are most visited and how long users spend on each page.
          This information helps us improve app performance and optimize user
          experience.
        </p>
        <h3 className="mb-2 mt-4 text-xl font-medium">
          d. Third-Party Cookies
        </h3>
        <p>
          Our app may use third-party cookies from services like Spotify to
          provide authentication and integrate with Spotify&apos;s API. These
          cookies are managed by third-party providers and may track user
          activity on our app and other websites.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="mb-3 text-2xl font-semibold">
          4. Managing Your Cookies
        </h2>
        <p>
          You have the right to accept or decline cookies. Most web browsers
          allow you to manage cookie preferences via browser settings, including
          removing or blocking cookies.
        </p>
        <p className="mt-2">To Manage Cookies:</p>
        <ul className="ml-4 list-inside list-disc">
          <li>
            <strong>Browser Settings:</strong> You can adjust your cookie
            settings in your browser to remove or prevent cookies. Please refer
            to your browser&apos;s help section for detailed instructions.
          </li>
          <li>
            <strong>Opt-Out Options:</strong> For specific analytics cookies,
            you may be able to opt out directly through services like Google
            Analytics. Visit their opt-out page for more information.
          </li>
        </ul>
        <p className="mt-2">
          Please note that if you disable or refuse cookies, certain features of
          the app may become inaccessible or not function correctly.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="mb-3 text-2xl font-semibold">
          5. Changes to Our Cookies Policy
        </h2>
        <p>
          We may update this Cookies Policy from time to time. We will notify
          you of any significant changes by updating the &quot;Last
          updated&quot; date and, if necessary, seeking your consent for any
          material changes.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="mb-3 text-2xl font-semibold">6. Contact Us</h2>
        <p>
          If you have any questions or concerns about our Cookies Policy, please
          contact us at:
        </p>
        <p className="mt-2">info@playlistpal.app</p>
      </section>
    </div>
  );
}
