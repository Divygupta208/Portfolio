import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import TextAnimation from "../ui/TextAnimation";

const ContactForm: React.FC = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

    // Initialize EmailJS once when the component mounts
    useEffect(() => {
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
        if (publicKey) {
            emailjs.init({
                publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
                blockHeadless: true, // Prevents bot submissions
                limitRate: {
                    id: 'portfolio-contact',
                    throttle: 10000, // Allow 1 request every 10 seconds per user
                },
            });
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formRef.current) return;

        setStatus("sending");

        try {
            await emailjs.sendForm(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                formRef.current
            );

            setStatus("success");
            formRef.current.reset();

            // Reset to idle after 5 seconds
            setTimeout(() => setStatus("idle"), 5000);
        } catch (error) {
            console.error("EmailJS Error:", error);
            setStatus("error");
            setTimeout(() => setStatus("idle"), 5000);
        }
    };

    return (
        <section className="w-full min-h-screen dark:bg-zinc-950 flex flex-col px-4 md:px-6 lg:px-0">
            <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-4 items-stretch">

                {/* LEFT SIDE: Heading & Info */}
                <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] p-8 md:p-16 flex flex-col justify-between">
                    <div>
                        <span className="text-xl md:text-2xl font-medium text-black block mb-4">Contact</span>
                        <div className="mb-6">
                            <TextAnimation text="I'm ready to" variant="wordUp" delay={0.6} className="text-5xl md:text-7xl font-medium tracking-tight text-zinc-950 dark:text-white leading-[0.9]" trigger={true} />
                            <TextAnimation text="hear your" variant="wordRight" delay={0.8} className="text-5xl md:text-7xl font-medium tracking-tight text-zinc-950 dark:text-white leading-[0.9] " trigger={true} />
                            <TextAnimation text="idea" variant="wordUp" delay={1} className="text-6xl md:text-8xl text-secondary font-medium tracking-tight dark:text-white leading-[0.9]" trigger={true} />
                        </div>
                        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8 }} className="text-xl md:text-2xl text-zinc-800 dark:text-zinc-400 max-w-lg tracking-wide mt-12">
                            I’m looking forward to connecting with you. Don’t hesitate to reach out for a meeting today.
                        </motion.p>
                    </div>
                </div>

                {/* RIGHT SIDE: Form */}
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.8 }} className="bg-[#ffffff] dark:bg-zinc-900 rounded-[2.5rem] p-8 md:p-14 flex flex-col relative">

                    <form ref={formRef} className="flex flex-col gap-6 h-full justify-center" onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-zinc-500 ml-1">Name</label>
                            <input name="name" type="text" required placeholder="Jane Smith" className="w-full bg-secondary/60 dark:bg-zinc-800 rounded-xl px-5 py-4 text-lg outline-none border-none placeholder:text-zinc-800 focus:ring-2 focus:ring-zinc-300 transition-all" />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-zinc-500 ml-1">Email</label>
                            <input name="email" type="email" required placeholder="jane@framer.com" className="w-full bg-secondary/60 dark:bg-zinc-800 rounded-xl px-5 py-4 text-lg outline-none border-none placeholder:text-zinc-800 focus:ring-2 focus:ring-zinc-300 transition-all" />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-zinc-500 ml-1">Message</label>
                            <textarea name="message" rows={8} required placeholder="Enter your message" className="w-full bg-secondary/60 dark:bg-zinc-800 rounded-2xl px-5 py-4 text-lg outline-none border-none placeholder:text-zinc-800 resize-none focus:ring-2 focus:ring-zinc-300 transition-all" />
                        </div>

                        <div className="mt-2">
                            <button
                                type="submit"
                                disabled={status === "sending"}
                                className={`w-full text-white rounded-2xl py-5 font-bold text-xl transition-all active:scale-[0.98] disabled:opacity-70 ${status === "success" ? "bg-green-600" : status === "error" ? "bg-red-600" : "bg-[#2C2C2C] hover:bg-black"
                                    }`}
                            >
                                {status === "sending" ? "Sending..." : status === "success" ? "Message Sent!" : status === "error" ? "Error! Try Again" : "Submit"}
                            </button>
                        </div>
                    </form>

                    {/* Success Animation Overlay */}
                    <AnimatePresence>
                        {status === "success" && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-[2.5rem] flex items-center justify-center flex-col p-8 text-center"
                            >
                                <motion.div
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 0.5 }}
                                    className="w-20 h-20 text-green-500 mb-4"
                                >
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                </motion.div>
                                <h3 className="text-2xl font-bold dark:text-white">Check your Inbox!</h3>
                                <p className="text-zinc-600 dark:text-zinc-400 mt-2">I've sent a confirmation email to you.</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
};

export default ContactForm;