import React from "react";
import { Link } from '@inertiajs/react';

export default function TermsOfUse() {
  return (
    <div className="container-custom py-16">
      <h1 className="text-4xl font-bold mb-8">Terms of Use</h1>
      <p className="mb-4">
        Welcome to <strong>Only Employees</strong>. By accessing or using our platform, you agree to comply with and be bound by the following terms and conditions. Please read them carefully.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
      <p className="mb-4">
        By using our platform, you agree to these Terms of Use. If you do not agree, you may not use the platform.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">2. Use of the Platform</h2>
      <p className="mb-4">
        You agree to use the platform only for lawful purposes and in a way that does not infringe on the rights of others or restrict their use of the platform. Prohibited activities include, but are not limited to:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>Submitting false or misleading information.</li>
        <li>Attempting to gain unauthorized access to the platform or its data.</li>
        <li>Using the platform for any illegal or harmful activities.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">3. User-Generated Content</h2>
      <p className="mb-4">
        By submitting content to the platform, you grant us a non-exclusive, royalty-free, perpetual, and worldwide license to use, modify, and display your content. You are solely responsible for the content you submit and must ensure it does not violate any laws or third-party rights.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">4. Privacy</h2>
      <p className="mb-4">
        Your use of the platform is also governed by our <Link href="/privacy-policy" className="text-primary underline">Privacy Policy</Link>. Please review it to understand how we collect, use, and protect your information.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">5. Disclaimer of Warranties</h2>
      <p className="mb-4">
        The platform is provided "as is" and "as available" without any warranties, express or implied. We do not guarantee the accuracy, completeness, or reliability of the information provided on the platform.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">6. Limitation of Liability</h2>
      <p className="mb-4">
        To the fullest extent permitted by law, we shall not be liable for any damages arising from your use of the platform, including but not limited to direct, indirect, incidental, or consequential damages.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">7. Changes to the Terms</h2>
      <p className="mb-4">
        We reserve the right to update these Terms of Use at any time. Any changes will be posted on this page with an updated effective date. Your continued use of the platform after changes are made constitutes your acceptance of the updated terms.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">8. Governing Law</h2>
      <p className="mb-4">
        These Terms of Use are governed by and construed in accordance with the laws of your jurisdiction. Any disputes arising from these terms shall be resolved in the courts of your jurisdiction.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">9. Contact Us</h2>
      <p className="mb-4">
        If you have any questions or concerns about these Terms of Use, please contact us at{" "}
        <a href="mailto:contact@onlyemployees.io" className="text-primary underline">
          contact@onlyemployees.io
        </a>.
      </p>

      <p className="mt-8 text-sm text-muted-foreground">
        <em>Last Edited: May 8, 2025</em>
      </p>
    </div>
  );
}