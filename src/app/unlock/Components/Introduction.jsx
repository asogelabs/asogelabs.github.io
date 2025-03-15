// src/app/unlock/Components/Introduction.jsx
"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { FaUnlock, FaClock, FaMobile } from 'react-icons/fa';





const Introduction = () => {
    // Configuración de animaciones para entradas suaves
    const containerVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.5,
                when: "beforeChildren",
                staggerChildren: 0.2
            }
        }
    };

    // Animación de entrada para elementos individuales
    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.4 }
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4 selection:bg-blue-500/30">
            <motion.div
                className="w-full max-w-md"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                {/* Tarjeta flotante con sombra pronunciada */}
                <div className="bg-[#111111] border border-white/10 rounded-2xl shadow-2xl p-6 space-y-6 relative overflow-hidden">
                    {/* Efecto de brillo sutil */}
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/30 rounded-full blur-2xl"></div>

                    {/* Encabezado con ícono */}
                    <motion.div
                        variants={itemVariants}
                        className="flex items-center pb-4 border-b border-white/10"
                    >
                        <div className="bg-blue-500/10 p-3 rounded-full mr-4 border border-white/10">
                            <FaUnlock className="text-blue-400 text-2xl" />
                        </div>
                        <h2 className="text-2xl font-bold text-white/90">Códigos de desbloqueo</h2>
                    </motion.div>

                    {/* Descripción principal */}
                    <motion.div
                        variants={itemVariants}
                        className="text-white/70"
                    >
                        <p>
                            Genera un <span className="text-blue-400 font-semibold">código de desbloqueo</span> que te
                            permite acceder a nuestros bots de Telegram de forma rápida, segura y gratuita.
                        </p>
                    </motion.div>

                    {/* Beneficios */}
                    <motion.div
                        variants={itemVariants}
                        className="space-y-4"
                    >
                        <div className="flex items-center text-white/70">
                            <FaClock className="text-xl text-blue-400 mr-3" />
                            <p>Código válido por <span className="text-white/90 font-medium">tiempo limitado.</span></p>
                        </div>
                        <div className="flex items-center text-white/70">
                            <FaMobile className="text-xl text-blue-400 mr-3" />
                            <p>Accede desde <span className="text-white/90 font-medium">cualquier dispositivo.</span></p>
                        </div>
                    </motion.div>

                    {/* Instrucciones */}
                    <motion.div
                        variants={itemVariants}
                        className="bg-[#1a1a1a] p-4 rounded-lg border border-white/10"
                    >
                        <h3 className="text-lg font-semibold text-white/90 mb-2">Pasos a seguir:</h3>
                        <ol className="list-decimal list-inside text-white/70 space-y-2">
                            <li>Genera tu código de desbloqueo (desde el botón de abajo).</li>
                            <li>Copia el código generado haciendo click sobre él.</li>
                            <li>Pégalo en el bot de Telegram que deseas usar.</li>
                        </ol>
                    </motion.div>

                    {/* Mensaje de advertencia */}
                    <motion.div
                        variants={itemVariants}
                        className="bg-blue-500/10 border border-white/10 rounded-md p-4 text-white/70"
                    >
                        <strong className="text-white/90">Importante:</strong> Cada código es temporal. Si caduca, simplemente genera uno nuevo.
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default Introduction;