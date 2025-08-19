import { motion } from "framer-motion";

interface Testimonial {
  text: string;
  author: string;
  position: string;
}

interface HeroSectionProps {
  testimonials: Testimonial[];
}

export const HeroSection = ({ testimonials }: HeroSectionProps) => {
  const cardVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
    hover: { scale: 1.02, transition: { duration: 0.2 } }
  };

  const starVariants = {
    rotate: {
      rotate: 360,
      transition: {
        duration: 20,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  return (
    <div className="w-full md:w-1/2 relative overflow-hidden bg-gradient-to-br from-[#00a896] to-[#00a896]/70 flex items-center justify-center">
      <div className="absolute inset-0 opacity-20">
        <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="nebula" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
              <stop offset="0%" stopColor="white" stopOpacity="0.5" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="50" cy="50" r="45" fill="url(#nebula)" />
        </svg>
      </div>

      <div className="relative z-10 p-8 md:p-16 max-w-lg">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-6">What&apos;s our Jobseekers Said.</h2>
          <div className="relative overflow-hidden bg-[#028090] bg-opacity-20 backdrop-blur-md p-8 rounded-xl shadow-xl">
            <div className="text-white">
              <blockquote className="relative">
                <span className="block text-5xl font-serif absolute -top-5 -left-4 text-white opacity-50">"</span>
                <p className="text-lg mb-4 relative z-10">{testimonials[0].text}</p>
                <footer className="mt-6">
                  <p className="font-semibold">{testimonials[0].author}</p>
                  <p className="text-green-100 text-sm">{testimonials[0].position}</p>
                </footer>
              </blockquote>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="relative z-20"
        >
          <motion.div 
            className="bg-white rounded-3xl p-8 shadow-xl"
            variants={cardVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Find the right job and the right place. Apply now!
            </h3>
            <p className="text-gray-600 mb-6">
              Be among the first to experience the easiest way to start a business.
            </p>
            <div className="flex -space-x-2 overflow-hidden mb-2">
              <img
                className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
              <img
                className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
              <img
                className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
                alt=""
              />
              <img
                className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
              <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-gray-200 text-gray-500 text-sm font-medium">
                +2
              </span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute right-8 top-1/2 transform -translate-y-1/2 opacity-70"
          variants={starVariants}
          animate="rotate"
        >
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M60 0L69.282 50.718L120 60L69.282 69.282L60 120L50.718 69.282L0 60L50.718 50.718L60 0Z" fill="white"/>
            <path d="M60 20L65.176 54.824L100 60L65.176 65.176L60 100L54.824 65.176L20 60L54.824 54.824L60 20Z" fill="white" fillOpacity="0.6"/>
            <path d="M60 40L61.051 58.949L80 60L61.051 61.051L60 80L58.949 61.051L40 60L58.949 58.949L60 40Z" fill="white" fillOpacity="0.4"/>
          </svg>
        </motion.div>

        <div className="absolute inset-0 overflow-hidden opacity-30">
          <div className="absolute -right-40 -top-40 w-80 h-80 rounded-full bg-white opacity-10"></div>
          <div className="absolute -left-20 top-1/2 w-60 h-60 rounded-full bg-white opacity-10"></div>
          <div className="absolute right-20 bottom-20 w-40 h-40 rounded-full bg-white opacity-10"></div>
        </div>
      </div>
    </div>
  );
}; 