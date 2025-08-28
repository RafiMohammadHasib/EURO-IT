import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import TopBar from "@/components/layout/top-bar";

export default function PrivacyPolicyPage() {
  return (
    <div className="relative flex flex-col min-h-screen bg-background">
      <div className="relative z-10 flex flex-col flex-1">
        <TopBar />
        <Header />
        <main className="px-4 sm:px-6 lg:px-8 flex-grow pt-32">
          <div className="section-container glass-card p-8 md:p-12">
            <h1 className="text-4xl md:text-5xl font-bold glow-text mb-8">Privacy Policy</h1>
            <div className="prose prose-invert text-muted-foreground max-w-none space-y-4">
              <p>Last updated: [Date]</p>
              <p>
                EURO IT ("us", "we", or "our") operates the [Your Website URL] website (the "Service"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
              </p>

              <h2 className="text-2xl font-bold text-white mt-6">Information Collection and Use</h2>
              <p>
                We collect several different types of information for various purposes to provide and improve our Service to you.
              </p>

              <h3 className="text-xl font-bold text-white mt-4">Types of Data Collected</h3>
              <h4>Personal Data</h4>
              <p>
                While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). Personally identifiable information may include, but is not limited to:
              </p>
              <ul>
                <li>Email address</li>
                <li>First name and last name</li>
                <li>Phone number</li>
                <li>Cookies and Usage Data</li>
              </ul>

              <h2 className="text-2xl font-bold text-white mt-6">Use of Data</h2>
              <p>EURO IT uses the collected data for various purposes:</p>
              <ul>
                <li>To provide and maintain the Service</li>
                <li>To notify you about changes to our Service</li>
                <li>To allow you to participate in interactive features of our Service when you choose to do so</li>
                <li>To provide customer care and support</li>
                <li>To provide analysis or valuable information so that we can improve the Service</li>
                <li>To monitor the usage of the Service</li>
                <li>To detect, prevent and address technical issues</li>
              </ul>

              <h2 className="text-2xl font-bold text-white mt-6">Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us by email: euroitofficial@gmail.com
              </p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
