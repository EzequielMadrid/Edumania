import UploadForm from "@/components/UploadForm";

const Page = () => {
  return (
    <main className="new-book-wrapper">
        <section className="new-book-section">
            <h1 className="new-book-title">Get Started</h1>
            <p className="new-book-description">
                Drop your Book(.PDF) and unlock a smarter, interactive way to read. Make them interactive, and easier to explore.
            </p>
      </section>
        <UploadForm/>
    </main>
  );
};

export default Page;
