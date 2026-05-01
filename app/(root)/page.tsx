import {sampleBooks} from "@/lib/constants";

import Hero from "@/components/Hero/Hero";
import BookCard from "@/components/BookCard";

const Page = () => {
    return (
        <main className="wrapper container ">
            <Hero />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10">
                {sampleBooks.map((book) => (
                    <BookCard key={book._id} title={book.title} author={book.author} coverURL={book.coverURL} slug={book.slug} authorImageURL={book.authorImageURL}/>
                ))}
            </div>
        </main>
    )
}
export default Page
