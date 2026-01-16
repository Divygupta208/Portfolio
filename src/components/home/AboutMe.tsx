import ImageStack from "../ui/ImageStack";
import Counter from "../ui/Counter";
import RollingButton from "../ui/RollButton";


const AboutSection = () => {
    const stats = [
        { label: "YEARS OF EXPERIENCE", value: 1 },
        { label: "PROJECT COMPLETED", value: 10 },
        { label: "SATISFIED CLIENTS", value: 2 },
    ];

    return (
        // Added overflow-x-hidden to prevent the drag from triggering page scroll
        <section className="w-full max-w-6xl mx-auto  flex flex-col gap-6 overflow-x-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-7 bg-white rounded-4xl p-8 md:p-12 flex flex-col justify-center">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-black mb-6 leading-tight">
                        Passionate versatile digital designer and pixel perfect guy
                    </h2>
                    <p className="text-zinc-500 text-base md:text-lg leading-relaxed mb-10">
                        I am a digital creative designer who loves to create stunning and
                        flawless products. I have a passion for both design and development.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <RollingButton
                            mainText="RESUME"
                            subText="DOWNLOAD"
                            mainBgColor="bg-black"
                            subBgColor="bg-white"
                            mainTextColor="text-white"
                            subTextColor="text-black"
                            direction="down"
                        />
                        <RollingButton
                            mainText="ABOUT ME"
                            subText="SEE MORE"
                            mainBgColor="bg-white"
                            subBgColor="bg-black"
                            mainTextColor="text-black"
                            subTextColor="text-white"
                            direction="down"
                            className="border border-black"
                        />
                    </div>
                </div>

                <div className="lg:col-span-5 h-full min-h-[400px]">
                    <ImageStack />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white rounded-2xl p-8 md:p-10 flex flex-col justify-center">
                        <h3 className="text-black font-medium text-sm uppercase mb-4">
                            {stat.label}
                        </h3>
                        <div className="text-5xl md:text-6xl font-semibold text-black flex items-center">
                            <Counter value={stat.value} />
                            <span>+</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default AboutSection;