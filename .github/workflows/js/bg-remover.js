// js/bg-remover.js

// Carichiamo la libreria esterna (WASM basata su AI)
import { removeBackground } from "https://cdn.jsdelivr.net/npm/@imgly/background-removal@latest/dist/index.js";

export async function processBackgroundRemoval(imageElement) {
    try {
        // Mostriamo un feedback visivo di caricamento sulla cella
        const cell = imageElement.parentElement;
        cell.style.opacity = "0.5";
        
        const source = imageElement.src;

        // Eseguiamo l'algoritmo di rimozione (AI)
        const blob = await removeBackground(source, {
            progress: (title, progress) => {
                console.log(`Rimozoione sfondo in corso: ${Math.round(progress * 100)}%`);
            },
            model: "medium", // Bilanciamento tra precisione e velocità
            output: {
                type: "image/png",
                quality: 0.8
            }
        });

        // Creiamo il nuovo URL dell'immagine senza sfondo
        const resultUrl = URL.createObjectURL(blob);
        
        // Aggiorniamo l'immagine nel quadrante
        imageElement.src = resultUrl;
        
        // Reset stile cella
        cell.style.opacity = "1";
        cell.style.background = "transparent";
        imageElement.style.mixBlendMode = "normal";
        imageElement.style.filter = "drop-shadow(0 4px 8px rgba(0,0,0,0.1))";
        
        console.log("Sfondo rimosso con successo!");

    } catch (error) {
        console.error("Errore durante la rimozione dello sfondo:", error);
        alert("Errore AI: impossibile rimuovere lo sfondo su questa immagine.");
    }
}
