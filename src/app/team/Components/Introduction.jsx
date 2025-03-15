// src/app/team/Components/Introduction.jsx
"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaHandsHelping, FaRobot } from 'react-icons/fa';





export default function Introduction() {
    // Variantes para animaciones
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5 }
        }
    };

    return (
        // Contenedor principal con degradado oscuro y responsive
        <section className="w-full py-16 px-4 md:px-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
            <motion.div
                className="max-w-6xl mx-auto"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                {/* Título principal */}
                <motion.h2
                    className="text-3xl md:text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
                    variants={itemVariants}
                >
                    Nuestro Team
                </motion.h2>

                {/* Descripción principal */}
                <motion.div
                    className="mb-12 text-center max-w-3xl mx-auto"
                    variants={itemVariants}
                >
                    <p className="text-lg md:text-xl mb-6 text-gray-300">
                        En Asoge Labs creemos en el poder colectivo de individuos apasionados que comparten una misma visión.
                    </p>
                </motion.div>

                {/* Características en tarjetas con iconos */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    variants={containerVariants}
                >
                    {/* Tarjeta 1 */}
                    <motion.div
                        className="bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-xl shadow-lg border border-gray-700 hover:border-blue-500 transition-all duration-300"
                        variants={itemVariants}
                        whileHover={{ scale: 1.03 }}
                    >
                        <div className="flex justify-center mb-4">
                            <FaUsers className="text-4xl text-blue-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-center mb-3">Comunidad Horizontal</h3>
                        <p className="text-gray-300 text-center">
                            No creemos en jerarquías tradicionales. Aquí no hay líderes, solo colegas y compañeros con un objetivo común.
                        </p>
                    </motion.div>

                    {/* Tarjeta 2 */}
                    <motion.div
                        className="bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-xl shadow-lg border border-gray-700 hover:border-purple-500 transition-all duration-300"
                        variants={itemVariants}
                        whileHover={{ scale: 1.03 }}
                    >
                        <div className="flex justify-center mb-4">
                            <FaHandsHelping className="text-4xl text-purple-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-center mb-3">Colaboración</h3>
                        <p className="text-gray-300 text-center">
                            Desarrolladores, voces de la comunidad y entusiastas trabajando juntos para democratizar el acceso a la tecnología.
                        </p>
                    </motion.div>

                    {/* Tarjeta 3 */}
                    <motion.div
                        className="bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-xl shadow-lg border border-gray-700 hover:border-indigo-500 transition-all duration-300"
                        variants={itemVariants}
                        whileHover={{ scale: 1.03 }}
                    >
                        <div className="flex justify-center mb-4">
                            <FaRobot className="text-4xl text-indigo-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-center mb-3">Nuestra Misión</h3>
                        <p className="text-gray-300 text-center">
                            Trabajamos para que la Inteligencia Artificial sea accesible para todos, sin importar sus conocimientos técnicos o recursos.
                        </p>
                    </motion.div>
                </motion.div>

                {/* Sección final con llamado a la acción o descripción adicional */}
                <motion.div
                    className="mt-16 text-center"
                    variants={itemVariants}
                >
                    <p className="text-lg text-gray-300 mb-4 max-w-3xl mx-auto">
                        Cada miembro del Team de Asoge Labs aporta su talento único y perspectiva valiosa para enriquecer nuestra comunidad y acercarnos a nuestros objetivos.
                    </p>
                    <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mt-8"></div>
                </motion.div>
            </motion.div>
        </section>
    );
}