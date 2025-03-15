// src/app/not-found.js
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Custom404() {
    // Estado para controlar si la imagen de fondo está cargada
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    // Estado para almacenar el GIF seleccionado aleatoriamente
    const [selectedGif, setSelectedGif] = useState("");

    // Lista de GIFs disponibles para el fondo
    const backgroundGifs = [
        "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExaHhtdGdkZ3dmdmpqYWttbm1oYTlocWw1cWVmcDhmajk4dnlmN3ViYSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/cJT8hgZsfTwPG5orV9/giphy.gif",
        "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExdTV1YTY4OXlwN2hyYmFzYWRuY2dnMTljNHFvNWZyaHRxeTI1dzhiYSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/dZXFMaFBlReiA/giphy.gif",
        "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExaWk5enI2OWlrMjl3YWJqbHFtYzI5dWNhb25oZjBtdGZlemdiMW5iNSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/d9T49nfPoctBpq29kd/giphy.gif",
        "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExYXVlZTZ3dnphZW1uMGRqdjRwemNsYW9penZyNWdnemYyMTRnOTAzNyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/1k3jEsS507T20/giphy.gif",
        "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExMWp6dXFiam0xNTEzM2x6am5lZHYxMm92bzB3ZGV1bTBoNnY1djlnYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/LTByspj8BjoVx9EPJq/giphy.gif",
        "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZDc3d215b21uZGQ0OGt1ZDl6ajZveDZtZWw5YmZ5YWt3MWdmYjBlOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/X9KqxObAs3QwF4zRCI/giphy.gif",
        "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ2NyN2dmdG5qYXVqaWVkdWd5bG44MjN5dTkyeDNwMXdkOXoxYmVsMCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/mN5DRm6jpWew92rbId/giphy.gif",
        "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExeDFjcWE0aXc4ZjF4YzRoNnBra3J3aG9lcWUzbjhocWN5M3h4dmg4ciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/80TEu4wOBdPLG/giphy.gif",
        "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExcTZ0Mmd6emJvb2pmNG9yZnp2c2tldjZrYTkya29lc251M3V3Y3g2ciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3owypf6HrM3J7UTvAA/giphy.gif",
        "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExeWY2dnNnYmtpZ2V6NXNhbWVnYWF1dXB4cGFoaTlzdGkzbjgyM2JwOSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/yYcKnLgVq3VSESnTGf/giphy.gif",
    ];

    useEffect(() => {
        // Selecciona un GIF aleatorio de la lista
        const randomIndex = Math.floor(Math.random() * backgroundGifs.length);
        const randomGif = backgroundGifs[randomIndex];
        setSelectedGif(randomGif);

        // Precarga el GIF seleccionado
        const image = new Image();
        image.src = randomGif;
        image.onload = () => setIsImageLoaded(true);
    }, []); // Se ejecuta solo una vez al montar el componente

    return (
        <div className="relative min-h-screen w-full overflow-hidden">
            {/* Contenedor del fondo y overlay */}
            <div className="absolute inset-0 z-0">
                {/* GIF de fondo */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: `url('${selectedGif}')`,
                        opacity: isImageLoaded ? 1 : 0,
                        transition: "opacity 0.5s ease-in-out",
                    }}
                />
                {/* Overlay con gradiente para mejorar legibilidad */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/95" />
            </div>

            {/* Contenido principal */}
            <motion.div
                className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                {/* Título 404 con gradiente */}
                <motion.h1
                    className="mb-4 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-6xl font-bold text-transparent md:text-8xl"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    404
                </motion.h1>

                {/* Subtítulo */}
                <motion.h2
                    className="mb-6 text-3xl font-semibold text-white md:text-4xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    La página no existe
                </motion.h2>

                {/* Descripción */}
                <motion.p
                    className="mb-8 max-w-md text-lg text-gray-300"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                >
                    El sitio al que ingresaste no existe o ha dejado de existir...
                </motion.p>

                {/* Botón de regreso con efectos */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                >
                    <Link
                        href="/"
                        className="group relative inline-flex items-center overflow-hidden rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-3 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30"
                    >
                        <span className="relative z-10">Regresar al inicio</span>
                        {/* Efecto hover del botón */}
                        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    );
}
