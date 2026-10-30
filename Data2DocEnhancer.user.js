// ==UserScript==
// @name         Data2Doc Enhancer
// @description  Data2Doc Demos enhancer. It helps to work with templates, etc.
// @version      0.1
// @namespace    https://github.com/achernyakevich/tmsp-data2docenhancer/
// @updateURL    https://github.com/achernyakevich/tmsp-data2docenhancer/raw/refs/heads/main/Data2DocEnhancer.user.js
// @downloadURL  https://github.com/achernyakevich/tmsp-data2docenhancer/raw/refs/heads/main/Data2DocEnhancer.user.js
// @author       Alexander Chernyakevich
// @match        https://d2d.work/data2doc/*.html
// @grant        GM_notification
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @grant        GM_listValues
// @grant        GM_registerMenuCommand
// @grant        GM_log
// @require      https://bitbucket.org/achernyakevich/tmsp-common/raw/configHelper-0.1.3/configHelper.js
// ==/UserScript==

(function () {
    'use strict';

    const CONFIG_NAMESPACE = "data2doc-enhancer";
    const DEFAULT_CONFIG = {
        "documentNamePrefixes": [
            "${CustomerName}_${AcceptanceNum}",
            "${CustomerName}"
        ],
        "debug": false,
    }
    const config = (
        configHelper.getConfigString(CONFIG_NAMESPACE)
            ? configHelper.getConfig(CONFIG_NAMESPACE)
            : DEFAULT_CONFIG
    );

    function log(logStr) {
        if (config.debug) {
            GM_log(logStr);
        }
    }

    function updateDocumentPrefixName(prefixName) {
        const prefixNameInput = document.getElementById("result-file-name-input");
        if (prefixNameInput) {
            prefixNameInput.value = prefixName;
        }
    }

    log("Data2Doc Enhancer: started");

    setTimeout(function () {
        config.documentNamePrefixes.forEach(prefix => {
            GM_registerMenuCommand(prefix, function() {
                updateDocumentPrefixName(prefix);
            });
        });

        configHelper.addConfigMenu(CONFIG_NAMESPACE, JSON.stringify(DEFAULT_CONFIG));

        log("Data2doc Enhancer: menu commands registered.");
    }, 1000);
})();
