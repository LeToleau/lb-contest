import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import TagManager from 'react-gtm-module';

const GTMConversion = () => {
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === '/quasi' || location.pathname === '/win-page') {
            console.log('Attempting to initialize GTM...');
            // Crea un elemento script
            const script = document.createElement('script');
                
            // Establece el contenido del script con el código de Google Tag Manager
            script.innerHTML = `
            gtag('event', 'conversion', {
                'allow_custom_scripts': true,
                'send_to': 'DC-9258672/laurbiag/aqvromtk+standard'
            });
            `;

            // Inserta el script como el primer hijo del cuerpo del documento
            document.body.appendChild(script);

            // Limpia el script al desmontar el componente
            return () => {
            document.body.removeChild(script);
            };
        }
    }, [location]);

    return null;
}

export default GTMConversion;