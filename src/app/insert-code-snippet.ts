// import 'clipboard';

// import 'prismjs';
// import 'prismjs/plugins/toolbar/prism-toolbar';
// import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard';
// import 'prismjs/components/prism-css';
// import 'prismjs/components/prism-javascript';
// import 'prismjs/components/prism-java';
// import 'prismjs/components/prism-markup';
// import 'prismjs/components/prism-typescript';
// import 'prismjs/components/prism-sass';
// import 'prismjs/components/prism-scss';

// declare var Prism: any;

/**
 * CodeTool for Editor.js
 *
 * @author sumitvekariya7@gmail.com
 * @copyright CodeX 2018
 * @license The MIT License (MIT)
 * @version 2.0.0
 */

export class CodeWithLanguageSelection {
    api: any;
    placeholder: string;
    CSS: { baseClass: any; input: any; wrapper: string; textarea: string; language?: string };
    nodes: { holder: any; textarea: any; select: any };
    _data: { code: string, language?: string};

    /**
     * Allow to press Enter inside the CodeTool textarea
     * @returns {boolean}
     * @public
     */
    static get enableLineBreaks() {
        return true;
    }

    static get contentless() {
        return true;
    }

    static get DEFAULT_CODE_PLACEHOLDER() {
        return 'Enter some code';
    }

    static get DEFAULT_LANGUAGE_PLACEHOLDER() {
        return 'Select a format';
    }

    static get DEFAULT_FORMAT_CONFIG() {
        return ['puthon', 'Matlab', 'R', 'javascript', 'C', 'HTML'];
    }



    /**
     * @typedef {Object} CodeData — plugin saved data
     * @param {String} code - previously saved plugin code
     */

    /**
     * Render plugin`s main Element and fill it with saved data
     *
     * @param {CodeData} data — previously saved plugin code
     * @param {Object} config - user config for Tool
     * @param {Object} api - Editor.js API
     */
    constructor(
        { data, config, api}
        ) {

        this.api = api;

        this.placeholder = config.placeholder || CodeWithLanguageSelection.DEFAULT_PLACEHOLDER;

        this.CSS = {
            baseClass: this.api.styles.block,
            input: this.api.styles.input,
            wrapper: 'ce-code',
            textarea: 'ce-code__textarea'
        };

        this.nodes = {
            holder: null,
            textarea: null,
            select: null
        };

        this.data = {
            code: data.code || '',
            language: data.language || '',
        };

        this.nodes.holder = this.drawView();

    }


    /**
     * Create Tool's view
     * @return {HTMLElement}
     * @private
     */
    drawView() {
        const wrapper = document.createElement('div');
        const pre = document.createElement('pre');
        const textarea = document.createElement('textarea');

        const language = document.createElement('select');
        // const textarea = document.createElement('textarea');

        // const selectwrapper = document.createElement('div');



        textarea.textContent = this.data.code;
        textarea.contentEditable = 'true';

        // textarea.placeholder = this.placeholder;



        language.dataset.placeholder = CodeWithLanguageSelection.DEFAULT_LANGUAGE_PLACEHOLDER;

        language.options.add(new Option('Select a Language', '', true));

        for (const index of CodeWithLanguageSelection.DEFAULT_FORMAT_CONFIG) {
            if (index) {
                language.options[language.options.length] = new Option(index, index);
            }
        }


        wrapper.classList.add(this.CSS.baseClass, this.CSS.wrapper);

        textarea.style.minHeight = '200px';
        textarea.style.fontFamily = 'Menlo, Monaco, Consolas, Courier New, monospace';
        // textarea.style.color = '#41314e';
        textarea.style.lineHeight = '1.6em';
        textarea.style.fontSize = '12px';
        // textarea.style.background = '#272822';
        // textarea.style.border = '1px solid #f1f1f4';
        textarea.style.boxShadow = 'none';
        textarea.style.whiteSpace = 'pre';
        textarea.style.wordWrap = 'normal';
        textarea.style.overflow = 'auto';
        textarea.style.resize = 'vertical';


        language.classList.add(this.CSS.language);

        wrapper.appendChild(language);
        wrapper.appendChild(pre).appendChild(textarea);
        // wrapper.appendChild(textarea);

        this.nodes.textarea = textarea;
        this.nodes.select = language;

        // this.api.listeners.on(language, 'change', (event) => {
        //     console.log(event);
        //     pre.className = `language-${event.target.value}`;
        //     textarea.className = `language-${event.target.value}`;
        //     Prism.highlightAll();
        // });

        // this.api.listeners.on(textarea, 'blur', () => {
        //     Prism.highlightAll();
        // });

        this.api.listeners.on(textarea, 'paste', (event) => {
            // Prism.highlightAll();
            // this.data.code = event;
            // if (event && event.type === 'paste') {
            //     console.log(event.clipboardData.getData('text/plain'));
            //     textarea.textContent = event.clipboardData.getData('text/plain')
            // }
            // console.log(event)
        });


        return wrapper;
    }

