
import { motion } from "framer-motion";
import TextAnimation from "../ui/TextAnimation";

const ContactForm = () => {
    return (
        <section className="w-full min-h-screen dark:bg-zinc-950 flex flex-col px-4 md:px-6 lg:px-0">
            <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-4 items-stretch">

                {/* LEFT SIDE: Heading & Info */}
                <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] p-8 md:p-16 flex flex-col justify-between">
                    <div>
                        <span className="text-xl md:text-2xl font-medium text-black block mb-4">
                            Contact
                        </span>
                        <div className="mb-6">
                            <TextAnimation
                                text="I'm ready to"
                                variant="wordUp"
                                delay={0.6}
                                className="text-5xl md:text-7xl  font-medium tracking-tight text-zinc-950 dark:text-white leading-[0.9]"
                                trigger={true}
                            />
                            <TextAnimation
                                text="hear your"
                                variant="wordRight"
                                delay={0.8}
                                className="text-5xl md:text-7xl  font-medium tracking-tight text-zinc-950 dark:text-white leading-[0.9] "
                                trigger={true}
                            />
                            <TextAnimation
                                text="idea"
                                variant="wordUp"
                                delay={1}
                                className="text-6xl md:text-8xl text-secondary font-medium tracking-tight dark:text-white leading-[0.9]"
                                trigger={true}
                            />
                        </div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                            className="text-xl md:text-2xl text-zinc-800 dark:text-zinc-400 max-w-lg tracking-wide mt-12"
                        >
                            I’m looking forward to connecting with you and exploring how my
                            skills in UI design can contribute to your business objectives.
                            Don’t hesitate to reach out to me for a meeting today.
                        </motion.p>
                    </div>
                </div>

                {/* RIGHT SIDE: Form */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="bg-[#ffffff] dark:bg-zinc-900 rounded-[2.5rem] p-8 md:p-14 flex flex-col"
                >
                    <form className="flex flex-col gap-6 h-full justify-center" onSubmit={(e) => e.preventDefault()}>
                        {/* Name Input */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-zinc-500 ml-1">
                                Name
                            </label>
                            <input
                                type="text"
                                placeholder="Jane Smith"
                                className="w-full bg-secondary/60 dark:bg-zinc-800 rounded-xl px-5 py-4 text-lg outline-none border-none placeholder:text-zinc-800 focus:ring-2 focus:ring-zinc-300 transition-all"
                            />
                        </div>

                        {/* Email Input */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-zinc-500 ml-1">
                                Email
                            </label>
                            <input
                                type="email"
                                placeholder="jane@framer.com"
                                className="w-full bg-secondary/60 dark:bg-zinc-800 rounded-xl px-5 py-4 text-lg outline-none border-none placeholder:text-zinc-800 focus:ring-2 focus:ring-zinc-300 transition-all"
                            />
                        </div>

                        {/* Message Input */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-zinc-500 ml-1">
                                Message
                            </label>
                            <textarea
                                rows={8}
                                placeholder="Enter your message"
                                className="w-full bg-secondary/60 dark:bg-zinc-800 rounded-2xl px-5 py-4 text-lg outline-none border-none placeholder:text-zinc-800 resize-none focus:ring-2 focus:ring-zinc-300 transition-all"
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="mt-2">
                            <button
                                type="submit"
                                className="w-full bg-[#2C2C2C] text-white rounded-2xl py-5 font-bold text-xl hover:bg-black transition-all active:scale-[0.98]"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </section>
    );
};

export default ContactForm;