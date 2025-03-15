// src/app/Home/Introduction.jsx
"use client";
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaUsers, FaDonate, FaLightbulb } from 'react-icons/fa';

import Data from "../constants.json";





export default function Introduction() {
    // Variantes de animación para secciones
    const sectionVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    // Variantes de animación para elementos individuales
    const itemVariants = {
        hidden: {
            opacity: 0,
            y: 50
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    // Características principales de Asoge Labs
    const features = [
        {
            icon: <FaUsers className="text-2xl md:text-3xl" />,
            title: "Comunidad",
            description: "Conectamos salvadoreños apasionados por la IA"
        },
        {
            icon: <FaLightbulb className="text-2xl md:text-3xl" />,
            title: "Educación",
            description: "Hacemos la IA accesible para todos"
        },
        {
            icon: <FaDonate className="text-2xl md:text-3xl" />,
            title: "Autosostenible",
            description: "Financiados por nuestros propios usuarios"
        }
    ];

    return (
        <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={sectionVariants}
            className="w-full bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16 md:py-32 px-4 md:px-8 overflow-hidden"
        >
            <div className="max-w-6xl mx-auto">
                {/* Encabezado con logo y título */}
                <motion.div
                    variants={itemVariants}
                    className="flex flex-col md:flex-row items-center justify-center md:justify-between mb-8 md:mb-12"
                >
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative w-28 h-28 md:w-40 md:h-40 mb-4 md:mb-0"
                    >
                        <Image
                            src={Data.favicon}
                            alt="Asoge Labs Logo"
                            fill
                            style={{ objectFit: 'contain' }}
                            priority
                        />
                    </motion.div>

                    <div className="text-center md:text-left md:ml-8">
                        <motion.h1
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-3xl md:text-5xl lg:text-6xl font-bold mb-2 whitespace-nowrap"
                        >
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                                Asoge Labs
                            </span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="text-lg md:text-xl text-gray-300 mt-2"
                        >
                            El futuro de la IA en El Salvador
                        </motion.p>
                    </div>
                </motion.div>

                {/* Descripción de la comunidad */}
                <motion.div
                    variants={itemVariants}
                    className="text-center mb-10 md:mb-16"
                >
                    <motion.h2
                        variants={itemVariants}
                        className="text-xl md:text-3xl font-semibold mb-4 md:mb-6"
                    >
                        Una comunidad salvadoreña que busca hacer la Inteligencia Artificial al alcance de todos
                    </motion.h2>
                    <motion.p
                        variants={itemVariants}
                        className="text-base md:text-lg text-gray-300 max-w-3xl mx-auto"
                    >
                        Una comunidad autosostenida, lo que significa que no se depende de financiamiento
                        de empresas o gobiernos directamente. La comunidad se mantiene gracias al apoyo de los usuarios a través
                        de donaciones, publicidad y otras contribuciones voluntarias.
                    </motion.p>
                </motion.div>

                {/* Características de la comunidad */}
                <motion.div
                    variants={itemVariants}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{
                                scale: 1.05,
                                transition: { duration: 0.3 }
                            }}
                            className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-xl p-5 md:p-6 border border-gray-700 hover:border-purple-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 260,
                                    damping: 20,
                                    delay: index * 0.2
                                }}
                                className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mb-3 md:mb-4 mx-auto md:mx-0"
                            >
                                {feature.icon}
                            </motion.div>
                            <h3 className="text-lg md:text-xl font-semibold mb-1 md:mb-2 text-center md:text-left">
                                {feature.title}
                            </h3>
                            <p className="text-sm md:text-base text-gray-300 text-center md:text-left">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </motion.section>
    );
}