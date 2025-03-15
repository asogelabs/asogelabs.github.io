// src/app/Home/Warn.jsx
"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { FaRobot, FaMobileAlt, FaDesktop, FaHandHoldingHeart, FaAd, FaExclamationTriangle } from 'react-icons/fa';
import { HiLightningBolt, HiSparkles } from 'react-icons/hi';





export default function Warn() {
    // Configuración de animaciones
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.5,
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.4 }
        }
    };

    // Plataformas donde están disponibles los modelos
    const platforms = [
        {
            icon: <FaRobot />,
            name: "Bots de Telegram"
        },
        {
            icon: <FaMobileAlt />,
            name: "Aplicaciones Móviles"
        },
        {
            icon: <FaDesktop />,
            name: "Aplicaciones de Escritorio"
        }
    ];

    // Métodos de financiamiento
    const fundingSources = [
        {
            icon: <FaAd />,
            name: "Publicidad",
            description: "Los anuncios son nuestra principal fuente de ingreso"
        },
        {
            icon: <FaHandHoldingHeart />,
            name: "Donaciones",
            description: "Contribuciones voluntarias de nuestra comunidad"
        }
    ];

    return (
        // Contenedor principal con fondo de degradado mejorado y efecto de patrón
        <section className="w-full bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 text-white py-20 px-4 md:px-8 relative overflow-hidden">
            {/* Elementos decorativos de fondo */}
            <div className="absolute inset-0 overflow-hidden opacity-10">
                <div className="absolute -top-20 -right-20 w-96 h-96 bg-purple-600 rounded-full filter blur-3xl"></div>
                <div className="absolute top-1/2 -left-20 w-80 h-80 bg-blue-600 rounded-full filter blur-3xl"></div>
                <div className="absolute -bottom-20 right-1/4 w-72 h-72 bg-indigo-600 rounded-full filter blur-3xl"></div>
            </div>

            <motion.div
                className="max-w-4xl mx-auto relative z-10"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Título de la sección con elementos decorativos */}
                <motion.div
                    className="mb-16 text-center"
                    variants={itemVariants}
                >
                    <div className="inline-block p-3 bg-gradient-to-br from-yellow-500 to-amber-600 bg-opacity-30 rounded-2xl mb-6 shadow-lg shadow-yellow-500/10">
                        <FaExclamationTriangle className="text-4xl text-yellow-300" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-yellow-100 to-white">
                        Información importante sobre nuestros servicios
                    </h2>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        Por favor lee esta información para disfrutar de la mejor experiencia
                    </p>
                </motion.div>

                {/* Disponibilidad de modelos - Panel con efecto de cristal */}
                <motion.div
                    className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl p-8 mb-10 border border-gray-700/50 shadow-xl hover:shadow-blue-500/5 transition-all duration-500"
                    variants={itemVariants}
                >
                    <h3 className="text-xl md:text-2xl font-semibold mb-6 flex items-center">
                        <HiLightningBolt className="text-blue-400 mr-3 text-2xl" />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-blue-500">
                            Modelos completamente gratuitos
                        </span>
                    </h3>
                    <p className="mb-8 text-gray-300 leading-relaxed">
                        Todos nuestros modelos están disponibles gratuitamente en las siguientes plataformas:
                    </p>
                    <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-6">
                        {platforms.map((platform, index) => (
                            <div
                                key={index}
                                className="flex items-center bg-gradient-to-r from-blue-900/40 to-blue-800/40 px-5 py-3 rounded-full shadow-md hover:shadow-blue-500/20 hover:-translate-y-1 transition-all duration-300"
                            >
                                <span className="mr-3 text-lg text-blue-400">{platform.icon}</span>
                                <span className="font-medium">{platform.name}</span>
                            </div>
                        ))}
                    </div>
                    <p className="text-gray-300 bg-blue-900/20 p-4 rounded-xl border-l-4 border-blue-500">
                        Nuestros modelos cuentan con un límite de uso diario justo y una interfaz e infraestructura
                        intuitiva para que puedas aprovechar al máximo la IA.
                    </p>
                </motion.div>

                {/* Cómo unirse - Panel con efecto de brillo */}
                <motion.div
                    className="bg-gradient-to-br from-gray-800/80 to-indigo-900/40 backdrop-blur-sm rounded-2xl p-8 mb-10 border border-indigo-700/30 shadow-xl hover:shadow-indigo-500/10 transition-all duration-500 relative overflow-hidden"
                    variants={itemVariants}
                >
                    {/* Elemento decorativo */}
                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-600/20 rounded-full filter blur-3xl"></div>

                    <h3 className="text-xl md:text-2xl font-semibold mb-6 flex items-center">
                        <HiSparkles className="text-indigo-400 mr-3 text-2xl" />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-purple-400">
                            Únete a nuestra comunidad
                        </span>
                    </h3>
                    <p className="text-gray-300 mb-6 leading-relaxed relative z-10">
                        La forma más sencilla de unirte a Asoge Labs es utilizando nuestros modelos gratuitos.
                        Esto nos ayuda a crecer y mejorar nuestros servicios para todos.
                    </p>
                    <div className="bg-gradient-to-r from-blue-800/30 to-indigo-800/30 border border-indigo-500/50 rounded-xl p-5 shadow-lg relative z-10">
                        <p className="text-blue-200 font-medium leading-relaxed">
                            ¡Tu uso contribuye directamente al crecimiento de la comunidad y al mejoramiento
                            de nuestros modelos!
                        </p>
                    </div>
                </motion.div>

                {/* Aviso importante - Panel con destaque */}
                <motion.div
                    className="bg-gradient-to-br from-amber-900/20 to-yellow-900/20 backdrop-blur-sm rounded-2xl p-8 border border-yellow-700/50 shadow-xl relative overflow-hidden"
                    variants={itemVariants}
                >
                    {/* Elementos decorativos */}
                    <div className="absolute -top-20 -left-20 w-40 h-40 bg-yellow-600/10 rounded-full filter blur-3xl"></div>
                    <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-amber-600/10 rounded-full filter blur-3xl"></div>

                    <h3 className="text-xl md:text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-400 relative z-10">
                        Por favor, desactiva los bloqueadores de anuncios
                    </h3>
                    <p className="text-gray-300 mb-8 relative z-10 leading-relaxed">
                        TODOS NUESTROS MODELOS existen gracias a operaciones como publicidad o donaciones.
                        Estas son fundamentales para poder pagar la computación en la nube que se utiliza.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 relative z-10">
                        {fundingSources.map((source, index) => (
                            <div
                                key={index}
                                className="bg-gradient-to-br from-gray-800/70 to-gray-900/70 rounded-xl p-5 flex items-start shadow-md hover:shadow-yellow-500/10 hover:-translate-y-1 transition-all duration-300"
                            >
                                <div className="bg-gradient-to-br from-yellow-700/50 to-amber-700/50 p-3 rounded-lg mr-4 shadow-inner">
                                    <span className="text-xl text-yellow-300">{source.icon}</span>
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-2 text-lg">{source.name}</h4>
                                    <p className="text-gray-400">{source.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <p className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 p-5 rounded-xl text-gray-200 font-medium relative z-10 border-l-4 border-yellow-500 shadow-md">
                        Te pedimos que por favor <span className="font-bold text-yellow-300">desactives todos los bloqueadores de anuncios</span> o
                        evites hacer bypass de anuncios cuando uses nuestros servicios.
                        <br className="hidden md:block" />
                        <span className="block mt-2">¡Tu apoyo es esencial para mantener estos recursos gratuitos para todos!</span>
                    </p>
                </motion.div>

                {/* Llamada a la acción con botón mejorado */}
                <motion.div
                    className="mt-12 text-center"
                    variants={itemVariants}
                >
                    <motion.button
                        className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full font-medium text-lg shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span className="relative z-10">Comenzar a usar los modelos</span>
                        <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    </motion.button>
                </motion.div>
            </motion.div>
        </section>
    );
}