import React from 'react'
import aboutPic from "../assets/aboutPic.jpg";
import aboutt from "../assets/aboutt.jpg";

const About = () => {
    return (
        <div className="bg-white min-h-screen">
            {/* 1. Full Screen Hero Image (No Text) */}
            <div className="w-full rounded-5xl h-[250px] sm:h-[350px] md:h-[500px]">
                <img 
                    src={aboutPic} 
                    alt="Pak Learners Banner" 
                    className="w-full h-full object-cover shadow-sm rounded-3xl"
                />
            </div>

            {/* 2. Content Section */}
            <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
                <div className="flex flex-col lg:flex-row items-center gap-10 md:gap-16">
                    
                    {/* Text Content */}
                    <div className="lg:w-1/2 space-y-6">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-blue-950 tracking-tight">
                            Welcome to <span className="text-cyan-500 font-black">PAK LEARNERS</span>
                        </h2>
                        
                        <div className="text-gray-600 leading-relaxed space-y-5 text-base md:text-lg">
                            <p>
                                Welcome to PAK LEARNERS, your ultimate destination for quality (MCQs) & exam preparation resources. We are expert to provide students, educators, & professionals with the best platform to enhance their knowledge and skills in various fields of life.
                            </p>
                            
                            <p>
                                Here we are highly aware about the challenges of preparing for exams and different assessments. Our team created a user-friendly platform having a vast collection of MCQs across various subjects like <strong>general knowledge, physics, chemistry, biology, everyday sciences, history, computer science,</strong> etc. No matter for which exam you are preparing, we have sufficient resources for you to help you succeed.
                            </p>

                            <p className="border-l-4 border-cyan-400 pl-4 italic bg-gray-50 py-2">
                                We have given our best to create accurate categories to ensure accuracy and exact answers. Also, our team is always here to update our Mcqs database, PakLearners offers you to track your progress through various methods.
                            </p>

                            <p className="font-medium text-blue-900">
                                Furthermore, we are committed to supporting learners of all levels with the best possible tools for exam success. So don’t worry about exams and join the community today & start preparing smarter, not harder.
                            </p>
                        </div>
                    </div>

                    {/* Side Image */}
                    <div className="lg:w-1/2 w-full">
                        <div className="rounded-3xl overflow-hidden shadow-2xl ring-8 ring-gray-50">
                            <img 
                                src={aboutt} 
                                alt="Learning Resources" 
                                className="w-full h-auto object-cover"
                            />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default About