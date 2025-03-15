// src/app/unlock/Components/GButton.jsx
"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { IoLockOpenOutline } from "react-icons/io5";
import { FaVoteYea } from "react-icons/fa";
import copy from 'copy-text-to-clipboard';





// Componente principal de generación de código
function GButton() {
    // Estados para manejo general
    const [generatedCode, setGeneratedCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [copied, setCopied] = useState(false);

    // Estados para el captcha
    const [captchaCode, setCaptchaCode] = useState('');
    const [userInput, setUserInput] = useState('');
    const [captchaSolved, setCaptchaSolved] = useState(false);
    const [captchaVerificationMode, setCaptchaVerificationMode] = useState(true);
    const [captchaVerificationResult, setCaptchaVerificationResult] = useState(null);

    // Configuración de API
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const API_PASSWORD = process.env.NEXT_PUBLIC_API_PASSWORD;

    // Generar código de captcha
    const generateCaptcha = () => {
        // Caracteres alfanuméricos en mayúsculas
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

        // Generar un código de 4 caracteres
        return Array.from(
            { length: 4 },
            () => characters[Math.floor(Math.random() * characters.length)]
        ).join('');
    };

    // Inicializar captcha al montar componente
    useEffect(() => {
        setCaptchaCode(generateCaptcha());
    }, []);

    // Verificar captcha
    const verifyCaptcha = () => {
        const match = userInput.toUpperCase() === captchaCode;

        if (match) {
            // Captcha correcto
            setCaptchaSolved(true);
            setCaptchaVerificationMode(false);
            setCaptchaVerificationResult('success');

            // Limpiar resultado después de 2 segundos
            setTimeout(() => {
                setCaptchaVerificationResult(null);
            }, 2000);
        } else {
            // Captcha incorrecto
            setCaptchaSolved(false);
            setCaptchaVerificationResult('error');

            // Regenerar captcha
            setCaptchaCode(generateCaptcha());
            setUserInput('');

            // Limpiar resultado después de 2 segundos
            setTimeout(() => {
                setCaptchaVerificationResult(null);
            }, 2000);
        }
    };

    // Generar código
    const generateCode = async () => {
        if (!captchaSolved) {
            setError('Por favor, completa la verificación');
            return;
        }

        setGeneratedCode('');
        setError(null);
        setIsLoading(true);

        try {
            const response = await axios.post(API_URL, {
                password: API_PASSWORD
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            setGeneratedCode(response.data.code);
        } catch (err) {
            setError('Error al generar el código. Por favor, inténtalo de nuevo.');
            console.error('Error en la generación de código:', err);
        } finally {
            setIsLoading(false);
        }
    };

    // Copiar al portapapeles usando copy-text-to-clipboard
    const copyToClipboard = () => {
        // Intentar copiar el código generado
        const copiedSuccessfully = copy(generatedCode);

        if (copiedSuccessfully) {
            // Mostrar efecto de copiado
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } else {
            // Manejar error de copiado si es necesario
            console.error('Error al copiar el código');
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-4 selection:bg-blue-500/30">
            <div className="w-full max-w-md bg-[#111111] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
                <div className="p-6 space-y-4">
                    {/* Sección de Captcha - Solo se muestra la primera vez */}
                    {captchaVerificationMode && (
                        <div className="space-y-4">
                            {/* Información del Captcha */}
                            <div className="bg-[#1a1a1a] p-4 rounded-xl text-center">
                                <div className="text-white/80 mb-2">
                                    Código de verificación:
                                </div>
                                <div className="text-2xl font-bold text-blue-400 tracking-widest select-none">
                                    {captchaCode}
                                </div>
                            </div>

                            {/* Input de Verificación */}
                            <input
                                type="text"
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value.toUpperCase())}
                                maxLength={4}
                                placeholder="Ingresa el código"
                                className="w-full bg-[#1a1a1a] text-white/80 
                                py-3 px-4 rounded-xl text-center 
                                uppercase tracking-widest
                                focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                            />

                            {/* Indicador de Verificación */}
                            {captchaVerificationResult === 'success' && (
                                <div className="text-center font-semibold text-green-500">
                                    Verificación exitosa
                                </div>
                            )}
                            {captchaVerificationResult === 'error' && (
                                <div className="text-center font-semibold text-red-500">
                                    Código incorrecto. Inténtalo de nuevo.
                                </div>
                            )}
                        </div>
                    )}

                    {/* Área de resultado (código generado) */}
                    {generatedCode && (
                        <motion.div
                            initial={{ opacity: 0, y: -20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.95 }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 20
                            }}
                            className="relative group"
                        >
                            <pre
                                onClick={copyToClipboard}
                                className="relative bg-[#1a1a1a] border border-white/10 
                                text-white/80 p-4 rounded-xl 
                                max-h-72 overflow-auto 
                                whitespace-pre-wrap break-words
                                text-sm font-mono
                                shadow-2xl cursor-pointer
                                selection:bg-blue-500/30"
                            >
                                {generatedCode}
                            </pre>

                            {/* Cambio para mostrar "Copiado al portapapeles" en verde cuando se copia */}
                            <div className={`text-center mt-2 mb-4 ${copied ? 'text-green-500' : 'text-white/70'}`}>
                                {copied ? 'Copiado al portapapeles' : '...'}
                            </div>
                        </motion.div>
                    )}

                    {/* Resto del código se mantiene igual */}
                    {captchaVerificationMode && (
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={verifyCaptcha}
                            disabled={userInput.length !== 4}
                            className="w-full flex items-center justify-center space-x-2 
                            bg-blue-500/10 hover:bg-blue-500/20 
                            border border-white/10 hover:border-white/20
                            text-white/90 font-semibold py-3 px-4 
                            rounded-xl transition duration-300 ease-in-out 
                            disabled:opacity-50 disabled:cursor-not-allowed
                            focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                        >
                            <FaVoteYea className="mr-2 text-blue-400" />
                            Verificar
                        </motion.button>
                    )}

                    {generatedCode && !captchaVerificationMode && (
                        <div className="text-center text-white/80 mt-4">
                            ¿Necesitas otro código? {' '}
                            <span
                                className="text-blue-400 cursor-pointer hover:underline"
                                onClick={() => window.location.reload()}
                            >
                                Recarga la página
                            </span>
                        </div>
                    )}

                    {!captchaVerificationMode && !generatedCode && (
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={generateCode}
                            disabled={isLoading}
                            className="w-full flex items-center justify-center space-x-2 
                            bg-blue-500/10 hover:bg-blue-500/20 
                            border border-white/10 hover:border-white/20
                            text-white/90 font-semibold py-3 px-4 
                            rounded-xl transition duration-300 ease-in-out 
                            disabled:opacity-50 disabled:cursor-not-allowed
                            focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                        >
                            <IoLockOpenOutline className="mr-2 text-blue-400" />
                            {isLoading ? 'Generando...' : 'Generar Código'}
                        </motion.button>
                    )}

                    {/* Manejo de errores */}
                    <AnimatePresence>
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl text-center"
                            >
                                {error}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}

export default GButton;