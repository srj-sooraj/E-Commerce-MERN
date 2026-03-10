import React, { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Zap, Shield, Truck, Star, ArrowRight, Play, PackageSearch } from "lucide-react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, MeshDistortMaterial, Sphere, Box, Cylinder, Torus } from "@react-three/drei";
import { useNavigate } from "react-router-dom";

// 3D Abstract Products Composition
const FloatingProducts = () => {
    const groupRef = useRef();

    useFrame((state) => {
        groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
        groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
    });

    return (
        <group ref={groupRef}>
            {/* Smartphone */}
            <Float speed={1.5} rotationIntensity={1} floatIntensity={1.5}>
                <Box args={[1.2, 2.4, 0.1]} position={[-1.5, 0.5, 0.5]} rotation={[0, 0.3, 0.1]}>
                    <meshPhysicalMaterial color="#111827" metalness={0.9} roughness={0.1} />
                    <Box args={[1.15, 2.35, 0.11]} position={[0, 0, 0.01]}>
                        <meshBasicMaterial color="#06b6d4" transparent opacity={0.8} />
                    </Box>
                </Box>
            </Float>

            {/* Smartwatch */}
            <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
                <Cylinder args={[0.8, 0.8, 0.3, 32]} position={[1.5, -0.2, 0]} rotation={[1, 0, 0.2]}>
                    <meshPhysicalMaterial color="#064e3b" roughness={0.2} metalness={0.8} />
                    <Cylinder args={[0.7, 0.7, 0.31, 32]} position={[0, 0, 0]}>
                        <meshBasicMaterial color="#0f172a" />
                    </Cylinder>
                    <Box args={[0.8, 0.35, 0.8]} position={[0, 0, 0]} rotation={[0, Math.PI / 4, 0]}>
                        <meshBasicMaterial color="#10b981" transparent opacity={0.9} />
                    </Box>
                </Cylinder>
            </Float>

            {/* Earbud */}
            <Float speed={1.2} rotationIntensity={2} floatIntensity={3}>
                <Sphere args={[0.6, 64, 64]} position={[-0.2, 1.5, -1]}>
                    <MeshDistortMaterial color="#f8fafc" distort={0.25} speed={3} roughness={0} metalness={1} envMapIntensity={2} />
                </Sphere>
            </Float>

            {/* Ring */}
            <Float speed={0.8} rotationIntensity={0.8} floatIntensity={0.5}>
                <Torus args={[2.5, 0.02, 32, 100]} rotation={[Math.PI / 2.5, 0, 0]}>
                    <meshBasicMaterial color="#10b981" transparent opacity={0.4} />
                </Torus>
            </Float>

            {/* Enclosure */}
            <Float speed={0.5} rotationIntensity={0.2} floatIntensity={0.1}>
                <Sphere args={[3.5, 32, 32]}>
                    <meshPhysicalMaterial color="#ffffff" transmission={1} opacity={0.1} transparent roughness={0.1} wireframe={true} />
                </Sphere>
            </Float>
        </group>
    );
};

// 3D Laptop Model
const LaptopModel = () => {
    const groupRef = useRef();

    useFrame((state) => {
        groupRef.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.2;
        groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.4;
    });

    return (
        <group ref={groupRef} position={[0, -0.5, 0]}>
            <Box args={[3, 0.1, 2]} position={[0, 0, 0]}>
                <meshPhysicalMaterial color="#1e293b" metalness={0.8} roughness={0.2} />
            </Box>
            <Box args={[3.0, 2.0, 0.1]} position={[0, 1.0, -0.95]} rotation={[-0.2, 0, 0]}>
                <meshPhysicalMaterial color="#0f172a" metalness={0.9} roughness={0.1} />
                <Box args={[2.8, 1.8, 0.11]} position={[0, 0, 0.01]}>
                    <meshBasicMaterial color="#34d399" transparent opacity={0.6} />
                </Box>
            </Box>
        </group>
    );
};

