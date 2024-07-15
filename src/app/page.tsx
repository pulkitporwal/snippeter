import Navbar from "@/GlobalComponents/Navbar";
import { mainColor } from "../../Colors";

export default function Home() {
    return (
        <div>
            <Navbar />
            <CTASection />
        </div>
    );
}

const CTASection = () => {
    return (
        <div className="py-12 sm:mt-[120px] px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-xl poppins-bold text-white sm:text-4xl">
                    Organize Your Code Snippets{" "}
                    <span style={{ color: mainColor }}>Efficiently!</span>
                </h2>
                <p className="mt-4 text-lg text-gray-500">
                    With our advanced tagging and search features, you can
                    quickly find the snippet you need, right when you need it.
                    Spend less time searching for code and more time writing it.
                </p>
                <div className="mt-8">
                    <button
                        className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-black hover:opacity-80 "
                        style={{ backgroundColor: mainColor }}
                    >
                        Let's get started
                    </button>
                </div>
                <div className="mt-8">
                    <img src="/banner.png" alt="Banner" className="w-full max-w-6xl mx-auto" />
                </div>
            </div>
        </div>
    );
};
