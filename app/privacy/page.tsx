export default function PrivacyPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-12">
            <div className="space-y-4">
                <h1 className="text-4xl font-bold">Privacy Policy</h1>
                <p className="text-muted-foreground">Last updated: December 2, 2024</p>
            </div>

            <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">1. Introduction</h2>
                    <p>
                        Welcome to Authenticity Checker. We respect your privacy and are committed to protecting your personal data.
                        This privacy policy will inform you about how we look after your personal data when you visit our website
                        and tell you about your privacy rights.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">2. Information We Collect</h2>
                    <p>We may collect, use, store and transfer different kinds of personal data about you:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li><strong>Identity Data:</strong> Username, email address</li>
                        <li><strong>Technical Data:</strong> IP address, browser type, device information</li>
                        <li><strong>Usage Data:</strong> Information about how you use our website and services</li>
                        <li><strong>Content Data:</strong> Files and text you upload for analysis (processed in memory, not stored permanently)</li>
                    </ul>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">3. How We Use Your Information</h2>
                    <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>To provide and maintain our service</li>
                        <li>To analyze and improve our AI detection models</li>
                        <li>To communicate with you about service updates</li>
                        <li>To ensure the security of our platform</li>
                    </ul>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">4. Data Security</h2>
                    <p>
                        We have put in place appropriate security measures to prevent your personal data from being accidentally lost,
                        used or accessed in an unauthorized way. All data transmissions are encrypted using SSL/TLS protocols.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">5. Data Retention</h2>
                    <p>
                        We will only retain your personal data for as long as necessary to fulfill the purposes we collected it for.
                        Analysis history is stored locally in your browser and can be cleared at any time from your profile settings.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">6. Your Legal Rights</h2>
                    <p>Under certain circumstances, you have rights under data protection laws in relation to your personal data:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Request access to your personal data</li>
                        <li>Request correction of your personal data</li>
                        <li>Request erasure of your personal data</li>
                        <li>Object to processing of your personal data</li>
                        <li>Request restriction of processing your personal data</li>
                        <li>Request transfer of your personal data</li>
                        <li>Right to withdraw consent</li>
                    </ul>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">7. Third-Party Links</h2>
                    <p>
                        Our website may include links to third-party websites. Clicking on those links may allow third parties to
                        collect or share data about you. We do not control these third-party websites and are not responsible for
                        their privacy statements.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">8. Cookies</h2>
                    <p>
                        We use cookies and similar tracking technologies to track activity on our service. You can instruct your
                        browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept
                        cookies, you may not be able to use some portions of our service.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">9. Changes to This Privacy Policy</h2>
                    <p>
                        We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
                        Privacy Policy on this page and updating the "Last updated" date.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">10. Contact Us</h2>
                    <p>
                        If you have any questions about this Privacy Policy, please contact us at{" "}
                        <a href="mailto:privacy@authenticitychecker.com" className="text-primary hover:underline">
                            privacy@authenticitychecker.com
                        </a>
                    </p>
                </section>
            </div>
        </div>
    )
}
