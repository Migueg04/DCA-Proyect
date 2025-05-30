import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/', // ✅ necesario para que devServer maneje bien las rutas internas
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'public'), // ✅ sirve los assets desde /public
    },
    historyApiFallback: true, // ✅ permite navegar directamente a /profile sin error 404
    compress: true,
    port: 8080,
    open: true, // opcional: abre navegador al iniciar
  },
};