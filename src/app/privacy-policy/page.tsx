export default async function PrivacyPolicy() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Privacy Policy</h1>
      <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>

      <section className="mb-6">
        <h2 className="mb-3 text-2xl font-semibold">1. Introduction</h2>
        <p>
          Welcome to PlaylistPal. Your privacy is very important to us. This
          Privacy Policy outlines how we collect, use, and protect your personal
          information when you use our web app, which utilizes the Spotify API
          and Spotify Login for user authentication.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="mb-3 text-2xl font-semibold">
          2. Information We Collect
        </h2>
        <h3 className="mb-2 text-xl font-medium">
          a. Personal Information from Spotify
        </h3>
        <p>
          When you log in using Spotify, we collect certain personal information
          as authorized by you via the Spotify Login. This may include:
        </p>
        <ul className="mb-2 ml-4 list-inside list-disc">
          <li>Your Spotify username</li>
          <li>Profile details (e.g., display name, profile image)</li>
          <li>
            Spotify account data such as playlists, listening history, or top
            artists (depending on permissions granted)
          </li>
        </ul>
        <h3 className="mb-2 text-xl font-medium">b. Usage Data</h3>
        <p>
          We may also collect data on how you interact with our app, including:
        </p>
        <ul className="mb-2 ml-4 list-inside list-disc">
          <li>Pages viewed, clicks, and actions taken</li>
          <li>Time spent on the app</li>
        </ul>
        <h3 className="mb-2 text-xl font-medium">c. Device Information</h3>
        <p>We may collect technical information such as:</p>
        <ul className="ml-4 list-inside list-disc">
          <li>Browser type and version</li>
          <li>Operating system and device information</li>
          <li>IP address and location data (if applicable)</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="mb-3 text-2xl font-semibold">
          3. How We Use Your Information
        </h2>
        <p>We use the collected data to:</p>
        <ul className="mb-2 ml-4 list-inside list-disc">
          <li>Personalize your experience on PlaylistPal</li>
          <li>
            Enable Spotify-based features such as playlist recommendations or
            music playback
          </li>
          <li>Improve app performance and troubleshoot issues</li>
          <li>Analyze usage patterns to enhance features</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="mb-3 text-2xl font-semibold">
          4. Data Sharing and Disclosure
        </h2>
        <p>
          We do not sell, rent, or lease your personal information to third
          parties. However, we may share your data:
        </p>
        <ul className="mb-2 ml-4 list-inside list-disc">
          <li>
            With service providers who help us operate PlaylistPal (e.g.,
            analytics services)
          </li>
          <li>If required by law or in response to a lawful request</li>
          <li>
            To enforce our Terms of Service or protect the rights, property, and
            safety of PlaylistPal or users
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="mb-3 text-2xl font-semibold">5. Data Security</h2>
        <p>
          We take reasonable measures to protect your data from unauthorized
          access, alteration, or destruction. However, no internet-based
          application is completely secure, so we cannot guarantee absolute
          security.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="mb-3 text-2xl font-semibold">
          6. Your Choices and Rights
        </h2>
        <p>
          Depending on your jurisdiction, you may have the following rights
          concerning your personal data:
        </p>
        <ul className="mb-2 ml-4 list-inside list-disc">
          <li>Access: Request a copy of the data we have about you</li>
          <li>Correction: Request that we correct any inaccurate data</li>
          <li>Deletion: Request deletion of your data</li>
          <li>
            Revoke Spotify Access: You can disconnect PlaylistPal&apos;s access
            to your Spotify account at any time via your Spotify account
            settings
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="mb-3 text-2xl font-semibold">
          7. Changes to This Privacy Policy
        </h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify
          you of any significant changes by
        </p>
      </section>

      <section className="mb-6">
        <h2 className="mb-3 text-2xl font-semibold">8. Contact Us</h2>
        <p>
          If you have any questions or concerns about this Privacy Policy,
          please contact us at:
        </p>
        <p>Email: info@playlistpal.com</p>
      </section>
    </div>
  );
}
