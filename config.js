const SUPPORT_IE8 = false;
const USE_POLYFILL = true;

module.export = {
    supportIe8: SUPPORT_IE8,
    usePolyfill: USE_POLYFILL,
    pretty: false,
    enableProfile: false,
    uglify: {
        beautify: false,
        output: {
            comments: false,
            screw_ie8: !SUPPORT_IE8
        },
        mangle: {
            screw_ie8: !SUPPORT_IE8
        },
        compress: {
            unused: true,
            dead_code: true,
            warning: true,
            drop_console: true,
            screw_ie8: !SUPPORT_IE8
        }
    },
    babelLoaderQuery: {
        cacheDirectory: true,
        babelrc: false,
        presets: [
            ["env",
                {
                    "target": {
                        "browsers": ["last 2 versions", "ie =>" + (SUPPORT_IE8 ? 8 : 9)]
                    },
                    "modules": SUPPORT_IE8 ? "commonjs" : false,
                    "useBuiltIns": true,
                    "debug": true,
                    "loose": SUPPORT_IE8
                }
            ],
            "stage-0"
        ],
        plugins: [
            "minify-dead-code-elimination"
        ].concat(!USE_POLYFILL ? ["transform-runtime"] : [])
            .concat(SUPPORT_IE8 ? ["transform-es5-property-mutators"] : [])
    }
};