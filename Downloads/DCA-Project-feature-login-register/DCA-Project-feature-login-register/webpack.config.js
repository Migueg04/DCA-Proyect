// Importa el módulo 'path' de Node.js para trabajar con rutas de archivos y directorios
import path from 'path';

// Importa 'fileURLToPath' del módulo 'url' de Node.js para convertir una URL de archivo en una ruta de archivo
import { fileURLToPath } from 'url';

// Convierte la URL del archivo actual (import.meta.url) en una ruta de archivo
const __filename = fileURLToPath(import.meta.url);

// Obtiene el nombre del directorio del archivo actual
const __dirname = path.dirname(__filename);

// Exporta la configuración de Webpack como un objeto
export default {
    // Define el punto de entrada de la aplicación
    entry: './src/index.ts',
    // Configura los módulos y reglas de carga
    module: {
        rules: [
            {
                // Aplica esta regla a archivos que coincidan con la expresión regular (archivos .ts o .tsx)
                test: /\.tsx?$/,
                // Utiliza 'ts-loader' para transpilar archivos TypeScript a JavaScript
                use: 'ts-loader',
                // Excluye la carpeta 'node_modules' de esta regla
                exclude: /node_modules/,
            },
        ],
    },
    // Configura las extensiones de archivo que Webpack resolverá automáticamente
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    // Configura la salida del bundle
    output: {
        // Nombre del archivo de salida
        filename: 'bundle.js',
        // Ruta del directorio de salida, resuelta a partir del directorio actual
        path: path.resolve(__dirname, 'dist'),
    },
};