const Home = () => {
    const navigate = useNavigate();

    const features = [
        { icon: Zap, title: "Fast Delivery", desc: "Same day dispatch on all orders" },
        { icon: Shield, title: "Secure Payment", desc: "100% encrypted transactions" },
        { icon: Truck, title: "Free Shipping", desc: "On orders above ₹999" },
        { icon: Star, title: "Premium Quality", desc: "Top grade items guaranteed" }
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-white font-sans overflow-hidden border-b border-transparent">

            {/* MAIN HERO */}
            <div className="relative w-full min-h-[90vh] flex items-center justify-center pt-10 pb-20 px-6">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.15),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(6,182,212,0.1),transparent_40%)] pointer-events-none" />

                <div className="max-w-7xl w-full mx-auto grid lg:grid-cols-2 gap-16 lg:gap-8 items-center z-10 mt-10">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="flex flex-col gap-8"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-emerald-500/30 text-emerald-400 w-fit shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            <span className="text-xs font-semibold uppercase tracking-wider">New Arrivals 2026</span>
                        </div>

                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight">
                            Smart Shopping <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">
                                Start Here.
                            </span>
                        </h1>

                        <p className="text-lg text-slate-400 max-w-lg leading-relaxed">
                            Enjoy a smooth and effortless shopping experience with a wide range of quality products.Shop smarter with easy browsing , secure payment and get your favorite items delivered right to your doorstep
                        </p>

                        <div className="flex flex-wrap items-center gap-4">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navigate("/products")}
                                className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_35px_rgba(16,185,129,0.5)] flex items-center gap-2"
                            >
                                Explore Products <ArrowRight size={20} />
                            </motion.button>
                            <button
                                onClick={() => document.getElementById("features").scrollIntoView({ behavior: 'smooth' })}
                                className="px-8 py-4 bg-slate-900/50 hover:bg-slate-800 border border-slate-700 hover:border-emerald-500/50 rounded-xl flex items-center gap-2 font-semibold transition-all backdrop-blur-md text-white"
                            >
                                Learn More <ChevronRight size={18} className="text-emerald-400" />
                            </button>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-slate-800/50">
                            {features.map((feature, idx) => (
                                <div key={idx} className="flex flex-col gap-2">
                                    <feature.icon size={24} className="text-cyan-400" />
                                    <p className="text-sm font-semibold text-white">{feature.title}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="relative h-[400px] lg:h-[600px] w-full"
                    >
                        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-cyan-500/20 rounded-[3rem] blur-3xl opacity-50 pointer-events-none" />

                        {/* Main Hero Default 3D Scene */}
                        <div className="relative z-10 w-full h-full rounded-[3rem] border border-white/10 overflow-hidden bg-slate-900/40 backdrop-blur-md shadow-[0_0_50px_rgba(16,185,129,0.1)]">
                            <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
                                <ambientLight intensity={0.5} />
                                <directionalLight position={[10, 10, 5]} intensity={1.5} color="#10b981" />
                                <directionalLight position={[-10, -10, -5]} intensity={1} color="#06b6d4" />
                                <OrbitControls enableZoom={false} autoRotate={false} />
                                <FloatingProducts />
                            </Canvas>
                        </div>

                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                            className="absolute -bottom-5 lg:-bottom-10 -left-5 lg:-left-10 bg-slate-900/90 backdrop-blur-xl border border-white/10 p-4 lg:p-6 rounded-2xl shadow-xl z-20"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                                    <Star className="text-emerald-400" size={20} />
                                </div>
                                <div>
                                    <p className="text-xl lg:text-2xl font-bold">4.9/5</p>
                                    <p className="text-xs lg:text-sm text-slate-400">Trusted by 10k+ users</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            <div id="features" className="w-full bg-slate-950 py-10 border-t border-slate-900">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-white mb-2">Trusted Worldwide</h2>
                    <p className="text-slate-500">A huge array of quality tech products shipped locally.</p>
                </div>
            </div>

            {/* PROMO ADS SECTION WITH LAPTOP TEMPLATE */}
            <div className="max-w-7xl mx-auto px-6 py-20 lg:py-32 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-slate-900/60 backdrop-blur-2xl border border-emerald-500/20 rounded-[3rem] overflow-hidden flex flex-col lg:flex-row items-center justify-between p-8 md:p-16 relative shadow-[0_0_50px_rgba(6,182,212,0.1)]"
                >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 blur-[150px] pointer-events-none" />

                    <div className="flex-1 w-full lg:w-1/2 h-[350px] lg:h-[450px] relative z-10 mb-10 lg:mb-0">
                        <Canvas camera={{ position: [0, 2, 7], fov: 45 }}>
                            <ambientLight intensity={0.6} />
                            <directionalLight position={[5, 10, 5]} intensity={1.5} color="#34d399" />
                            <directionalLight position={[-5, 5, -5]} intensity={1} color="#38bdf8" />
                            <OrbitControls enableZoom={false} autoRotate={false} />
                            <LaptopModel />
                        </Canvas>
                    </div>

                    <div className="flex-1 w-full lg:w-1/2 lg:pl-16 relative z-10">
                        <span className="text-cyan-400 font-bold tracking-widest uppercase text-sm mb-4 block inline-flex items-center gap-2">
                            <Zap size={16} /> Showcase Deal
                        </span>
                        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight whitespace-pre-wrap">
                            Next-Gen Pro <br />Laptops.
                        </h2>
                        <p className="text-slate-400 text-lg mb-8 leading-relaxed max-w-md">
                            Experience raw power and stunning visuals. Our new line of high-performance laptops is designed for professionals and gamers alike. Available locally at unbeatable prices.
                        </p>

                        <div className="flex gap-4 items-center">
                            <div className="text-4xl font-extrabold text-emerald-400">₹79,999</div>
                            <div className="text-xl text-slate-500 line-through">₹99,999</div>
                        </div>

                        <div className="mt-10 flex gap-4">
                            <button onClick={() => navigate("/products")} className="px-8 py-4 bg-emerald-500 text-slate-950 font-bold rounded-xl hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all flex items-center gap-2 hover:scale-105">
                                Buy Now
                            </button>
                            <button onClick={() => navigate("/products")} className="px-8 py-4 border border-slate-700 font-bold rounded-xl hover:bg-slate-800 transition-colors flex items-center gap-2">
                                <PackageSearch size={18} /> Add to Cart
                            </button>
                        </div>
                    </div>

                </motion.div>
            </div>

        </div>
    );
};

export default Home;