    /**
     * Return Tool's view
     * @returns {HTMLDivElement} this.nodes.holder - Code's wrapper
     * @public
     */
    render() {
        return this.nodes.holder;
    }

    /**
     * Extract Tool's data from the view
     * @param {HTMLDivElement} codeWrapper - CodeTool's wrapper, containing textarea with code
     * @returns {CodeData} - saved plugin code
     * @public
     */
    save(codeWrapper) {
        // console.log(codeWrapper.querySelector('PRE').textContent);
        return {
            // code: codeWrapper.querySelector('PRE').textContent,
            code: codeWrapper.querySelector('pre textarea').value,
            language: codeWrapper.querySelector('select').value
        };
    }

    /**
     * onPaste callback fired from Editor`s core
     * @param {PasteEvent} event - event with pasted content
     */
    onPaste(event) {
        const content = event.detail.data;
        this.data = {
            code: content.textContent,
        };
    }

    /**
     * Returns Tool`s data from private property
     * @return {*}
     */
    get data() {
        return this._data;
    }

    /**
     * Set Tool`s data to private property and update view
     * @param {CodeData} data
     */
    set data(data) {
        this._data = data;

        if (this.nodes.textarea) {
            this.nodes.textarea.textContent = data.code;
            this.nodes.select.value = data.language;
        }
    }

    /**
     * Get Tool toolbox settings
     * icon - Tool icon's SVG
     * title - title to show in toolbox
     *
     * @return {{icon: string, title: string}}
     */
    static get toolbox() {
        return {
            icon: `<svg width="14" height="14" viewBox="0 -1 14 14" xmlns="http://www.w3.org/2000/svg" > <path d="M3.177 6.852c.205.253.347.572.427.954.078.372.117.844.117 1.417 0 .418.01.725.03.92.02.18.057.314.107.396.046.075.093.117.14.134.075.027.218.056.42.083a.855.855 0 0 1 .56.297c.145.167.215.38.215.636 0 .612-.432.934-1.216.934-.457 0-.87-.087-1.233-.262a1.995 1.995 0 0 1-.853-.751 2.09 2.09 0 0 1-.305-1.097c-.014-.648-.029-1.168-.043-1.56-.013-.383-.034-.631-.06-.733-.064-.263-.158-.455-.276-.578a2.163 2.163 0 0 0-.505-.376c-.238-.134-.41-.256-.519-.371C.058 6.76 0 6.567 0 6.315c0-.37.166-.657.493-.846.329-.186.56-.342.693-.466a.942.942 0 0 0 .26-.447c.056-.2.088-.42.097-.658.01-.25.024-.85.043-1.802.015-.629.239-1.14.672-1.522C2.691.19 3.268 0 3.977 0c.783 0 1.216.317 1.216.921 0 .264-.069.48-.211.643a.858.858 0 0 1-.563.29c-.249.03-.417.076-.498.126-.062.04-.112.134-.139.291-.031.187-.052.562-.061 1.119a8.828 8.828 0 0 1-.112 1.378 2.24 2.24 0 0 1-.404.963c-.159.212-.373.406-.64.583.25.163.454.342.612.538zm7.34 0c.157-.196.362-.375.612-.538a2.544 2.544 0 0 1-.641-.583 2.24 2.24 0 0 1-.404-.963 8.828 8.828 0 0 1-.112-1.378c-.009-.557-.03-.932-.061-1.119-.027-.157-.077-.251-.14-.29-.08-.051-.248-.096-.496-.127a.858.858 0 0 1-.564-.29C8.57 1.401 8.5 1.185 8.5.921 8.5.317 8.933 0 9.716 0c.71 0 1.286.19 1.72.574.432.382.656.893.671 1.522.02.952.033 1.553.043 1.802.009.238.041.458.097.658a.942.942 0 0 0 .26.447c.133.124.364.28.693.466a.926.926 0 0 1 .493.846c0 .252-.058.446-.183.58-.109.115-.281.237-.52.371-.21.118-.377.244-.504.376-.118.123-.212.315-.277.578-.025.102-.045.35-.06.733-.013.392-.027.912-.042 1.56a2.09 2.09 0 0 1-.305 1.097c-.2.323-.486.574-.853.75a2.811 2.811 0 0 1-1.233.263c-.784 0-1.216-.322-1.216-.934 0-.256.07-.47.214-.636a.855.855 0 0 1 .562-.297c.201-.027.344-.056.418-.083.048-.017.096-.06.14-.134a.996.996 0 0 0 .107-.396c.02-.195.031-.502.031-.92 0-.573.039-1.045.117-1.417.08-.382.222-.701.427-.954z" /> </svg>`,
            title: 'Code'
        };
    }

    /**
     * Default placeholder for CodeTool's textarea
     *
     * @public
     * @returns {string}
     */
    static get DEFAULT_PLACEHOLDER() {
        return 'Enter code';
    }

    /**
     *  Used by Editor.js paste handling API.
     *  Provides configuration to handle CODE tag.
     *
     * @static
     * @return {{tags: string[]}}
     */
    static get pasteConfig() {
        return {
            tags: ['PRE'],
        };
    }
}
