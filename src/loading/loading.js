class Loading {
    constructor(app, datenbank) {
        this._app = app;
        this.db = datenbank;
    }

    onShow() {
        let section = document.querySelector("#loader").cloneNode(true);
        let content = {
            className: "visible",
            main: section.querySelectorAll("main > *"),
        };
        console.log('Page loaded');
        return content;
    }

    onLoad() {

    }

    onLeave(goon) {
        return true;
    }

    get title() {
        return "";
    }
}

export default Loading;