const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const path = require('path');
const { sources } = require("webpack");

module.exports = {
    mode: 'development',

    output: {
        clean: true,
    },

    module: {
        rules: [
            { //Procesador de html
                test: /\html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            /*list: [
                                { 
                                    tag: "img",
                                    attribute: "data-src",
                                    type: "src",
                                    filter: () => false
                                }
                            ]*/
                            minimize: false,
                            sources: false // no procesara todos los sources, lo use para que no procese las imagenes
                        }
                    }
                ]
            },
            { // procesador de css
                test: /\.css$/i,
                exclude: /styles.css$/,
                use: ["style-loader", "css-loader"],
            },
            {   // procesador de css para minimizar
                test: /styles.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            /*{ //Procesador de imagenes
                test: /\.(png|jpe?g|gif)$/i, 
                use: [
                    {
                    loader: 'file-loader',
                    },
                ],
            },*/
        ]
    },
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'index.js'
    },

    plugins: [
        new HtmlWebpackPlugin(
            {
                template: './src/index.html',
                filename: './index.html'
            }
        ),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            ignoreOrder: false
        }),
        new CopyPlugin({
            patterns: [
                { from: 'src/assets/', to: 'assets/' }
            ]
        })
    ],
}