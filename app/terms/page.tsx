export default function TermsPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-12">
            <div className="space-y-4">
                <h1 className="text-4xl font-bold">Terms of Service</h1>
                <p className="text-muted-foreground">Last updated: December 2, 2024</p>
            </div>

            <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">1. Agreement to Terms</h2>
                    <p>
                        By accessing and using Authenticity Checker, you accept and agree to be bound by the terms and provision
                        of this agreement. If you do not agree to abide by the above, please do not use this service.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">2. Use License</h2>
                    <p>
                        Permission is granted to temporarily use Authenticity Checker for personal, non-commercial transitory viewing only.
                        This is the grant of a license, not a transfer of title, and under this license you may not:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Modify or copy the materials</li>
                        <li>Use the materials for any commercial purpose or for any public display</li>
                        <li>Attempt to reverse engineer any software contained on Authenticity Checker</li>
                        <li>Remove any copyright or other proprietary notations from the materials</li>
                        <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
                    </ul>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">3. Service Description</h2>
                    <p>
                        Authenticity Checker provides AI-powered content detection services. We analyze text, images, and videos
                        to determine the likelihood of AI generation. Our service is provided "as is" and we make no guarantees
                        about accuracy or availability.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">4. User Accounts</h2>
                    <p>
                        When you create an account with us, you must provide accurate, complete, and current information.
                        Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account.
                    </p>
                    <p>
                        You are responsible for safeguarding the password that you use to access the service and for any activities
                        or actions under your password.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">5. Content Upload and Analysis</h2>
                    <p>By uploading content to Authenticity Checker, you agree that:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>You own or have the right to upload and analyze the content</li>
                        <li>The content does not violate any third-party rights</li>
                        <li>The content does not contain illegal or harmful material</li>
                        <li>We may process your content to improve our detection models (unless you opt out)</li>
                    </ul>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">6. Acceptable Use</h2>
                    <p>You agree not to use Authenticity Checker to:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Violate any laws or regulations</li>
                        <li>Infringe on intellectual property rights</li>
                        <li>Upload viruses or malicious code</li>
                        <li>Attempt to gain unauthorized access to our systems</li>
                        <li>Interfere with or disrupt the service</li>
                        <li>Use the service for any unlawful or fraudulent purpose</li>
                    </ul>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">7. Disclaimer</h2>
                    <p>
                        The materials on Authenticity Checker are provided on an 'as is' basis. Authenticity Checker makes no
                        warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without
                        limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or
                        non-infringement of intellectual property or other violation of rights.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">8. Limitations</h2>
                    <p>
                        In no event shall Authenticity Checker or its suppliers be liable for any damages (including, without limitation,
                        damages for loss of data or profit, or due to business interruption) arising out of the use or inability to
                        use the materials on Authenticity Checker.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">9. Accuracy of Results</h2>
                    <p>
                        While we strive for high accuracy in our AI detection, no system is perfect. Results should be used as one
                        indicator among many and should not be relied upon as definitive proof. We are not responsible for decisions
                        made based on our analysis.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">10. Modifications</h2>
                    <p>
                        Authenticity Checker may revise these terms of service at any time without notice. By using this service,
                        you are agreeing to be bound by the then current version of these terms of service.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">11. Termination</h2>
                    <p>
                        We may terminate or suspend your account and bar access to the service immediately, without prior notice or
                        liability, under our sole discretion, for any reason whatsoever, including without limitation if you breach
                        the Terms.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">12. Governing Law</h2>
                    <p>
                        These Terms shall be governed and construed in accordance with the laws of your jurisdiction, without regard
                        to its conflict of law provisions.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">13. Contact Information</h2>
                    <p>
                        If you have any questions about these Terms, please contact us at{" "}
                        <a href="mailto:legal@authenticitychecker.com" className="text-primary hover:underline">
                            legal@authenticitychecker.com
                        </a>
                    </p>
                </section>
            </div>
        </div>
    )
}
