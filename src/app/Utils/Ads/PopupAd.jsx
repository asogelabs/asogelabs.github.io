// src/app/Utils/Ads/PopupAd.jsx
"use client";
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';





export default function PopupAd({ isOpen, onClose }) {
    // Permitir que el anuncio se active después de que el componente se monte
    useEffect(() => {
        if (isOpen && typeof window !== 'undefined') {
            try {
                // Solo intentar cargar AdSense si estamos en el cliente y el script existe
                if (window.adsbygoogle) {
                    (window.adsbygoogle = window.adsbygoogle || []).push({});
                }
            } catch (err) {
                console.error('Error al cargar anuncio:', err);
            }
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
                    onClick={(e) => {
                        // Cerrar solo si se hace clic en el fondo, no en el anuncio
                        if (e.target === e.currentTarget) onClose();
                    }}
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        className="bg-[#1a1a1a] border border-white/10 rounded-xl p-4 w-full max-w-md relative"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-2 right-2 bg-white/10 hover:bg-white/20 rounded-full w-8 h-8 flex items-center justify-center text-white/80"
                        >
                            ×
                        </button>

                        <div className="mb-2 text-white/70 text-sm text-center">Anuncio</div>

                        {/* Contenedor del anuncio de AdSense - renderizado solo del lado del cliente */}
                        <div className="flex justify-center">
                            <ins
                                className="adsbygoogle"
                                style={{ display: 'block', width: '300px', height: '250px' }}
                                data-ad-client="pub-6072835343724077"
                                data-ad-slot="XXXXXXXXXX"
                                data-ad-format="auto"
                                data-full-width-responsive="true"
                            />
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}