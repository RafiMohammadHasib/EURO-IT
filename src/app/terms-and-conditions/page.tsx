import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import TopBar from "@/components/layout/top-bar";

export default function TermsAndConditionsPage() {
  return (
    <div className="relative flex flex-col min-h-screen bg-background">
      <div className="relative z-10 flex flex-col flex-1">
        <TopBar />
        <Header />
        <main className="px-4 sm:px-6 lg:px-8 flex-grow pt-32">
          <div className="section-container glass-card p-8 md:p-12">
            <h1 className="text-4xl md:text-5xl font-bold glow-text mb-8">Terms and Conditions</h1>
            <div className="prose prose-invert text-muted-foreground max-w-none space-y-4">
              <p>Last updated: [Date]</p>
              <p>
                Please read these terms and conditions carefully before using Our Service.
              </p>

              <h2 className="text-2xl font-bold text-white mt-6">Interpretation and Definitions</h2>
              <p>
                The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.
              </p>

              <h2 className="text-2xl font-bold text-white mt-6">Acknowledgement</h2>
              <p>
                These are the Terms and Conditions governing the use of this Service and the agreement that operates between You and the Company. These Terms and Conditions set out the rights and obligations of all users regarding the use of the Service.
              </p>
              <p>
                Your access to and use of the Service is conditioned on Your acceptance of and compliance with these Terms and Conditions. These Terms and Conditions apply to all visitors, users and others who access or use the Service.
              </p>

              <h2 className="text-2xl font-bold text-white mt-6">Links to Other Websites</h2>
              <p>
                Our Service may contain links to third-party web sites or services that are not owned or controlled by the Company. The Company has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services. You further acknowledge and agree that the Company shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods or services available on or through any such web sites or services.
              </p>

              <h2 className="text-2xl font-bold text-white mt-6">Governing Law</h2>
              <p>
                The laws of the Country, excluding its conflicts of law rules, shall govern this Terms and Your use of the Service. Your use of the Application may also be subject to other local, state, national, or international laws.
              </p>

              <h2 className="text-2xl font-bold text-white mt-6">Contact Us</h2>
              <p>
                If you have any questions about these Terms and Conditions, You can contact us by email: euroitofficial@gmail.com
              </p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
