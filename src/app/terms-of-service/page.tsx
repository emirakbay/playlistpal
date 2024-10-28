export default async function TermsOfService() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Terms of Service</h1>
      <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>

      <section className="mb-6">
        <h2 className="mb-3 text-2xl font-semibold">1. Acceptance of Terms</h2>
        <p>
          By accessing or using PlaylistPal (referred to as &quot;the
          App&quot;), you agree to comply with and be bound by these Terms of
          Service. If you do not agree, please do not use the App.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="mb-3 text-2xl font-semibold">
          2. Description of Service
        </h2>
        <p>
          PlaylistPal is a web-based application that integrates with Spotify to
          provide personalized playlist recommendations and listening analytics.
          The App uses Spotify&apos;s API and requires users to log in with
          their Spotify account.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="mb-3 text-2xl font-semibold">3. Eligibility</h2>
        <p>To use the App, you must:</p>
        <ul className="mb-2 ml-4 list-inside list-disc">
          <li>
            Be at least 13 years old (or meet the minimum age requirement in
            your jurisdiction)
          </li>
          <li>Have a valid Spotify account</li>
          <li>Agree to comply with these Terms of Service</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="mb-3 text-2xl font-semibold">4. Account and Access</h2>
        <h3 className="mb-2 text-xl font-semibold">a. Spotify Login</h3>
        <p>
          You may need to log in with your Spotify account to use the App&apos;s
          features. By logging in, you authorize us to access certain Spotify
          account information as permitted by Spotify&apos;s API, such as
          playlists or listening history.
        </p>
        <h3 className="mb-2 mt-3 text-xl font-semibold">b. Account Security</h3>
        <p>
          You are responsible for maintaining the security of your Spotify
          account. We are not responsible for any unauthorized access to your
          account due to negligence.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="mb-3 text-2xl font-semibold">5. Acceptable Use</h2>
        <p>By using the App, you agree not to:</p>
        <ul className="mb-2 ml-4 list-inside list-disc">
          <li>
            Violate any applicable local, state, national, or international law
          </li>
          <li>Attempt to decompile, reverse engineer, or hack the App</li>
          <li>
            Use the App for any commercial purpose without our express
            permission
          </li>
          <li>
            Use or distribute any unauthorized or harmful code, including
            viruses or malware
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="mb-3 text-2xl font-semibold">
          6. Spotify API and Data Usage
        </h2>
        <p>
          PlaylistPal uses the Spotify API to retrieve and display Spotify data
          for logged-in users. You acknowledge and agree that:
        </p>
        <ul className="mb-2 ml-4 list-inside list-disc">
          <li>
            You are subject to Spotify&apos;s Terms of Service in addition to
            our Terms when using the App.
          </li>
          <li>
            We have limited access to your Spotify data, which we only use to
            provide App functionality.
          </li>
          <li>
            Any revocation of access to the Spotify API may affect your
            experience with the App.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="mb-3 text-2xl font-semibold">
          7. Intellectual Property
        </h2>
        <h3 className="mb-2 text-xl font-semibold">a. Ownership</h3>
        <p>
          All content, features, and functionality on the App (such as text,
          images, and code) are the exclusive property of PlaylistPal Inc.
          and/or its licensors.
        </p>
        <h3 className="mb-2 mt-3 text-xl font-semibold">b. Restrictions</h3>
        <p>
          You may not copy, reproduce, distribute, or create derivative works
          from any part of the App without prior written permission.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="mb-3 text-2xl font-semibold">8. Termination</h2>
        <p>
          We may terminate or suspend your access to the App at any time,
          without notice, if we determine you have violated these Terms of
          Service or if it&apos;s necessary to protect our rights, comply with
          legal requirements, or maintain the App&apos;s integrity.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="mb-3 text-2xl font-semibold">
          9. Limitation of Liability
        </h2>
        <p>To the fullest extent permitted by law:</p>
        <ul className="mb-2 ml-4 list-inside list-disc">
          <li>
            PlaylistPal Inc. and its affiliates shall not be liable for any
            indirect, incidental, special, or consequential damages arising from
            your use of or inability to use the App.
          </li>
          <li>
            Our total liability to you for any claim arising out of or relating
            to these Terms or the App is limited to the amount, if any, paid by
            you to use the App.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="mb-3 text-2xl font-semibold">
          10. Changes to Terms of Service
        </h2>
        <p>
          We reserve the right to modify these Terms at any time. When we make
          changes, we will update the &ldquo;Last updated&rdquo; date and notify
          you of any significant modifications. Your continued use of the App
          after changes are posted constitutes your acceptance of the new Terms.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="mb-3 text-2xl font-semibold">11. Governing Law</h2>
        <p>
          These Terms are governed by and construed in accordance with the laws
          of the State of California, without regard to conflict of law
          principles.
        </p>
      </section>
    </div>
  );
}
